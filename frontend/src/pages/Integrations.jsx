import { useState } from 'react';
import { Card, Button, message, Tabs, Table, Typography, Space, Badge, Popconfirm, List, Avatar, Tag, Divider } from 'antd';
import { ApiOutlined, GlobalOutlined, KeyOutlined, DeleteOutlined, SyncOutlined, CheckCircleOutlined, CopyOutlined, PlusOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
function Integrations(){
  const [loading,setLoading]=useState(false); const [lrmsStatus,setLrmsStatus]=useState('disconnected'); const [lrmsResponse,setLrmsResponse]=useState(null);
  const [apiKeys,setApiKeys]=useState([
    {id:'1', name:'GIS System Integration', key:'lrds_abc123...', created:'2026-08-20', lastUsed:'2026-08-26 14:31', scope:'read • write'},
    {id:'2', name:'Mobile App — Prod', key:'lrds_xyz789...', created:'2026-08-15', lastUsed:'2026-08-25 09:12', scope:'read'},
  ]);
  const lrmsColumns=[{title:'Status', dataIndex:'status', key:'status', render:(v)=><Tag style={{background:'#242424', color:'#fff', borderColor:'#242424'}}>{v}</Tag>},{title:'Records Synced', dataIndex:'records_synced', key:'records_synced', render:(v)=><span style={{fontWeight:800, color:'#242424'}}>{v}</span>},{title:'Timestamp', dataIndex:'timestamp', key:'timestamp', render:(v)=><span style={{color:'#737373', fontSize:12}}>{v}</span>}];
  const syncLrms=()=>{ setLoading(true); setLrmsStatus('syncing'); setTimeout(()=>{ setLrmsResponse({status:'Success', records_synced:245, timestamp:new Date().toLocaleString()}); setLrmsStatus('connected'); setLoading(false); message.success('LRMS sync completed — 245 records reconciled');},1800); };
  const deleteKey=(id)=>{ setApiKeys(apiKeys.filter(k=>k.id!==id)); message.success('API key revoked'); };
  const generateKey=()=>{ const nk={id:Date.now().toString(), name:'New Integration Key', key:`lrds_${Math.random().toString(36).substring(2,8)}...`, created:new Date().toISOString().split('T')[0], lastUsed:'Never', scope:'read'}; setApiKeys([nk, ...apiKeys]); message.success('New API key generated — copy now, it will be hidden later'); };
  const items=[
    { key:'systems', label:'System Connections', icon:<GlobalOutlined />, children:(
        <div style={{display:'flex', flexDirection:'column', gap:14, padding:'6px 0'}}>
          <Card bordered={false} className="saffron-card" bodyStyle={{padding:16}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:16, flexWrap:'wrap', alignItems:'center'}}>
              <div style={{display:'flex', gap:14, alignItems:'center', minWidth:260}}>
                <div style={{width:44, height:44, borderRadius:10, background:'#242424', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:18, border:'1px solid #242424'}}><GlobalOutlined /></div>
                <div><div style={{fontWeight:850, color:'#242424'}}>LRMS / DILRMP Sync</div><div style={{fontSize:12, color:'#737373'}}>Sync verified records to central government database with idempotency & audit log.</div><Space size={6} style={{marginTop:8}} wrap><Tag style={{borderRadius:999, background:'#fff', border:'1px solid #242424', color:'#242424', fontWeight:700}}>mTLS</Tag><Tag style={{borderRadius:999, background:'#242424', border:'1px solid #242424', color:'#fff', fontWeight:700}}>Idempotent</Tag></Space></div>
              </div>
              <div style={{textAlign:'right', display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8}}>
                {lrmsStatus==='disconnected' && <Badge status="default" text={<span style={{fontWeight:700, color:'#737373', fontSize:12}}>Disconnected</span>} />}
                {lrmsStatus==='syncing' && <Badge status="processing" color="#242424" text={<span style={{fontWeight:700, color:'#242424', fontSize:12}}>Syncing…</span>} />}
                {lrmsStatus==='connected' && <Badge status="success" color="#242424" text={<span style={{fontWeight:700, color:'#242424', fontSize:12}}>Connected • Healthy</span>} />}
                <Button type={lrmsStatus==='connected'?'default':'primary'} icon={lrmsStatus==='syncing'?<SyncOutlined spin />:<ApiOutlined />} loading={loading} onClick={syncLrms} style={{borderRadius:8, fontWeight:700}}>{lrmsStatus==='connected'?'Sync Again':'Connect & Sync'}</Button>
                <div style={{fontSize:11, color:'#a3a3a3'}}>Last full sync: 2 hours ago</div>
              </div>
            </div>
            {lrmsResponse && <div style={{marginTop:14, background:'#fafafa', border:'1px solid #e5e5e5', borderRadius:10, padding:12}}><div style={{fontWeight:800, color:'#242424', fontSize:11, letterSpacing:'0.05em'}}>LAST SYNC RESULT</div><Table dataSource={[lrmsResponse]} columns={lrmsColumns} pagination={false} size="small" style={{marginTop:8}} /></div>}
          </Card>
          <Card bordered={false} className="saffron-card" bodyStyle={{padding:16}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:16, flexWrap:'wrap', alignItems:'center'}}>
              <div style={{display:'flex', gap:14, alignItems:'center'}}><div style={{width:44, height:44, borderRadius:10, background:'#fff', border:'1px solid #242424', display:'flex', alignItems:'center', justifyContent:'center', color:'#242424', fontSize:18}}><CheckCircleOutlined /></div><div><div style={{fontWeight:850, color:'#242424'}}>PostGIS — Parcel & Cadastral Layer</div><div style={{fontSize:12, color:'#737373'}}>Spatial fetch for GeoJSON export • SRID 4326 • Tile cache enabled.</div></div></div>
              <Space><Tag style={{borderRadius:999, background:'#242424', color:'#fff', borderColor:'#242424', fontWeight:700}}>Connected</Tag><Button style={{borderRadius:8, background:'#fff', border:'1px solid #e5e5e5', fontWeight:650, color:'#242424'}}>Configure</Button></Space>
            </div>
            <Divider style={{margin:'12px 0'}} className="divider-subtle" />
            <div style={{display:'flex', gap:16, flexWrap:'wrap', fontSize:12, color:'#737373'}}><span>• Latency p95: <b style={{color:'#242424'}}>42ms</b></span><span>• Tiles cached: <b style={{color:'#242424'}}>12.4k</b></span><span style={{display:'inline-flex', alignItems:'center', gap:6}}><span style={{width:6, height:6, borderRadius:999, background:'#242424'}} /> Operational</span></div>
          </Card>
          <Card bordered={false} style={{background:'#242424', borderRadius:12, border:'1px solid #242424'}} bodyStyle={{padding:16}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap', alignItems:'center'}}>
              <div><div style={{color:'#fff', fontWeight:800, display:'flex', alignItems:'center', gap:8}}>● System Health</div><div style={{color:'#a3a3a3', fontSize:12, marginTop:4}}>All subsystems nominal • Last checked 12s ago</div></div>
              <Space wrap><Tag style={{borderRadius:999, background:'#fff', color:'#242424', border:'1px solid #fff', fontWeight:750}}>API 99.98%</Tag><Tag style={{borderRadius:999, background:'transparent', border:'1px solid #525252', color:'#d4d4d4', fontWeight:700}}>OCR 99.2%</Tag><Tag style={{borderRadius:999, background:'transparent', border:'1px solid #525252', color:'#d4d4d4', fontWeight:700}}>Queue 46</Tag></Space>
            </div>
          </Card>
        </div>
      )},
    { key:'apikeys', label:'API Keys', icon:<KeyOutlined />, children:(
        <div style={{padding:'6px 0'}}>
          <div style={{display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap', alignItems:'center', marginBottom:12}}>
            <Text style={{color:'#737373', fontSize:13}}>Programmatic access for GIS, mobile and partner integrations. Keys are shown once.</Text>
            <Button type="primary" icon={<PlusOutlined />} onClick={generateKey} style={{borderRadius:8, fontWeight:700}}>Generate New Key</Button>
          </div>
          <List bordered dataSource={apiKeys} style={{borderRadius:12, borderColor:'#e5e5e5', background:'#fff', overflow:'hidden'}} renderItem={item=>(
              <List.Item actions={[
                  <Button key="copy" size="small" icon={<CopyOutlined />} onClick={()=>{ navigator.clipboard?.writeText(item.key); message.success('Copied to clipboard'); }} style={{borderRadius:8, fontWeight:650, border:'1px solid #242424', color:'#242424', background:'#fff'}}>Copy</Button>,
                  <Popconfirm key="del" title="Revoke this API key? This cannot be undone." onConfirm={()=>deleteKey(item.id)}><Button type="text" danger icon={<DeleteOutlined />} style={{borderRadius:8}} /></Popconfirm>
                ]}>
                <List.Item.Meta avatar={<Avatar style={{background:'#242424', color:'#fff', border:'1px solid #242424'}} icon={<KeyOutlined />} />} title={<span style={{fontWeight:750, color:'#242424'}}>{item.name} <Tag style={{marginLeft:8, borderRadius:999, background:'#fafafa', border:'1px solid #e5e5e5', color:'#525252', fontWeight:700}}>{item.scope}</Tag></span>} description={<Space direction="vertical" size={2}><span style={{fontFamily:'JetBrains Mono, monospace', background:'#fafafa', border:'1px solid #e5e5e5', padding:'3px 8px', borderRadius:8, fontSize:12, fontWeight:650, color:'#242424'}}>{item.key}</span><span style={{fontSize:12, color:'#a3a3a3'}}>Created {item.created} • Last used {item.lastUsed}</span></Space>} />
              </List.Item>
            )} />
          <div style={{marginTop:12, background:'#fafafa', border:'1px solid #242424', borderRadius:10, padding:'10px 12px', fontSize:12, color:'#242424', display:'flex', gap:8}}><span>⚑</span><span><b>Security:</b> Store keys in a vault. Rotate every 90 days. Revoke immediately if exposed.</span></div>
        </div>
      )},
  ];
  return (
    <div className="animate-fade-in-up" style={{display:'flex', flexDirection:'column', gap:16}}>
      <div className="hero-bw grain grid-bw" style={{borderRadius:12, padding:'14px 16px', display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap', alignItems:'center'}}>
        <div>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'rgba(255,255,255,0.55)', fontWeight:700}}>— SYSTEM • CONNECTIONS • KEYS —</div>
          <div style={{fontWeight:900, fontSize:22, letterSpacing:'-0.03em', lineHeight:1, marginTop:4, color:'#fff'}}>Settings & Integrations <span className="outline-text">— control</span></div>
          <div style={{color:'rgba(255,255,255,0.68)', fontSize:12, marginTop:6}}>External connections, keys and platform health — one pane</div>
        </div>
        <Tag style={{borderRadius:999, background:'#fff', color:'#0e0e0e', border:'1px solid #fff', fontWeight:800, padding:'5px 10px'}}>Gov Cloud • Private VPC</Tag>
      </div>
      <Card bordered={false} className="saffron-card animate-scale-in" bodyStyle={{padding:16}}><Tabs defaultActiveKey="systems" items={items} size="large" /></Card>
    </div>
  );
}
export default Integrations;

