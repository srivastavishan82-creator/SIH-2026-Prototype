import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'
import './index.css'

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 10,
            fontSize: 14,
            controlHeight: 36,
            colorBgLayout: '#f0f4f8',
            boxShadowSecondary: '0 6px 16px -8px rgba(0,0,0,0.08), 0 12px 28px rgba(0,0,0,0.06)',
          },
          components: {
            Card: { boxShadowTertiary: '0 2px 10px rgba(22,119,255,0.06)' },
            Button: { fontWeight: 500 },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </StrictMode>,
  );
}
