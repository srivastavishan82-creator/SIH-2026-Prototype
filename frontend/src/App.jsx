import { useState } from 'react';
import { Layout, Menu, ConfigProvider, theme, Avatar, Dropdown, Button, Input, Badge, Breadcrumb, Tooltip, Tag, Drawer } from 'antd';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  FileTextOutlined,
  BarChartOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  CloudUploadOutlined,
  DashboardOutlined,
  AuditOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Dashboard from './pages/Dashboard';
import UploadDocument from './pages/UploadDocument';
import VerificationQueue from './pages/VerificationQueue';
import DocumentDetails from './pages/DocumentDetails';
import Analytics from './pages/Analytics';
import Integrations from './pages/Integrations';
import Profile from './pages/Profile';

const { Header, Sider, Content } = Layout;

const routeMeta = {
  dashboard: { label: 'Overview', icon: <DashboardOutlined /> },
  upload: { label: 'Document Intake', icon: <CloudUploadOutlined /> },
  verification: { label: 'Verification Queue', icon: <AuditOutlined /> },
  documents: { label: 'Verified Records', icon: <FileTextOutlined /> },
  analytics: { label: 'Analytics & Reports', icon: <BarChartOutlined /> },
  integrations: { label: 'System Settings', icon: <SettingOutlined /> },
  profile: { label: 'My Profile', icon: <UserOutlined /> },
};

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.replace('/', '') || 'dashboard';
  const meta = routeMeta[currentPath] || routeMeta.dashboard;

  const menuItems = [
    { type: 'group', label: <span className="section-label" style={{ paddingLeft: 12 }}>Operations</span> },
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Overview' },
    { key: 'upload', icon: <CloudUploadOutlined />, label: 'Document Intake' },
    { key: 'verification', icon: <AuditOutlined />, label: 'Verification Queue' },
    { key: 'documents', icon: <FileTextOutlined />, label: 'Verified Records' },
    { type: 'group', label: <span className="section-label" style={{ paddingLeft: 12 }}>Intelligence</span> },
    { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics & Reports' },
    { type: 'group', label: <span className="section-label" style={{ paddingLeft: 12 }}>System</span> },
    { key: 'integrations', icon: <SettingOutlined />, label: 'Integrations' },
  ];

  const handleUserMenuClick = ({ key }) => {
    if (key === 'profile') setProfileOpen(true);
    if (key === 'prefs') setProfileOpen(true);
  };
  const userMenu = {
    items: [
      { key: 'profile', label: 'View Profile', icon: <UserOutlined /> },
      { key: 'prefs', label: 'Preferences', icon: <SettingOutlined /> },
      { type: 'divider' },
      { key: 'signout', label: 'Sign Out', danger: true },
    ],
    onClick: handleUserMenuClick,
  };
  const breadcrumbItems = [ { title: <span className="breadcrumb-muted">LRDS</span> }, { title: <span className="breadcrumb-active">{meta.label}</span> }, ];

  return (
    <ConfigProvider theme={{
        algorithm: theme.defaultAlgorithm,
        token: { colorPrimary: '#242424', colorBgContainer: '#ffffff', fontFamily: 'Inter, system-ui, sans-serif', colorText: '#242424', colorTextSecondary: '#737373', borderRadius: 10, colorBorderSecondary: '#e5e5e5' },
        components: { Layout: { siderBg: '#ffffff', headerBg: 'rgba(255,255,255,0.96)' }, Menu: { itemBg: 'transparent', itemHoverBg: '#f5f5f5', itemSelectedBg: '#242424', itemSelectedColor: '#ffffff' } },
      }}>
      <Layout style={{ minHeight: '100vh', background: '#fafafa' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} trigger={null} width={268} collapsedWidth={72} breakpoint="lg" onBreakpoint={(b)=>setCollapsed(b)}
          style={{ overflow:'auto', height:'100vh', position:'sticky', top:0, left:0, zIndex:20, borderRight:'1px solid #e5e5e5', background:'#ffffff' }}>
          <div style={{ height:64, display:'flex', alignItems:'center', padding: collapsed?'0 14px':'0 18px', justifyContent:collapsed?'center':'flex-start', borderBottom:'1px solid #f5f5f5', gap:10, flexShrink:0 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'#242424', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:14, fontWeight:900, flexShrink:0, border:'1px solid #242424' }}>◈</div>
            {!collapsed && <div style={{lineHeight:1.1}}><div style={{fontWeight:850, fontSize:15, letterSpacing:'-0.03em', color:'#242424', fontFamily:'Host Grotesk, Inter, sans-serif'}}>LRDS</div><div style={{fontSize:11, color:'#737373', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase'}}>SIH 2026 • Gov</div></div>}
          </div>
          {!collapsed && (
            <div style={{padding:'12px 12px'}}>
              <div style={{display:'flex', alignItems:'center', gap:10, background:'#ffffff', border:'1px solid #242424', borderRadius:10, padding:'10px 12px'}}>
                <div className="pulse-dot" />
                <div style={{flex:1}}><div style={{fontSize:12, fontWeight:750, color:'#242424', lineHeight:1.2}}>Neural Engine Online</div><div style={{fontSize:11, color:'#737373'}}>OCR • NLP • Vision</div></div>
                <Tag style={{margin:0, fontSize:10, borderRadius:999, background:'#242424', color:'#fff', borderColor:'#242424'}}>LIVE</Tag>
              </div>
            </div>
          )}
          <Menu mode="inline" selectedKeys={[currentPath]} items={menuItems} onClick={({key})=>navigate(`/${key}`)} style={{borderRight:0, background:'transparent', paddingBottom:16}} />
          {!collapsed && (
            <div style={{padding:14, marginTop:'auto'}}>
              <div style={{background:'#242424', borderRadius:12, padding:16, color:'#fff', border:'1px solid #242424'}}>
                <div style={{fontSize:12, fontWeight:750, display:'flex', alignItems:'center', gap:6}}>● Pro Tip</div>
                <div style={{fontSize:12, color:'#d4d4d4', marginTop:6, lineHeight:1.5}}>Drop up to 50 records at once. AI auto-routes low-confidence fields.</div>
                <Button size="small" onClick={()=>navigate('/upload')} style={{marginTop:12, background:'#fff', border:'1px solid #fff', color:'#242424', borderRadius:8, fontWeight:700, width:'100%'}}>Try Bulk Intake →</Button>
              </div>
            </div>
          )}
        </Sider>

        <Layout style={{background:'transparent', minWidth:0}}>
          <Header className="glass-header" style={{padding:'0 18px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10, height:64, gap:16}}>
            <div style={{display:'flex', alignItems:'center', gap:12, minWidth:0, flex:1}}>
              <Button type="text" icon={collapsed?<MenuUnfoldOutlined />:<MenuFoldOutlined />} onClick={()=>setCollapsed(!collapsed)} style={{width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:8, border:'1px solid #e5e5e5', background:'#fff'}} />
              <div className="header-divider" style={{width:1, height:18, background:'#e5e5e5', flexShrink:0}} />
              <div className="header-breadcrumb-wrap" style={{display:'flex', alignItems:'center', gap:8, minWidth:0}}>
                <span style={{fontSize:16, color:'#242424'}}>{meta.icon}</span>
                <Breadcrumb items={breadcrumbItems} style={{margin:0}} />
                <Tag className="header-version-tag" style={{marginLeft:6, background:'#242424', color:'#fff', border:'1px solid #242424', borderRadius:999, fontWeight:750, fontSize:11}}>v2.0</Tag>
              </div>
            </div>
            <div className="header-actions" style={{display:'flex', alignItems:'center', gap:8, flexShrink:0}}>
              <Input className="header-search" prefix={<SearchOutlined style={{color:'#a3a3a3'}} />} placeholder="Search records, khasra, owner…" style={{width:260, background:'#fff', borderRadius:10, border:'1px solid #e5e5e5', height:36}} allowClear />
              <Tooltip title="Help & Docs"><Button type="text" icon={<QuestionCircleOutlined style={{fontSize:16, color:'#525252'}} />} style={{width:34, height:34, border:'1px solid #e5e5e5', background:'#fff', borderRadius:8}} /></Tooltip>
              <Badge count={3} size="small" offset={[-2,2]}><Button type="text" icon={<BellOutlined style={{fontSize:16, color:'#525252'}} />} style={{width:34, height:34, background:'#fff', border:'1px solid #e5e5e5', borderRadius:8}} /></Badge>
              <div className="header-divider" style={{width:1, height:20, background:'#e5e5e5', margin:'0 2px'}} />
              <Dropdown menu={userMenu} placement="bottomRight" arrow>
                <div onClick={() => setProfileOpen(true)} className="header-profile-pill" style={{cursor:'pointer', display:'flex', alignItems:'center', gap:10, padding:'3px 8px 3px 3px', borderRadius:999, background:'#fff', border:'1px solid #242424'}}>
                  <Avatar size={30} style={{background:'#242424', fontWeight:800, fontSize:12, flexShrink:0, border:'1px solid #242424'}}>AD</Avatar>
                  <div style={{lineHeight:1.15, paddingRight:2}}><div style={{fontWeight:750, fontSize:13, color:'#242424'}}>Admin • Revenue Dept.</div><div style={{fontSize:11, color:'#737373'}}>admin@lrds.gov.in</div></div>
                </div>
              </Dropdown>
            </div>
          </Header>

          <Content className="app-content" style={{margin:0, padding:'18px 20px 20px', maxWidth:1440, width:'100%', marginInline:'auto', minHeight:280}}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/upload" element={<UploadDocument />} />
              <Route path="/verification" element={<VerificationQueue />} />
              <Route path="/documents" element={<DocumentDetails />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <div style={{marginTop:20, padding:'12px 14px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12, color:'#737373', fontSize:12, borderTop:'1px solid #e5e5e5', background:'#fff', borderRadius:10, border:'1px solid #e5e5e5'}}>
              <span>© 2026 LRDS — Land Record Digitization System • Built for SIH 2026 • Secure • Audited • Gov Ready</span>
              <span style={{display:'flex', gap:10, alignItems:'center'}}><span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:6, height:6, borderRadius:999, background:'#242424', display:'inline-block'}} /> All systems operational</span><span>•</span><span>Uptime 99.98%</span></span>
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* User Profile Panel - opens from Admin • Revenue Dept. > View Profile */}
      <Drawer
        title={<span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#242424' }}>My Profile • Admin • Revenue Dept.</span>}
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        width={640}
        destroyOnClose={false}
        styles={{ body: { padding: 16, background: '#fafafa' }, header: { borderBottom: '1px solid #e5e5e5', background: '#fff' } }}
        extra={<Button onClick={() => { setProfileOpen(false); navigate('/profile'); }} style={{ borderRadius: 8, fontWeight: 700, background: '#242424', color: '#fff', border: '1px solid #242424' }}>Open Full Page →</Button>}
      >
        <Profile compact />
      </Drawer>

      {/* Mobile Bottom Navigation - eye-catchy, B/W editorial, only on mobile */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <button className={currentPath === 'dashboard' ? 'active' : ''} onClick={() => navigate('/dashboard')} aria-label="Overview">
          <DashboardOutlined />
          <span>Overview</span>
        </button>
        <button className={currentPath === 'upload' ? 'active' : ''} onClick={() => navigate('/upload')} aria-label="Intake">
          <CloudUploadOutlined />
          <span>Intake</span>
        </button>
        <div className="fab-wrap" onClick={() => navigate('/upload')} aria-label="Quick Intake">
          <div className="mobile-fab">
            <CloudUploadOutlined />
          </div>
        </div>
        <button className={currentPath === 'verification' ? 'active' : ''} onClick={() => navigate('/verification')} aria-label="Verify" style={{ position: 'relative' }}>
          <AuditOutlined />
          <span>Verify</span>
          <span style={{ position: 'absolute', top: 2, right: 10, width: 8, height: 8, borderRadius: 999, background: '#242424', border: '1px solid #fff', display: currentPath === 'verification' ? 'none' : 'block' }} />
        </button>
        <button className={currentPath === 'analytics' ? 'active' : ''} onClick={() => navigate('/analytics')} aria-label="Reports">
          <BarChartOutlined />
          <span>Reports</span>
        </button>
      </nav>
    </ConfigProvider>
  );
}
export default App;

