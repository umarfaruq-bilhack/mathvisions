// Core generative engine — all algorithms, RNG, palettes

export type AlgoKey =
  | 'orbital'
  | 'particles'
  | 'sacred'
  | 'fractal'
  | 'lissajous'
  | 'rain'
  | 'weave'
  | 'tree'
  | 'flux'

export interface AlgoDef {
  key: AlgoKey
  name: string
  formula: string
  desc: string
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary'
}

export const ALGOS: AlgoDef[] = [
  { key: 'orbital',   name: 'ORBITAL HARMONY',   formula: 'x=sin(at)·cos(bt), y=cos(ct)·sin(dt)',         desc: 'Lissajous-derived orbital curves. Frequency ratios create interference patterns between circular and elliptical attractors.', rarity: 'Common' },
  { key: 'particles', name: 'PARTICLE UNIVERSE',  formula: 'Δθ = f(gravity,flow) · ∂noise/∂t',             desc: 'N-body particle simulation with proximity-based line connections. Each particle follows a velocity field seeded by token hash.', rarity: 'Common' },
  { key: 'sacred',    name: 'SACRED RECURSION',   formula: 'Rₙ = R₀ · φⁿ,  θ = 2π/symmetry',              desc: 'Recursive radial geometry. Golden ratio governs depth scaling. Symmetry parameter defines rotational order.', rarity: 'Uncommon' },
  { key: 'fractal',   name: 'FRACTAL DREAMS',     formula: 'zₙ₊₁ = zₙ² + c,  |z| < 2',                    desc: 'Julia set rendered pixel-by-pixel. The complex constant c is derived from the token seed, producing a unique escape-time landscape.', rarity: 'Rare' },
  { key: 'lissajous', name: 'HARMONIC WAVES',     formula: 'x=A·sin(f₁t+δ),  y=B·sin(f₂t)',               desc: 'Multi-frequency Lissajous figures layered by color channel. Frequency ratios determine open vs closed curve topology.', rarity: 'Common' },
  { key: 'rain',      name: 'DIGITAL RAIN',       formula: 'y(t) = y₀ + v·t mod H',                        desc: 'Stochastic column descent with brightness falloff. Glyph selection from katakana range, density and chaos per token.', rarity: 'Uncommon' },
  { key: 'weave',     name: 'WOVEN TEXTURE',      formula: 'f(r,c) = interleave(H,V) ⊕ seed',             desc: 'Orthogonal interlocking grid. Horizontal and vertical threads alternate based on parity function with color rotation.', rarity: 'Common' },
  { key: 'tree',      name: 'GENERATIVE GROWTH',  formula: 'Lₙ = L₀ · rⁿ,  Δθ = angle ± ε',              desc: 'Stochastic L-system branching. Reduction ratio and angular spread both carry per-token entropy for organic variation.', rarity: 'Uncommon' },
  { key: 'flux',      name: 'INFINITE FLUX',      formula: 'y = A·sin(kx + ωt + φ)',                       desc: 'Superimposed sine waves creating interference fields. Amplitude, frequency, and phase all seed-derived.', rarity: 'Legendary' },
]

export const PALETTES: Record<AlgoKey, string[]> = {
  orbital:   ['#a070ff', '#ff70c0', '#7090ff', '#ffffff'],
  particles: ['#ff6090', '#6090ff', '#90ffff', '#ffff60'],
  sacred:    ['#ffffff', '#aaaacc', '#8888aa', '#4444aa'],
  fractal:   ['#ff8800', '#aa4400', '#662200', '#ffcc44'],
  lissajous: ['#00ffcc', '#0088ff', '#8800ff', '#ff0044'],
  rain:      ['#00ff44', '#00aa22', '#004411', '#88ffaa'],
  weave:     ['#cc8833', '#228866', '#994422', '#eecc55'],
  tree:      ['#88bb44', '#446622', '#223311', '#ccdd88'],
  flux:      ['#ff3366', '#ff9900', '#33ccff', '#9933ff'],
}

// Deterministic mulberry32 RNG
export function makeRng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = Math.imul(a ^ (a >>> 17), a ^ (a << 7)) >>> 0
    a = Math.imul(a ^ (a >>> 16), 2246822519) >>> 0
    return a / 4294967296
  }
}

export function getParams(algoKey: AlgoKey, seed: number): Record<string, string | number> {
  const s = seed
  switch (algoKey) {
    case 'orbital':   return { a: +(s * 3.7 % 7 + 1).toFixed(2), b: +(s * 1.3 % 4 + 1).toFixed(2), c: +(s * 2.1 % 6 + 1).toFixed(2) }
    case 'particles': return { gravity: +((s % 100) / 100 + 0.3).toFixed(2), flow: +((s % 80) / 100 + 0.8).toFixed(2) }
    case 'sacred':    return { depth: Math.floor(s % 5 + 5), symmetry: [4, 5, 6, 7, 8][s % 5] }
    case 'fractal':   return { zoom: +((s % 300) / 100 + 1.5).toFixed(2), cx: +((s % 200 - 100) / 100).toFixed(3), cy: +((s % 180 - 90) / 100).toFixed(5) }
    case 'lissajous': return { f1: +((s % 500) / 100 + 1.5).toFixed(2), f2: +((s % 400) / 100 + 1.0).toFixed(2), f3: +((s % 300) / 100 + 2.0).toFixed(2) }
    case 'rain':      return { density: +((s % 80) / 100 + 0.5).toFixed(2), chaos: +((s % 200) / 100 + 0.8).toFixed(2) }
    case 'weave':     return { n: Math.floor(s % 80 + 40), steps: Math.floor(s % 400 + 200) }
    case 'tree':      return { iterations: Math.floor(s % 4 + 7), angle: +((s % 200) / 10 + 15).toFixed(1) }
    case 'flux':      return { speed: +((s % 200) / 100 + 0.8).toFixed(2), amplitude: +((s % 300) / 100 + 1.5).toFixed(2) }
  }
}

export function getTokenHash(seed: number) {
  return `FNFT::0x${seed.toString(16).toUpperCase().padStart(6, '0')}`
}

// ── Draw functions ──────────────────────────────────────────────────────────

type Rng = () => number
type Ctx = CanvasRenderingContext2D
type Params = Record<string, string | number>

function hex2(n: number) { return Math.max(0, Math.min(255, Math.floor(n))).toString(16).padStart(2, '0') }

function drawOrbital(ctx: Ctx, W: number, p: Params, cols: string[], rng: Rng) {
  ctx.fillStyle = '#030308'; ctx.fillRect(0, 0, W, W)
  const a = +p.a, b = +p.b, c = +p.c, n = 120
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2
    const t2 = ((i + 1) % n) / n * Math.PI * 2
    const rx = (t: number) => W / 2 + W * 0.38 * (0.5 + 0.5 * Math.sin(a * t)) * Math.cos(t) + W * 0.38 * (0.5 + 0.5 * Math.cos(b * t)) * Math.cos(c * t) * 0.28
    const ry = (t: number) => W / 2 + W * 0.38 * (0.5 + 0.5 * Math.sin(a * t)) * Math.sin(t) + W * 0.38 * (0.5 + 0.5 * Math.cos(b * t)) * Math.sin(c * t) * 0.28
    ctx.beginPath(); ctx.moveTo(rx(t), ry(t)); ctx.lineTo(rx(t2), ry(t2))
    ctx.strokeStyle = cols[i % cols.length] + hex2(rng() * 60 + 100)
    ctx.lineWidth = 0.9; ctx.stroke()
  }
  ctx.beginPath(); ctx.arc(W / 2, W / 2, W * 0.1, 0, Math.PI * 2)
  ctx.fillStyle = '#000'; ctx.fill()
}

function drawParticles(ctx: Ctx, W: number, p: Params, cols: string[], rng: Rng) {
  ctx.fillStyle = '#02020a'; ctx.fillRect(0, 0, W, W)
  const pts: number[][] = []
  for (let i = 0; i < 90; i++) pts.push([rng() * W, rng() * W, rng() * Math.PI * 2, rng() * 2 + 0.5])
  for (let step = 0; step < 70; step++) {
    for (const pt of pts) {
      pt[0] += Math.cos(pt[2]) * pt[3] * +p.flow; pt[1] += Math.sin(pt[2]) * pt[3] * +p.flow
      pt[2] += (rng() - 0.5) * +p.gravity * 0.25
      if (pt[0] < 0) pt[0] = W; if (pt[0] > W) pt[0] = 0
      if (pt[1] < 0) pt[1] = W; if (pt[1] > W) pt[1] = 0
      ctx.beginPath(); ctx.arc(pt[0], pt[1], 0.9, 0, Math.PI * 2)
      ctx.fillStyle = cols[Math.floor(rng() * cols.length)] + '88'; ctx.fill()
    }
  }
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const d = Math.hypot(pts[j][0] - pts[i][0], pts[j][1] - pts[i][1])
    if (d < W * 0.14) {
      ctx.beginPath(); ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[j][0], pts[j][1])
      ctx.strokeStyle = cols[0] + hex2((1 - d / (W * 0.14)) * 50)
      ctx.lineWidth = 0.4; ctx.stroke()
    }
  }
}

function drawSacred(ctx: Ctx, W: number, p: Params, cols: string[], _rng: Rng) {
  ctx.fillStyle = '#05050f'; ctx.fillRect(0, 0, W, W)
  const sym = +p.symmetry, dep = +p.depth
  function recurse(cx: number, cy: number, r: number, d: number) {
    if (d <= 0 || r < 2) return
    for (let k = 0; k < sym; k++) {
      const a = k / sym * Math.PI * 2, x = cx + r * Math.cos(a), y = cy + r * Math.sin(a)
      ctx.beginPath(); ctx.arc(x, y, r * 0.5, 0, Math.PI * 2)
      ctx.strokeStyle = cols[k % cols.length] + hex2((d / dep) * 130)
      ctx.lineWidth = 0.5; ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y)
      ctx.strokeStyle = '#ffffff18'; ctx.lineWidth = 0.3; ctx.stroke()
      recurse(x, y, r * 0.42, d - 1)
    }
  }
  recurse(W / 2, W / 2, W * 0.34, dep)
  ctx.beginPath(); ctx.arc(W / 2, W / 2, W * 0.34, 0, Math.PI * 2)
  ctx.strokeStyle = cols[0] + '66'; ctx.lineWidth = 0.8; ctx.stroke()
}

function drawFractal(ctx: Ctx, W: number, p: Params, _cols: string[], _rng: Rng) {
  const maxIter = 80, imgData = ctx.createImageData(W, W)
  const zoom = +p.zoom, cx = +p.cx, cy = +p.cy
  for (let px = 0; px < W; px++) for (let py = 0; py < W; py++) {
    const x0 = (px / W - 0.5) * 3 / zoom, y0 = (py / W - 0.5) * 3 / zoom
    let x = x0 + cx, y = y0 + cy, iter = 0
    while (x * x + y * y < 4 && iter < maxIter) { const xt = x * x - y * y + x0; y = 2 * x * y + y0; x = xt; iter++ }
    const idx = (py * W + px) * 4
    if (iter === maxIter) { imgData.data[idx] = 3; imgData.data[idx + 1] = 3; imgData.data[idx + 2] = 8 }
    else { const t = iter / maxIter; imgData.data[idx] = Math.floor(255 * Math.pow(t, 0.5) * 0.9); imgData.data[idx + 1] = Math.floor(255 * t * 0.35); imgData.data[idx + 2] = Math.floor(255 * t * 0.08) }
    imgData.data[idx + 3] = 255
  }
  ctx.putImageData(imgData, 0, 0)
}

function drawLissajous(ctx: Ctx, W: number, p: Params, cols: string[], _rng: Rng) {
  ctx.fillStyle = '#04040d'; ctx.fillRect(0, 0, W, W)
  const f1 = +p.f1, f2 = +p.f2, f3 = +p.f3
  for (let layer = 0; layer < cols.length; layer++) {
    ctx.beginPath()
    for (let i = 0; i <= 900; i++) {
      const t = i / 900 * Math.PI * 2 * f3
      const x = W / 2 + Math.sin(f1 * t + layer * 0.28) * W * 0.43
      const y = W / 2 + Math.sin(f2 * t) * W * 0.43
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.strokeStyle = cols[layer] + 'aa'; ctx.lineWidth = 0.8 + layer * 0.15; ctx.stroke()
  }
}

function drawRain(ctx: Ctx, W: number, p: Params, _cols: string[], rng: Rng) {
  ctx.fillStyle = '#010a02'; ctx.fillRect(0, 0, W, W)
  const nc = Math.floor(W / 7), dens = +p.density
  for (let c = 0; c < nc; c++) {
    const x = c * 7 + 3, len = Math.floor(rng() * W * 0.85 * dens + W * 0.1), sy = rng() * W - len
    for (let i = 0; i < len; i += 7) {
      const y = sy + i, brightness = 1 - i / len, alpha = Math.floor(brightness * 220)
      ctx.fillStyle = `rgba(0,${Math.floor(brightness * 255)},${Math.floor(brightness * 70)},${alpha / 255})`
      ctx.font = `${5 + Math.floor(rng() * 2)}px monospace`
      ctx.fillText(String.fromCharCode(0x30A0 + Math.floor(rng() * 96)), x - 2, y)
    }
  }
}

function drawWeave(ctx: Ctx, W: number, p: Params, cols: string[], _rng: Rng) {
  ctx.fillStyle = '#0a0704'; ctx.fillRect(0, 0, W, W)
  const cell = Math.max(4, Math.floor(W / +p.n * 8)), n = Math.floor(W / cell)
  for (let row = 0; row < n; row++) for (let col = 0; col < n; col++) {
    const x = col * cell, y = row * cell, ci = ((row + col) % 2 === 0) ? (row % cols.length) : ((col + 1) % cols.length)
    ctx.fillStyle = cols[ci]
    if ((row + col) % 2 === 0) {
      ctx.fillRect(x, y + cell * 0.18, cell, cell * 0.64)
      ctx.fillStyle = '#00000055'; ctx.fillRect(x, y, cell, cell * 0.18); ctx.fillRect(x, y + cell * 0.82, cell, cell * 0.18)
    } else {
      ctx.fillRect(x + cell * 0.18, y, cell * 0.64, cell)
      ctx.fillStyle = '#00000055'; ctx.fillRect(x, y, cell * 0.18, cell); ctx.fillRect(x + cell * 0.82, y, cell * 0.18, cell)
    }
  }
}

function drawTree(ctx: Ctx, W: number, p: Params, cols: string[], rng: Rng) {
  ctx.fillStyle = '#030805'; ctx.fillRect(0, 0, W, W)
  const iters = +p.iterations, angle = +p.angle
  function branch(x: number, y: number, ang: number, len: number, depth: number) {
    if (depth <= 0 || len < 1.5) return
    const x2 = x + Math.cos(ang * Math.PI / 180) * len, y2 = y - Math.sin(ang * Math.PI / 180) * len
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2)
    ctx.strokeStyle = cols[depth % cols.length] + hex2((depth / iters) * 255)
    ctx.lineWidth = depth * 0.38; ctx.stroke()
    const spread = angle * (0.82 + rng() * 0.36)
    branch(x2, y2, ang + spread, len * (0.66 + rng() * 0.1), depth - 1)
    branch(x2, y2, ang - spread, len * (0.66 + rng() * 0.1), depth - 1)
    if (rng() > 0.62) branch(x2, y2, ang + (rng() - 0.5) * spread * 0.5, len * (0.52 + rng() * 0.1), depth - 2)
  }
  branch(W / 2, W * 0.93, 90, W * 0.22, iters)
}

function drawFlux(ctx: Ctx, W: number, p: Params, cols: string[], _rng: Rng) {
  ctx.fillStyle = '#050208'; ctx.fillRect(0, 0, W, W)
  const spd = +p.speed, amp = +p.amplitude
  for (let b = 0; b < cols.length; b++) {
    const pts: [number, number][] = []
    const yBase = W * (0.22 + b * 0.19)
    for (let i = 0; i <= 48; i++) {
      const x = (i / 48) * W
      const y = yBase + Math.sin(i * 0.38 * spd + b * 1.1) * W * 0.065 * amp + Math.sin(i * 0.71 * spd + b * 0.75) * W * 0.03
      pts.push([x, y])
    }
    ctx.beginPath(); ctx.moveTo(0, W)
    pts.forEach(([x, y]) => ctx.lineTo(x, y))
    ctx.lineTo(W, W); ctx.closePath(); ctx.fillStyle = cols[b] + '77'; ctx.fill()
    ctx.beginPath()
    pts.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
    ctx.strokeStyle = cols[b] + 'cc'; ctx.lineWidth = 1.1; ctx.stroke()
  }
}

export const DRAW_FNS: Record<AlgoKey, (ctx: Ctx, W: number, p: Params, cols: string[], rng: Rng) => void> = {
  orbital: drawOrbital, particles: drawParticles, sacred: drawSacred, fractal: drawFractal,
  lissajous: drawLissajous, rain: drawRain, weave: drawWeave, tree: drawTree, flux: drawFlux,
}

export function renderPiece(ctx: CanvasRenderingContext2D, W: number, algoKey: AlgoKey, seed: number) {
  const rng = makeRng(seed)
  const pal = PALETTES[algoKey]
  const p = getParams(algoKey, seed)
  DRAW_FNS[algoKey](ctx, W, p, pal, rng)
}

export const GALLERY_SEEDS: { seed: number; algo: AlgoKey }[] = [
  { seed: 81273,  algo: 'orbital'   },
  { seed: 99121,  algo: 'particles' },
  { seed: 44321,  algo: 'sacred'    },
  { seed: 12891,  algo: 'fractal'   },
  { seed: 77231,  algo: 'lissajous' },
  { seed: 88917,  algo: 'rain'      },
  { seed: 23119,  algo: 'weave'     },
  { seed: 54367,  algo: 'tree'      },
  { seed: 18923,  algo: 'flux'      },
  { seed: 31415,  algo: 'orbital'   },
  { seed: 27183,  algo: 'lissajous' },
  { seed: 16180,  algo: 'sacred'    },
  { seed: 14142,  algo: 'fractal'   },
  { seed: 17320,  algo: 'particles' },
  { seed: 26457,  algo: 'flux'      },
  { seed: 41421,  algo: 'tree'      },
  { seed: 31623,  algo: 'weave'     },
  { seed: 22360,  algo: 'rain'      },
  { seed: 70711,  algo: 'orbital'   },
  { seed: 86602,  algo: 'lissajous' },
]
