import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: 24,
      paddingTop: 64, fontFamily: 'var(--mono)',
    }}>
      <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'var(--muted)' }}>// 404</div>
      <div style={{
        fontFamily: 'var(--sans)', fontSize: 'clamp(60px,10vw,120px)',
        fontWeight: 800, color: 'var(--border2)', lineHeight: 1,
      }}>404</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', letterSpacing: '0.1em' }}>
        THIS TOKEN DOES NOT EXIST
      </div>
      <Link href="/" className="btn btn-outline" style={{ marginTop: 8 }}>
        RETURN HOME
      </Link>
    </div>
  )
}
