import { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  ApiOutlined,
  UserOutlined,
  RobotOutlined,
} from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import AISettings from './pages/AISettings';
import UploadDocument from './pages/UploadDocument';
import VerificationQueue from './pages/VerificationQueue';
import DocumentDetails from './pages/DocumentDetails';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import AISettings from './pages/AISettings';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('dashboard');

  const menuItems = [
    { key: 'dashboard', icon: <BarChartOutlined />, label: 'Dashboard' },
    { key: 'upload', icon: <FileTextOutlined />, label: 'Upload Document' },
    { key: 'verification', icon: <CheckCircleOutlined />, label: 'Verification' },
    { key: 'documents', icon: <FileTextOutlined />, label: 'Documents' },
    { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics' },
    { key: 'integrations', icon: <ApiOutlined />, label: 'Integrations' },
    { key: 'ai', icon: <RobotOutlined />, label: 'AI Settings' },
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
      case 'ai':
        return <AISettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={{ overflow: 'auto', height: '100vh', position: 'sticky', top: 0, left: 0 }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: collapsed ? 16 : 18, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {collapsed ? 'LR' : 'Land Records'}
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selected]} items={menuItems} onClick={({ key }) => setSelected(key)} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0 }}>Land Record Digitization System</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <UserOutlined />
            <span>Admin</span>
          </div>
        </Header>
        <Content style={{ margin: '24px', padding: 24, background: '#fff', borderRadius: 8, minHeight: 280 }}>
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
