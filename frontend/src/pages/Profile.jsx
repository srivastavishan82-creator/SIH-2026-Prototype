import { useState } from 'react';
import { Card, Tag, Button, Avatar, Divider, Row, Col, Input, Space, Progress, message } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyCertificateOutlined,
  IdcardOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  EditOutlined,
  SaveOutlined,
  LockOutlined,
  TeamOutlined,
  GlobalOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  SettingOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  KeyOutlined,
} from '@ant-design/icons';

function Profile({ compact = false }) {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Aarav Sharma',
    role: 'Administrator',
    department: 'Revenue Department',
    designation: 'Deputy Collector (Revenue)',
    email: 'admin@lrds.gov.in',
    phone: '+91 94500 12345',
    employeeId: 'UP-REV-2024-0847',
    district: 'Agra',
    state: 'Uttar Pradesh',
    location: 'Collectorate, Agra • Block A, Room 204',
    joiningDate: '12 Mar 2021',
    lastLogin: '27 Aug 2026 • 09:42 IST',
    language: 'Hindi, English',
    govId: 'GOV-UP-AGRA-204',
  });
  const [draft, setDraft] = useState(profile);
  const handleSave = () => { setProfile(draft); setEditing(false); message.success('Profile updated • changes audit-logged'); };
  const handleCancel = () => { setDraft(profile); setEditing(false); };
  const stats = [
    { label: 'Records Verified', value: '1,248', icon: <CheckCircleOutlined />, sub: 'lifetime' },
    { label: 'Pending Actions', value: '46', icon: <ClockCircleOutlined />, sub: 'in queue' },
    { label: 'Accuracy Score', value: '96.2%', icon: <TrophyOutlined />, sub: 'avg. confidence' },
    { label: 'Districts Handled', value: '5', icon: <GlobalOutlined />, sub: 'Agra zone' },
  ];
  const activity = [
    { time: '27 Aug • 09:42', action: 'Verified Khatauni #123/4A — Agra', status: 'Verified' },
    { time: '27 Aug • 08:15', action: 'Approved 12 records for LRMS sync', status: 'Synced' },
    { time: '26 Aug • 16:20', action: 'Corrected Tehsil field (55% → verified)', status: 'Edited' },
    { time: '26 Aug • 14:30', action: 'Bulk intake: 32 docs ingested', status: 'Ingested' },
    { time: '25 Aug • 11:05', action: 'Password rotated • 2FA verified', status: 'Secured' },
  ];
  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: compact ? 12 : 16 }}>
      <div style={{ background: '#0e0e0e', border: '1px solid #111', borderRadius: 16, overflow: 'hidden', position: 'relative' }} className="grain grid-bw">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.02)' }}>
          <Space size={8}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', color: '#0e0e0e', borderRadius: 999, padding: '4px 9px', fontSize: 11, fontWeight: 850, letterSpacing: '0.04em' }}><span style={{ width: 7, height: 7, borderRadius: 999, background: '#0e0e0e' }} className="pulse-dot-light" /> GOVERNMENT PROFILE</span>
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, letterSpacing: '0.06em', fontWeight: 700, display: compact ? 'none' : 'inline-flex', gap: 6, alignItems: 'center' }}><SafetyCertificateOutlined /> AUDIT-TRAILED</span>
          </Space>
          <Space size={6}>
            <Tag style={{ margin: 0, background: '#fff', color: '#0e0e0e', borderColor: '#fff', fontWeight: 800, borderRadius: 999, fontSize: 10 }}>EMP ID: {profile.employeeId}</Tag>
            {!compact && <Tag style={{ margin: 0, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, fontWeight: 750, fontSize: 10 }}>ACTIVE</Tag>}
          </Space>
        </div>
        <div className="profile-hero-grid" style={{ padding: compact ? '16px 14px' : '20px 18px 18px', display: 'grid', gridTemplateColumns: compact ? 'auto 1fr' : 'auto 1fr auto', gap: 18, alignItems: 'center' }}>
          <Avatar size={compact ? 64 : 84} style={{ background: '#fff', color: '#0e0e0e', fontWeight: 900, fontSize: compact ? 20 : 28, border: '2px solid #fff', flexShrink: 0 }}>{profile.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}</Avatar>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ fontSize: compact ? 18 : 22, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>{profile.name}</div>
              <Tag style={{ margin: 0, background: '#fff', color: '#0e0e0e', borderColor: '#fff', fontWeight: 800, borderRadius: 999, fontSize: 11, display: 'inline-flex', alignItems: 'center', gap: 4 }}><SafetyCertificateOutlined /> GOVT VERIFIED</Tag>
            </div>
            <div style={{ marginTop: 6, color: 'rgba(255,255,255,0.7)', fontSize: 13, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><TeamOutlined /> {profile.role} • {profile.department}</span></div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 999, padding: '4px 10px', color: 'rgba(255,255,255,0.85)', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}><MailOutlined /> {profile.email}</span>
              <span style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 999, padding: '4px 10px', color: 'rgba(255,255,255,0.85)', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}><PhoneOutlined /> {profile.phone}</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Last login: {profile.lastLogin} • Joined {profile.joiningDate}</div>
          </div>
          {!compact && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
              {!editing ? <Button className="btn-invert" icon={<EditOutlined />} onClick={() => setEditing(true)} style={{ borderRadius: 10, fontWeight: 800, height: 38, paddingInline: 16 }}>Edit Profile</Button> : <Space><Button onClick={handleCancel} style={{ borderRadius: 10, height: 38, background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 700 }}>Cancel</Button><Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ borderRadius: 10, height: 38, fontWeight: 800, background: '#fff', color: '#0e0e0e', borderColor: '#fff' }}>Save</Button></Space>}
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}><IdcardOutlined /> {profile.govId}</div>
            </div>
          )}
        </div>
      </div>

      {!compact && (
        <Row gutter={[12, 12]} className="stagger-container">
          {stats.map((s) => (
            <Col xs={12} lg={6} key={s.label}>
              <Card bordered={false} className="saffron-card kpi-card" bodyStyle={{ padding: 14 }} style={{ height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div><div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', color: '#737373' }}>{s.label.toUpperCase()}</div><div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.03em', color: '#242424', marginTop: 6, lineHeight: 1 }}>{s.value}</div><div style={{ fontSize: 11, color: '#a3a3a3', marginTop: 4 }}>{s.sub}</div></div>
                  <div className="metric-icon-wrap">{s.icon}</div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={compact ? 24 : 14}>
          <Card title={<span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#242424', fontSize: 14 }}>Personal & Government Details</span>} extra={!editing ? <Tag style={{ margin: 0, borderRadius: 999, background: '#242424', color: '#fff', borderColor: '#242424', fontWeight: 800, fontSize: 11 }}><LockOutlined /> Read-only</Tag> : <Tag style={{ margin: 0, borderRadius: 999, background: '#fff', color: '#242424', border: '1px solid #242424', fontWeight: 800, fontSize: 11 }}>Editing</Tag>} bordered={false} className="saffron-card" style={{ height: '100%' }} bodyStyle={{ padding: 16 }}>
            <Row gutter={[12, 12]}>
              <Col xs={24} sm={12}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>FULL NAME</div>{editing ? <Input prefix={<UserOutlined style={{ color: '#a3a3a3' }} />} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} style={{ borderRadius: 10, height: 38 }} /> : <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#242424', fontSize: 13 }}><UserOutlined style={{ color: '#737373' }} /> {profile.name}</div>}</Col>
              <Col xs={24} sm={12}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>GOVERNMENT EMAIL</div>{editing ? <Input prefix={<MailOutlined style={{ color: '#a3a3a3' }} />} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} style={{ borderRadius: 10, height: 38 }} /> : <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: '#242424', fontSize: 13 }}><MailOutlined style={{ color: '#737373' }} /> {profile.email}</div>}</Col>
              <Col xs={24} sm={12}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>PHONE</div>{editing ? <Input prefix={<PhoneOutlined style={{ color: '#a3a3a3' }} />} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} style={{ borderRadius: 10, height: 38 }} /> : <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: '#242424', fontSize: 13 }}><PhoneOutlined style={{ color: '#737373' }} /> {profile.phone}</div>}</Col>
              <Col xs={24} sm={12}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>EMPLOYEE ID</div><div style={{ background: '#242424', border: '1px solid #242424', borderRadius: 10, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, color: '#fff', fontSize: 13, fontFamily: 'JetBrains Mono, monospace' }}><IdcardOutlined /> {profile.employeeId}</div></Col>
              <Col xs={24} sm={12}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>DEPARTMENT</div>{editing ? <Input prefix={<TeamOutlined style={{ color: '#a3a3a3' }} />} value={draft.department} onChange={(e) => setDraft({ ...draft, department: e.target.value })} style={{ borderRadius: 10, height: 38 }} /> : <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 12px', fontWeight: 600, color: '#242424', fontSize: 13 }}>{profile.department}</div>}</Col>
              <Col xs={24} sm={12}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>DESIGNATION</div>{editing ? <Input prefix={<AuditOutlined style={{ color: '#a3a3a3' }} />} value={draft.designation} onChange={(e) => setDraft({ ...draft, designation: e.target.value })} style={{ borderRadius: 10, height: 38 }} /> : <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 12px', fontWeight: 600, color: '#242424', fontSize: 13 }}>{profile.designation}</div>}</Col>
              <Col xs={24} sm={12}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>POSTING LOCATION</div>{editing ? <Input prefix={<EnvironmentOutlined style={{ color: '#a3a3a3' }} />} value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} style={{ borderRadius: 10, height: 38 }} /> : <div style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 12px', fontWeight: 500, color: '#242424', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><EnvironmentOutlined style={{ color: '#737373' }} /> {profile.location}</div>}</Col>
              <Col xs={12} sm={6}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>DISTRICT</div><div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 12px', fontWeight: 700, color: '#242424', fontSize: 13 }}>{profile.district}</div></Col>
              <Col xs={12} sm={6}><div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', marginBottom: 6 }}>JOINING</div><div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 12px', fontWeight: 700, color: '#242424', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><CalendarOutlined style={{ color: '#737373' }} /> {profile.joiningDate}</div></Col>
            </Row>
            <Divider style={{ margin: '16px 0' }} />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Tag style={{ margin: 0, borderRadius: 999, background: '#fafafa', border: '1px solid #e5e5e5', color: '#242424', fontWeight: 700 }}><GlobalOutlined /> Languages: {profile.language}</Tag><Tag style={{ margin: 0, borderRadius: 999, background: '#242424', color: '#fff', borderColor: '#242424', fontWeight: 800 }}><SafetyCertificateOutlined /> Aadhaar-seeded</Tag><Tag style={{ margin: 0, borderRadius: 999, background: '#fff', color: '#242424', border: '1px dashed #a3a3a3', fontWeight: 700 }}>Role: Admin</Tag></div>
            {editing && <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}><Button onClick={handleCancel} style={{ borderRadius: 10, fontWeight: 700 }}>Cancel</Button><Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ borderRadius: 10, fontWeight: 800 }}>Save</Button></div>}
            <div style={{ marginTop: 10, fontSize: 11, color: '#a3a3a3', lineHeight: 1.5, textAlign: 'center' }}>All edits audit-logged • Contact IT cell for role changes</div>
          </Card>
        </Col>
        {!compact && (
          <Col xs={24} lg={10} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Card bordered={false} className="invert-card" style={{ borderRadius: 14 }} bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontWeight: 850, color: '#fff', fontSize: 14 }}>Performance Overview</span><Tag style={{ margin: 0, background: '#fff', color: '#0e0e0e', borderColor: '#fff', fontWeight: 800, borderRadius: 999, fontSize: 10 }}><ThunderboltOutlined /> TOP PERFORMER</Tag></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ background: '#fff', borderRadius: 10, padding: 12, textAlign: 'center', border: '1px solid #fff' }}><div style={{ fontSize: 10, fontWeight: 850, letterSpacing: '0.06em', color: '#737373' }}>VERIFICATION RATE</div><div style={{ marginTop: 6 }}><Progress type="dashboard" percent={96} size={64} strokeColor="#0e0e0e" trailColor="#f0f0f0" strokeWidth={7} format={(p) => <span style={{ fontWeight: 900, color: '#0e0e0e', fontSize: 14 }}>{p}%</span>} /></div><div style={{ fontSize: 11, color: '#737373', marginTop: 4 }}>1,248 verified</div></div>
                <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 10, padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)' }}>ACCOUNT SECURITY</div><div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, color: '#fff', fontSize: 13 }}><SafetyCertificateOutlined style={{ color: '#fff' }} /> 2FA Enabled</div><div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>Last password change: 25 Aug 2026</div><Progress percent={100} showInfo={false} strokeColor="#fff" trailColor="rgba(255,255,255,0.18)" strokeWidth={5} size="small" style={{ marginTop: 10 }} /></div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 700 }}><FileTextOutlined /> Avg. handle time</span><span style={{ fontWeight: 900, color: '#fff', fontSize: 13 }}>2.4 min / record</span></div>
            </Card>
            <Card title={<span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#242424', fontSize: 14 }}>Security & Preferences</span>} bordered={false} className="saffron-card" bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'grid', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '10px 12px' }}><span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#242424', fontSize: 13 }}><KeyOutlined /> Change Password</span><Button size="small" onClick={() => message.info('Password change opens in secure Gov vault')} style={{ borderRadius: 8, fontWeight: 700, height: 28 }}>Manage</Button></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '10px 12px' }}><span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#242424', fontSize: 13 }}><SettingOutlined /> Notification Prefs</span><Button size="small" onClick={() => message.info('Preferences: email + in-app enabled')} style={{ borderRadius: 8, fontWeight: 700, height: 28 }}>Configure</Button></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px dashed #d4d4d4', borderRadius: 10, padding: '10px 12px' }}><span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#242424', fontSize: 13 }}><EyeOutlined /> Active Sessions</span><Tag style={{ margin: 0, background: '#242424', color: '#fff', borderColor: '#242424', fontWeight: 800, borderRadius: 999 }}>1 active</Tag></div>
              </div>
            </Card>
            <Card title={<span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#242424', fontSize: 14 }}>Recent Activity • Audit Trail</span>} bordered={false} className="saffron-card" bodyStyle={{ padding: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {activity.map((a, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center', padding: '10px 0', borderBottom: idx === activity.length - 1 ? 'none' : '1px solid #f5f5f5' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: a.status === 'Verified' ? '#242424' : '#fafafa', color: a.status === 'Verified' ? '#fff' : '#242424', border: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>{a.status === 'Verified' ? <CheckCircleOutlined /> : a.status === 'Synced' ? <GlobalOutlined /> : a.status === 'Edited' ? <EditOutlined /> : a.status === 'Ingested' ? <FileTextOutlined /> : <LockOutlined />}</div>
                    <div style={{ minWidth: 0 }}><div style={{ fontWeight: 700, color: '#242424', fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.action}</div><div style={{ fontSize: 11, color: '#737373', marginTop: 2 }}>{a.time}</div></div>
                    <Tag style={{ margin: 0, borderRadius: 999, background: a.status === 'Verified' ? '#242424' : '#fff', color: a.status === 'Verified' ? '#fff' : '#242424', border: '1px solid #242424', fontWeight: 800, fontSize: 10 }}>{a.status}</Tag>
                  </div>
                ))}
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#a3a3a3' }}><span>5 of 128 events</span><Button type="link" size="small" style={{ padding: 0, fontWeight: 700, color: '#242424', fontSize: 11 }} onClick={() => message.info('Full audit trail in Analytics')}>View full trail →</Button></div>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}
export default Profile;
