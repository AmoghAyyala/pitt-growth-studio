import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  const grad = 'linear-gradient(to top, #3b82f6, #f97316)'

  return new ImageResponse(
    (
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          background: '#eef2f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 4,
            paddingBottom: 6,
          }}
        >
          {/* Bar 1 – short */}
          <div style={{ width: 9, height: 14, borderRadius: 2, background: grad }} />
          {/* Bar 2 – medium */}
          <div style={{ width: 9, height: 22, borderRadius: 2, background: grad }} />
          {/* Bar 3 + upward arrow */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            {/* Triangle arrow */}
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderBottom: '9px solid #f97316',
              }}
            />
            {/* Tallest bar */}
            <div style={{ width: 9, height: 30, borderRadius: 2, background: grad }} />
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
