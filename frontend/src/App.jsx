import { useState } from 'react';
import { Layout, Menu, Drawer, Grid, Button } from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  ApiOutlined,
  UserOutlined,
  MenuOutlined,
  BankOutlined,
} from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import VerificationQueue from './pages/VerificationQueue';
import DocumentDetails from './pages/DocumentDetails';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  upload: 'Upload Document',
  verification: 'Verification Queue',
  documents: 'Document Details',
  analytics: 'Analytics',
  integrations: 'System Integrations',
};

function App() {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState('dashboard');

  const menuItems = [
    { key: 'dashboard', icon: <BarChartOutlined />, label: 'Dashboard' },
    { key: 'upload', icon: <FileTextOutlined />, label: 'Upload Document' },
    { key: 'verification', icon: <CheckCircleOutlined />, label: 'Verification' },
    { key: 'documents', icon: <FileTextOutlined />, label: 'Documents' },
    { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics' },
    { key: 'integrations', icon: <ApiOutlined />, label: 'Integrations' },
  ];

  const renderPage = () => {
    switch (selected) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadDocument />;
      case 'verification':
        return <VerificationQueue />;
      case 'documents':
        return <DocumentDetails />;
      case 'analytics':
        return <Analytics />;
      case 'integrations':
        return <Integrations />;
      default:
        return <Dashboard />;
    }
  };

  const onMenuClick = ({ key }) => {
    setSelected(key);
    setDrawerOpen(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0 }}>
          <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: collapsed ? 16 : 18, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {collapsed ? 'LR' : 'Land Records'}
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[selected]} items={menuItems} onClick={onMenuClick} />
        </Sider>
      )}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={272}
        styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column' }, header: { display: 'none' } }}
      >
        <div className="drawer-brand">
          <div className="brand-row">
            <span className="drawer-logo"><BankOutlined /></span>
            <div>
              <div className="drawer-app-name">Land Records</div>
              <div className="drawer-subtitle">Digitization System</div>
            </div>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="drawer-menu"
          selectedKeys={[selected]}
          items={menuItems}
          onClick={onMenuClick}
          style={{ borderInlineEnd: 'none', flex: 1 }}
        />
        <div className="drawer-footer">SIH 2026 · v1.0 · Admin</div>
      </Drawer>
      <Layout>
        <Header
          className="app-header"
          style={{
            padding: isMobile ? '0 12px' : '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            position: 'sticky',
            top: 0,
            zIndex: 100,
            height: isMobile ? 56 : 64,
            lineHeight: 'normal',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 8 : 12, minWidth: 0 }}>
            {isMobile && (
              <Button
                type="text"
                shape="circle"
                icon={<MenuOutlined style={{ fontSize: 18 }} />}
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              />
            )}
            <span className="brand-icon"><BankOutlined /></span>
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? 15 : 19,
                fontWeight: 700,
                letterSpacing: '-0.2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Land Record Digitization System
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 6 : 12, flexShrink: 0 }}>
            {!isMobile && <span>{PAGE_TITLES[selected]}</span>}
            <span
              className="brand-icon"
              style={{ width: 30, height: 30, fontSize: 14, borderRadius: '50%', background: 'linear-gradient(135deg, #722ed1, #1677ff)', boxShadow: 'none' }}
            >
              <UserOutlined />
            </span>
          </div>
        </Header>
        <Content
          key={selected}
          className="page-fade"
          style={{
            margin: isMobile ? 12 : 24,
            marginTop: isMobile ? 16 : 24,
            paddingBottom: `calc(${isMobile ? 16 : 24}px + env(safe-area-inset-bottom))`,
          }}
        >
          <h2 className="page-title">{PAGE_TITLES[selected]}</h2>
          <div
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: isMobile ? 14 : 24,
              boxShadow: '0 2px 10px rgba(15, 34, 58, 0.05)',
            }}
          >
            {renderPage()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
