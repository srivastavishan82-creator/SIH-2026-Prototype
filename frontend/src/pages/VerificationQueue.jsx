import { useState } from 'react';
import { Table, Tag, Button, Typography, Card, Input, Space, Tooltip, Segmented, Badge } from 'antd';
import { CheckCircleOutlined, SearchOutlined, EyeOutlined, EditOutlined, WarningOutlined, FilterOutlined, ClockCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
function VerificationQueue(){
  const [filter,setFilter]=useState('All'); const [query,setQuery]=useState('');
  const [data,setData]=useState([
    {key:'1', document:'registry_2025.pdf', type:'Sale Deed', field:'Plot Area', value:'2.45', confidence:45, status:'Low Confidence', district:'Agra'},
    {key:'2', document:'khasra_map_045.jpg', type:'Cadastral Map', field:'Khasra Number', value:'123/4A', confidence:62, status:'Needs Review', district:'Lucknow'},
    {key:'3', document:'handwritten_register.pdf', type:'Khatauni', field:'Landowner Name', value:'राजेश कुमार', confidence:71, status:'Needs Review', district:'Varanasi'},
    {key:'4', document:'mutation_092.png', type:'Mutation', field:'Village Name', value:'Rampur', confidence:55, status:'Low Confidence', district:'Kanpur'},
  ]);
  const verify=(rec)=> setData(data.map(i=> i.key===rec.key? {...i, status:'Verified'}:i));
  const filtered=data.filter(d=>{
    if(filter!=='All' && d.status!==filter) return false;
    if(query && !`${d.document} ${d.field} ${d.value} ${d.type}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
  const columns=[
    {title:'Document', dataIndex:'document', key:'document', render:(text,rec)=> (<div style={{lineHeight:1.25}}><Text strong style={{color:'#242424', fontSize:13}}>{text}</Text><div style={{fontSize:12, color:'#737373'}}>{rec.type} • {rec.district}</div></div>)},
    {title:'Flagged Field', dataIndex:'field', key:'field', render:(t)=><Text style={{fontWeight:600, color:'#171717'}}>{t}</Text>},
    {title:'Extracted Value', dataIndex:'value', key:'value', render:(text)=><span style={{fontFamily:'JetBrains Mono, monospace', background:'#fafafa', border:'1px solid #e5e5e5', padding:'4px 8px', borderRadius:8, fontSize:12, fontWeight:650, color:'#242424'}}>{text}</span>},
    {title:'Confidence', dataIndex:'confidence', key:'confidence', width:150, render:(val)=>{
        const bg = val<60?'#a3a3a3': val<80?'#525252':'#242424';
        return (<div style={{display:'flex', alignItems:'center', gap:8}}><div style={{width:64, height:6, background:'#f5f5f5', border:'1px solid #e5e5e5', borderRadius:999, overflow:'hidden'}}><div style={{width:`${val}%`, height:'100%', background:bg, borderRadius:999}} /></div><Tag style={{margin:0, borderRadius:999, background:'#fff', border:'1px solid #242424', color:'#242424', fontWeight:800}}>{val}%</Tag></div>);
      }},
    {title:'Status', dataIndex:'status', key:'status', width:145, render:(status)=>{
        if(status==='Verified') return <Tag style={{background:'#242424', color:'#fff', borderColor:'#242424'}}>Verified</Tag>;
        if(status==='Low Confidence') return <Tag style={{background:'#fff', border:'1px dashed #a3a3a3', color:'#242424'}}>Low Confidence</Tag>;
        return <Tag style={{background:'#fff', border:'1px solid #242424', color:'#242424'}}>Needs Review</Tag>;
      }},
    {title:'', key:'action', width:155, render:(_,rec)=>(
        <Space>
          <Button type={rec.status==='Verified'?'default':'primary'} size="small" icon={rec.status==='Verified'?<CheckCircleOutlined />:<EditOutlined />} onClick={()=>verify(rec)} disabled={rec.status==='Verified'} style={{borderRadius:8, fontWeight:650}}>{rec.status==='Verified'?'Verified':'Review'}</Button>
          <Tooltip title="Open inspection"><Button type="text" size="small" icon={<EyeOutlined style={{color:'#242424'}} />} style={{borderRadius:8, border:'1px solid #e5e5e5', background:'#fff'}} /></Tooltip>
        </Space>
      )},
  ];
  const stats=[{label:'Queued', value:data.length},{label:'Low Conf.', value:data.filter(d=>d.status==='Low Confidence').length},{label:'Verified', value:data.filter(d=>d.status==='Verified').length}];
  return (
    <div className="animate-fade-in-up" style={{display:'flex', flexDirection:'column', gap:16}}>
      <div className="hero-bw grain grid-bw" style={{borderRadius:12, padding:'14px 16px', display:'flex', justifyContent:'space-between', gap:12, flexWrap:'wrap', alignItems:'center'}}>
        <div>
          <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.14em', color:'rgba(255,255,255,0.55)', fontWeight:700}}>— QUEUE • HUMAN-IN-THE-LOOP — SLA &lt; 4H</div>
          <div style={{fontWeight:900, fontSize:22, letterSpacing:'-0.03em', lineHeight:1, marginTop:4, color:'#fff'}}>Verification Queue <span className="outline-text">— review</span></div>
          <div style={{color:'rgba(255,255,255,0.68)', fontSize:12, marginTop:6}}>Low-confidence fields • audit-trailed • 4 reviewers active</div>
        </div>
        <Space wrap><Tag style={{borderRadius:999, padding:'5px 10px', background:'#fff', color:'#0e0e0e', border:'1px solid #fff', fontWeight:800}}>Auto-routed 10%</Tag><Tag style={{borderRadius:999, padding:'5px 10px', background:'transparent', color:'#fff', border:'1px solid rgba(255,255,255,0.28)', fontWeight:700}}><Badge status="processing" color="#fff" /> 4 active</Tag></Space>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:12}}>
        {stats.map(s=>(
          <Card key={s.label} bordered={false} className="saffron-card" bodyStyle={{padding:14, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div><div style={{fontSize:11, fontWeight:800, letterSpacing:'0.06em', color:'#737373'}}>{s.label.toUpperCase()}</div><div style={{fontSize:22, fontWeight:900, color:'#242424', letterSpacing:'-0.03em', marginTop:2}}>{s.value}</div></div>
            <div style={{width:36, height:36, borderRadius:10, background:'#242424', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, border:'1px solid #242424'}}>{s.value}</div>
          </Card>
        ))}
      </div>
      <Card bordered={false} className="saffron-card animate-scale-in" bodyStyle={{padding:16}}>
        <div style={{display:'flex', gap:12, flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
          <Space wrap><Segmented options={['All','Low Confidence','Needs Review','Verified']} value={filter} onChange={setFilter} style={{background:'#f5f5f5', padding:4, borderRadius:10}} /><span style={{display:'inline-flex', alignItems:'center', gap:6, color:'#737373', fontSize:12}}><FilterOutlined /> {filtered.length} records</span></Space>
          <Input placeholder="Search documents, fields, owners…" prefix={<SearchOutlined style={{color:'#a3a3a3'}} />} value={query} onChange={(e)=>setQuery(e.target.value)} allowClear style={{width:320, background:'#fff', borderRadius:10, height:36}} />
        </div>
        <Table dataSource={filtered} columns={columns} pagination={{pageSize:10, showSizeChanger:false}} style={{background:'transparent'}} scroll={{x:800}} />
      </Card>
      <style>{`@media(max-width:700px){ div[style*="repeat(3"]{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}
export default VerificationQueue;

