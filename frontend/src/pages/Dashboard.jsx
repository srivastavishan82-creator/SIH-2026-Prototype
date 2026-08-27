import { useState } from 'react';
import { Card, Row, Col, Progress, Table, Tag, Typography, Space, Button, Badge, Tooltip, Divider } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, EyeOutlined, CloudUploadOutlined, SafetyCertificateOutlined, GlobalOutlined, TeamOutlined, RiseOutlined, WarningOutlined, ThunderboltOutlined, ExperimentOutlined, AuditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Title, Text } = Typography;

function Dashboard() {
  const navigate = useNavigate();
  const [stats] = useState({ total: 413, processed: 367, pending: 46, accuracy: 94.8 });
  const recentDocuments = [
    { key: '1', name: 'land_record_001.pdf', type: 'Handwritten Register', district: 'Agra', status: 'Completed', confidence: 92, date: '26 Aug • 14:30' },
    { key: '2', name: 'khasra_map_045.jpg', type: 'Cadastral Map', district: 'Lucknow', status: 'Processing', confidence: null, date: '26 Aug • 14:28' },
    { key: '3', name: 'registry_2025.pdf', type: 'Printed PDF', district: 'Varanasi', status: 'Pending Review', confidence: 78, date: '25 Aug • 09:15' },
    { key: '4', name: 'handwritten_register.pdf', type: 'Khatauni', district: 'Kanpur', status: 'Completed', confidence: 85, date: '25 Aug • 08:45' },
    { key: '5', name: 'mutation_record.png', type: 'Mutation', district: 'Prayagraj', status: 'Completed', confidence: 97, date: '24 Aug • 16:20' },
  ];
  const columns = [
    { title: 'Document', dataIndex: 'name', key: 'name', render: (text, rec) => (
        <Space size={10}>
          <div style={{ width:34, height:34, borderRadius:8, background:'#242424', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, border:'1px solid #242424' }}><FileTextOutlined /></div>
          <div style={{lineHeight:1.25}}><div style={{fontWeight:700, color:'#242424', fontSize:13}}>{text}</div><div style={{fontSize:12, color:'#737373'}}>{rec.district} • {rec.type}</div></div>
        </Space>
      )},
    { title: 'Status', dataIndex: 'status', key: 'status', width:145, render: (status) => {
        if (status === 'Completed') return <Tag style={{background:'#242424', color:'#fff', borderColor:'#242424'}}>Verified</Tag>;
        if (status === 'Processing') return <Tag style={{background:'#fff', color:'#242424', border:'1px solid #242424'}}>Processing</Tag>;
        if (status === 'Pending Review') return <Tag style={{background:'#fff', color:'#242424', border:'1px dashed #a3a3a3'}}>Needs Review</Tag>;
        return <Tag>{status}</Tag>;
      }},
    { title: 'AI Confidence', dataIndex: 'confidence', key: 'confidence', width:140, render: (val) => {
        if (val==null) return <Text type="secondary" style={{fontSize:12}}>Analysing…</Text>;
        return (<div style={{display:'flex', alignItems:'center', gap:8}}><div style={{flex:1, height:6, background:'#f5f5f5', border:'1px solid #e5e5e5', borderRadius:999, overflow:'hidden', minWidth:60}}><div style={{width:`${val}%`, height:'100%', background: val>=90?'#242424': val>=80?'#525252':'#a3a3a3', borderRadius:999}} /></div><span style={{fontWeight:800, fontSize:13, minWidth:30, color:'#242424'}}>{val}%</span></div>);
      }},
    { title: 'Updated', dataIndex: 'date', key: 'date', width:120, render: (d)=> <Text style={{color:'#737373', fontSize:13}}>{d}</Text> },
    { title: '', key: 'action', width:80, render: (_,r)=> <Button type="text" size="small" icon={<EyeOutlined />} onClick={()=>navigate('/documents')} style={{color:'#242424', fontWeight:700, border:'1px solid #e5e5e5', background:'#fff', borderRadius:8}}>View</Button> },
  ];
  const kpis = [
    { label: 'Total Ingested', value: stats.total, delta:'+12.4%', sub:'vs last week', icon:<FileTextOutlined /> },
    { label: 'Verified & Digitized', value: stats.processed, delta:'+8.1%', sub:'auto-verified', icon:<CheckCircleOutlined /> },
    { label: 'Pending Review', value: stats.pending, delta:'4 urgent', sub:'needs attention', icon:<ClockCircleOutlined /> },
    { label: 'Model Accuracy', value: `${stats.accuracy}%`, delta:'+2.1%', sub:'extraction F1', icon:<SafetyCertificateOutlined /> },
  ];

  return (
    <div className="animate-fade-in-up" style={{display:'flex', flexDirection:'column', gap:16}}>
      {/* EYE-CATCHY HERO - B/W EDITORIAL */}
      <div className="hero-bw grain grid-bw" style={{borderRadius:16, padding:0, border:'1px solid #111'}}>
        {/* Top bar */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 14px', borderBottom:'1px solid rgba(255,255,255,0.10)', background:'rgba(255,255,255,0.02)', backdropFilter:'blur(6px)'}}>
          <Space size={8}>
            <span style={{display:'inline-flex', alignItems:'center', gap:7, background:'#fff', color:'#0e0e0e', borderRadius:999, padding:'4px 9px', fontSize:11, fontWeight:850, letterSpacing:'0.04em'}}><span style={{width:7, height:7, borderRadius:999, background:'#0e0e0e'}} className="pulse-dot-light" /> SIH 2026 • GOVERNMENT OF INDIA</span>
            <span style={{color:'rgba(255,255,255,0.55)', fontSize:11, letterSpacing:'0.06em', fontWeight:700, display:'inline-flex', gap:6, alignItems:'center'}}><ThunderboltOutlined /> OCR • NLP • VISION • GEOJSON</span>
          </Space>
          <Space size={6} style={{color:'rgba(255,255,255,0.7)', fontSize:11}}><span style={{display:'inline-flex', gap:6, alignItems:'center'}}><span style={{width:6, height:6, borderRadius:999, background:'#fff'}} /> Live</span><span>•</span><span>413 records</span></Space>
        </div>

        <div className="dashboard-hero-grid" style={{display:'grid', gridTemplateColumns:'1.35fr 0.85fr', gap:16, padding:'18px 18px 14px', alignItems:'center'}}>
          <div style={{position:'relative'}}>
            <div style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, letterSpacing:'0.14em', color:'rgba(255,255,255,0.55)', fontWeight:600, marginBottom:10}}>— LAND RECORD DIGITIZATION SYSTEM — EST. 2026</div>
            <div className="display-xl" style={{fontSize:'clamp(28px, 4.2vw, 46px)', color:'#fff'}}>
              <div>Land intelligence,</div>
              <div className="outline-text" style={{marginTop:2}}>verified at speed.</div>
            </div>
            <div style={{marginTop:12, color:'rgba(255,255,255,0.72)', fontSize:13.5, lineHeight:1.55, maxWidth:520}}>
              Unified AI pipeline for OCR, layout parsing and multilingual field extraction — human-in-the-loop guardrails, audit trails, and GeoJSON-ready output.
            </div>
            <div style={{display:'flex', gap:10, marginTop:16, flexWrap:'wrap'}}>
              <Button className="btn-invert" icon={<CloudUploadOutlined />} size="large" onClick={()=>navigate('/upload')} style={{borderRadius:10, height:40, paddingInline:18, fontWeight:850}}>Intake Documents</Button>
              <Button className="btn-ghost-dark" size="large" onClick={()=>navigate('/verification')} style={{borderRadius:10, height:40, fontWeight:650}}>Review Queue • 4 pending →</Button>
            </div>
            {/* Watermark */}
            <div style={{position:'absolute', right: -10, top: 44, fontSize: 84, fontWeight:900, letterSpacing:'-0.06em', lineHeight:1, color:'transparent', WebkitTextStroke:'1px rgba(255,255,255,0.07)', userSelect:'none', pointerEvents:'none'}}>LRDS</div>
          </div>

          <div style={{display:'grid', gap:12, alignContent:'center'}}>
            <div style={{background:'#fff', borderRadius:12, padding:14, border:'1px solid #fff', display:'grid', gridTemplateColumns:'1fr auto', gap:12, alignItems:'center'}}>
              <div>
                <div style={{fontSize:10, fontWeight:850, letterSpacing:'0.08em', color:'#737373'}}>TRUST SCORE — CERTIFIED PIPELINE</div>
                <div style={{display:'flex', alignItems:'baseline', gap:8, marginTop:6}}><span style={{fontSize:30, fontWeight:950, letterSpacing:'-0.05em', color:'#0e0e0e'}}>{stats.accuracy}%</span><Tag style={{margin:0, background:'#0e0e0e', color:'#fff', borderColor:'#0e0e0e', fontWeight:800, borderRadius:999}}>Top 1%</Tag></div>
                <Progress percent={stats.accuracy} showInfo={false} strokeColor="#0e0e0e" trailColor="#f0f0f0" size="small" style={{marginTop:8}} />
                <div style={{fontSize:11, color:'#737373', marginTop:6, display:'flex', gap:6, alignItems:'center'}}><SafetyCertificateOutlined /> 413 docs • Gov-grade</div>
              </div>
              <div style={{width:64, height:64, borderRadius:12, background:'#0e0e0e', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, border:'1px solid #0e0e0e'}}><ExperimentOutlined /></div>
            </div>
            <div style={{background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.14)', borderRadius:12, padding:12, backdropFilter:'blur(8px)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
              <div style={{display:'flex', alignItems:'center', gap:10}}><div style={{width:36, height:36, borderRadius:9, background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', color:'#0e0e0e', border:'1px solid #fff'}}><GlobalOutlined /></div><div><div style={{fontWeight:850, color:'#fff', fontSize:13}}>5 Districts • Live sync</div><div style={{fontSize:11, color:'rgba(255,255,255,0.65)'}}>Agra • Lucknow • Varanasi • Kanpur • Prayagraj</div></div></div>
              <div style={{textAlign:'right'}}><div style={{fontSize:11, color:'rgba(255,255,255,0.55)', letterSpacing:'0.06em', fontWeight:750}}>THROUGHPUT</div><div style={{fontWeight:900, color:'#fff', fontSize:14}}>88 <span style={{fontWeight:600, color:'rgba(255,255,255,0.7)', fontSize:12}}>/ day</span></div></div>
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.12)', background:'#fff', color:'#0e0e0e', overflow:'hidden', padding:'7px 0', borderRadius:'0 0 15px 15px'}}>
          <div className="marquee" style={{fontFamily:'JetBrains Mono, monospace', fontSize:11, fontWeight:750, letterSpacing:'0.08em'}}>
            <span>◆ HANDWRITTEN KHTAUNI</span><span>◆ CADASTRAL BHU-NAKSHA</span><span>◆ SALE DEED OCR</span><span>◆ MUTATION • DAKHIL KHARIJ</span><span>◆ MULTILINGUAL NLP — HI • EN • MR • TA • TE • BN</span><span>◆ CONFIDENCE GATE &gt; 80%</span><span>◆ HUMAN-IN-THE-LOOP</span><span>◆ GEOJSON EXPORT</span>
            <span>◆ HANDWRITTEN KHTAUNI</span><span>◆ CADASTRAL BHU-NAKSHA</span><span>◆ SALE DEED OCR</span><span>◆ MUTATION • DAKHIL KHARIJ</span><span>◆ MULTILINGUAL NLP — HI • EN • MR • TA • TE • BN</span><span>◆ CONFIDENCE GATE &gt; 80%</span><span>◆ HUMAN-IN-THE-LOOP</span><span>◆ GEOJSON EXPORT</span>
          </div>
        </div>
        <style>{`@media(max-width: 880px){ .hero-bw > div:nth-child(2){ grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <Row gutter={[12,12]} className="stagger-container">
        {kpis.map(k=>(
          <Col xs={24} sm={12} lg={6} key={k.label}>
            <Card bordered={false} className="saffron-card kpi-card animate-scale-in" bodyStyle={{padding:16}} style={{height:'100%'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12}}>
                <div><div style={{fontSize:11, fontWeight:800, letterSpacing:'0.06em', color:'#737373'}}>{k.label.toUpperCase()}</div><div style={{fontSize:26, fontWeight:900, letterSpacing:'-0.04em', color:'#242424', marginTop:6, lineHeight:1}}>{k.value}</div><div style={{marginTop:10, display:'flex', alignItems:'center', gap:6, fontSize:12}}><Tag style={{margin:0, borderRadius:999, background:'#242424', color:'#fff', borderColor:'#242424', fontWeight:750}}>{k.delta}</Tag><span style={{color:'#a3a3a3'}}>{k.sub}</span></div></div>
                <div className="metric-icon-wrap">{k.icon}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[12,12]}>
        <Col xs={24} lg={15}>
          <Card
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#242424', fontSize: 15 }}>
                  Digitization Pipeline & Stage Breakdown
                </span>
              </div>
            }
            extra={
              <Tag style={{ borderRadius: 999, background: '#242424', color: '#fff', borderColor: '#242424', fontWeight: 800 }}>
                {Math.round((stats.processed / stats.total) * 100)}% Digitized
              </Tag>
            }
            bordered={false}
            className="saffron-card animate-fade-in-up"
            style={{ height: '100%' }}
            bodyStyle={{ padding: 16 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { step: '01', title: 'Document Intake & Scan', desc: '413 ingested • checksum verified', count: '413 / 413', percent: 100, status: 'Completed', icon: <CloudUploadOutlined /> },
                { step: '02', title: 'AI Layout & OCR Tokenization', desc: '395 processed • 94.2% layout score', count: '395 / 413', percent: 95, status: 'Active', icon: <ExperimentOutlined /> },
                { step: '03', title: 'NLP Field Extraction', desc: '382 extracted • Devanagari & Latin', count: '382 / 413', percent: 92, status: 'Active', icon: <ThunderboltOutlined /> },
                { step: '04', title: 'Human Review & LRMS Sync', desc: '367 verified • 4 pending review', count: '367 / 413', percent: 88, status: '4 Pending', icon: <CheckCircleOutlined /> },
              ].map((stage) => (
                <div
                  key={stage.step}
                  style={{
                    background: '#fafafa',
                    border: '1px solid #e5e5e5',
                    borderRadius: 10,
                    padding: '10px 14px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1.3fr 1fr auto',
                    gap: 12,
                    alignItems: 'center'
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: '#242424', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 850, fontSize: 12, flexShrink: 0 }}>
                    {stage.step}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#242424', fontSize: 13, lineHeight: 1.2 }}>{stage.title}</div>
                    <div style={{ fontSize: 11, color: '#737373', marginTop: 2 }}>{stage.desc}</div>
                  </div>
                  <div style={{ minWidth: 100 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 750, color: '#242424', marginBottom: 3 }}>
                      <span>{stage.count}</span>
                      <span>{stage.percent}%</span>
                    </div>
                    <Progress percent={stage.percent} showInfo={false} strokeColor="#242424" trailColor="#e5e5e5" strokeWidth={5} />
                  </div>
                  <Tag style={{ margin: 0, borderRadius: 999, background: stage.status === 'Completed' ? '#242424' : '#fff', color: stage.status === 'Completed' ? '#fff' : '#242424', border: '1px solid #242424', fontWeight: 750, fontSize: 10, padding: '1px 8px' }}>
                    {stage.status}
                  </Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={9}>
          <Card className="invert-card animate-fade-in-up" bordered={false} style={{ height: '100%', borderRadius: 14 }} bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#fff', fontSize: 15 }}>AI Confidence Spectrum</span>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 1 }}>Overall Extraction F1: <strong style={{ color: '#fff' }}>94.8%</strong></div>
              </div>
              <Tag style={{ background: '#fff', color: '#0e0e0e', borderColor: '#fff', fontWeight: 800, borderRadius: 999, fontSize: 10, padding: '2px 8px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0e0e0e', display: 'inline-block', marginRight: 5 }} className="pulse-dot-light" />
                LIVE AUDIT
              </Tag>
            </div>

            {/* Segmented Spectrum Bar */}
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 3, display: 'flex', gap: 3, height: 10, overflow: 'hidden' }}>
              <div style={{ width: '65%', background: '#ffffff', borderRadius: 4, transition: 'width 0.4s ease' }} title="High (>90%): 65%" />
              <div style={{ width: '25%', background: 'rgba(255,255,255,0.55)', borderRadius: 4, transition: 'width 0.4s ease' }} title="Medium (70-90%): 25%" />
              <div style={{ width: '10%', background: 'rgba(255,255,255,0.25)', borderRadius: 4, transition: 'width 0.4s ease' }} title="Low (<70%): 10%" />
            </div>

            {/* Tier Breakdown Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 2 }}>
              {/* High Confidence Tier */}
              <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: '#fff', color: '#0e0e0e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 11 }}>
                    90+
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: 12 }}>High Confidence Tier</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)' }}>268 docs • Auto-Approved</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 900, color: '#fff', fontSize: 15 }}>65%</div>
                  <Tag style={{ margin: 0, padding: '0 6px', fontSize: 9.5, background: '#fff', color: '#0e0e0e', border: 'none', fontWeight: 800 }}>AUTO</Tag>
                </div>
              </div>

              {/* Medium Confidence Tier */}
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11 }}>
                    70+
                  </div>
                  <div>
                    <div style={{ fontWeight: 750, color: '#fff', fontSize: 12 }}>Medium Confidence Tier</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)' }}>103 docs • Guided Inspect</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 900, color: '#fff', fontSize: 15 }}>25%</div>
                  <Tag style={{ margin: 0, padding: '0 6px', fontSize: 9.5, background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 700 }}>VERIFY</Tag>
                </div>
              </div>

              {/* Low Confidence Tier */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.25)', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.1)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 11 }}>
                    &lt;70
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: 12 }}>Low Confidence Flag</div>
                    <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.6)' }}>42 docs • Routed to Queue</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 900, color: '#fff', fontSize: 15 }}>10%</div>
                  <Tag style={{ margin: 0, padding: '0 6px', fontSize: 9.5, background: '#fff', color: '#0e0e0e', border: 'none', fontWeight: 800 }}>FLAG</Tag>
                </div>
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 'auto', paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <AuditOutlined style={{ color: '#fff' }} /> Threshold &lt; 80% automatically routes field to HITL Queue
            </div>
          </Card>
        </Col>
      </Row>

      <Card title={<span style={{fontWeight:850, letterSpacing:'-0.02em', color:'#242424'}}>Recent Processing Records</span>} extra={<Button type="link" onClick={()=>navigate('/documents')} style={{fontWeight:750, color:'#242424'}}>View all records →</Button>} bordered={false} className="saffron-card animate-fade-in-up">
        <Table dataSource={recentDocuments} columns={columns} pagination={false} scroll={{x:680}} style={{background:'transparent'}} />
        <div style={{marginTop:12, display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12, color:'#737373', fontSize:12, borderTop:'1px solid #f5f5f5', paddingTop:12}}><span>Showing 5 of 413 • Sorted by recent activity</span><span style={{display:'inline-flex', gap:8, alignItems:'center'}}><span style={{width:7, height:7, borderRadius:999, background:'#242424'}} /> Live updates enabled</span></div>
      </Card>
    </div>
  );
}
export default Dashboard;
