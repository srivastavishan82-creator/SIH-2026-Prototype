import { useState } from 'react';
import { Layout, Menu, Drawer, Grid, Button } from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  ApiOutlined,
  UserOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import VerificationQueue from './pages/VerificationQueue';
import DocumentDetails from './pages/DocumentDetails';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

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

  const brand = (
    <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: collapsed ? 16 : 18, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      {collapsed && !isMobile ? 'LR' : 'Land Records'}
    </div>
  );

  const menu = (
    <Menu theme="dark" mode="inline" selectedKeys={[selected]} items={menuItems} onClick={onMenuClick} />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0 }}>
          {brand}
          {menu}
        </Sider>
      )}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={260}
        styles={{ body: { padding: 0 }, header: { display: 'none' } }}
      >
        <div style={{ background: '#001529' }}>{brand}</div>
        {menu}
      </Drawer>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: isMobile ? '0 12px' : '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
            {isMobile && (
              <Button type="text" icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} aria-label="Open menu" />
            )}
            <h2
              style={{
                margin: 0,
                fontSize: isMobile ? 15 : 20,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Land Record Digitization System
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <UserOutlined />
            {!isMobile && <span>Admin</span>}
          </div>
        </Header>
        <Content
          style={{
            margin: isMobile ? 12 : 24,
            padding: isMobile ? 16 : 24,
            background: '#fff',
            borderRadius: 8,
            minHeight: 280,
          }}
        >
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
