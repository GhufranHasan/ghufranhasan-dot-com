import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export async function GET() {
  const portrait = await readFile(path.join(process.cwd(), 'public/images/ghufran-portrait.png'))

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', background: '#050814', color: '#fefefe', padding: 64, position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: 720, justifyContent: 'center' }}>
        <div style={{ display: 'flex', color: '#ff8403', fontSize: 28, marginBottom: 28 }}>ghufranhasan.com</div>
        <div style={{ display: 'flex', fontSize: 72, fontWeight: 700 }}>Ghufran Hasan</div>
        <div style={{ display: 'flex', fontSize: 42, marginTop: 24, lineHeight: 1.3 }}>LinkedIn attention. Website trust. Qualified enquiries.</div>
        <div style={{ display: 'flex', width: 100, height: 6, background: '#ff8403', marginTop: 36 }} />
      </div>
      {/* A local, embedded asset keeps social-image rendering independent of network access. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/png;base64,${portrait.toString('base64')}`} alt="" width={375} height={500} style={{ position: 'absolute', right: 24, bottom: 0, objectFit: 'contain' }} />
    </div>,
    { width: 1200, height: 630 },
  )
}
