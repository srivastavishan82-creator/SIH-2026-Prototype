import { Card, Row, Col, Typography, DatePicker, Tag, Space, Progress, Divider } from 'antd';
import {
  FileTextOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  RiseOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
  ExperimentOutlined,
  AuditOutlined,
  FireOutlined,
  RocketOutlined,
  GlobalOutlined,
  EyeOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

const { Text } = Typography;
const { RangePicker } = DatePicker;

function Analytics() {
  const districtData = [
    { name: 'Agra', processed: 120, pending: 20, state: 'UP West' },
    { name: 'Lucknow', processed: 98, pending: 15, state: 'UP Central' },
    { name: 'Varanasi', processed: 76, pending: 10, state: 'UP East' },
    { name: 'Kanpur', processed: 65, pending: 25, state: 'UP Central' },
    { name: 'Prayagraj', processed: 54, pending: 8, state: 'UP East' },
  ];
  const accuracyData = [
    { name: 'High (>90%)', value: 65, count: 268, label: 'AUTO' },
    { name: 'Medium (70-90%)', value: 25, count: 103, label: 'VERIFY' },
    { name: 'Low (<70%)', value: 10, count: 42, label: 'FLAG' },
  ];
  const trendData = [
    { date: 'Mon', volume: 45, note: 'steady' },
    { date: 'Tue', volume: 52, note: '↑ 15%' },
    { date: 'Wed', volume: 38, note: 'dip' },
    { date: 'Thu', volume: 65, note: 'ramp' },
    { date: 'Fri', volume: 88, note: 'surge' },
    { date: 'Sat', volume: 110, note: 'PEAK' },
    { date: 'Sun', volume: 85, note: 'ease' },
  ];
  const maxVol = Math.max(...trendData.map((d) => d.volume));
  const totalProcessed = districtData.reduce((a, c) => a + c.processed, 0);
  const totalPending = districtData.reduce((a, c) => a + c.pending, 0);

  const kpis = [
    { title: 'Total Documents', value: 413, icon: <FileTextOutlined />, delta: '+12.4%', sub: 'vs last week' },
    { title: 'Verified Records', value: 367, icon: <CheckCircleOutlined />, delta: '+8.1%', sub: 'auto-verified' },
    { title: 'Pending Review', value: 46, icon: <ClockCircleOutlined />, delta: '4 urgent', sub: 'needs attention' },
    { title: 'Processing Errors', value: 12, icon: <WarningOutlined />, delta: '-3', sub: 'resolved' },
  ];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* HERO */}
      <div className="hero-bw grain grid-bw" style={{ borderRadius: 16, padding: 0, border: '1px solid #111', overflow: 'hidden' }}>        <div className="analytics-hero-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.10)', background: 'rgba(255,255,255,0.02)', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0, overflow: 'hidden' }}>
            <span className="analytics-hero-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#fff', color: '#0e0e0e', borderRadius: 999, padding: '4px 9px', fontSize: 11, fontWeight: 850, letterSpacing: '0.04em', flexShrink: 0 }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: '#0e0e0e' }} className="pulse-dot-light" /> INTELLIGENCE • METRICS
            </span>
            <span className="analytics-hero-subtitle" style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, letterSpacing: '0.06em', fontWeight: 700, display: 'inline-flex', gap: 6, alignItems: 'center' }}>
              <ThunderboltOutlined /> THROUGHPUT • ACCURACY
            </span>
          </div>
          <Tag className="analytics-live-tag" style={{ margin: 0, background: '#fff', color: '#0e0e0e', borderColor: '#fff', fontWeight: 800, borderRadius: 999, fontSize: 10, flexShrink: 0 }}>LIVE • 413 records</Tag>
        </div>
        <div className="analytics-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 14, padding: '16px 16px 14px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>— ANALYTICS & REPORTS — EST. 2026</div>
            <div className="display-xl" style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', color: '#fff', marginTop: 8, lineHeight: 0.95 }}>
              <div>Performance,</div>
              <div className="outline-text">decoded in B/W.</div>
            </div>
            <div style={{ marginTop: 10, color: 'rgba(255,255,255,0.68)', fontSize: 12.5, lineHeight: 1.55, maxWidth: 520 }}>
              No pies. No rainbow bars. Pure editorial ledger - velocity, trust, and territory at a glance.
            </div>
            <div style={{ position: 'absolute', right: -6, top: 28, fontSize: 64, fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.07)', userSelect: 'none', pointerEvents: 'none' }}>INSIGHT</div>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 12, border: '1px solid #fff', display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 850, letterSpacing: '0.08em', color: '#737373' }}>7-DAY VELOCITY — PEAK SAT 110</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 24, fontWeight: 950, letterSpacing: '-0.04em', color: '#0e0e0e' }}>{totalProcessed + totalPending}</span>
                  <span style={{ fontSize: 12, color: '#737373', fontWeight: 700 }}>docs this week</span>
                  <Tag style={{ margin: 0, background: '#0e0e0e', color: '#fff', borderColor: '#0e0e0e', fontWeight: 800, borderRadius: 999, fontSize: 10 }}>+18%</Tag>
                </div>
              </div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#0e0e0e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                <RocketOutlined />
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 12, border: '1px solid rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 750, color: '#fff' }}>5 Districts • Live ledger</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Agra leads • Prayagraj fastest growth</div>
              </div>
              <Tag style={{ margin: 0, background: '#fff', color: '#0e0e0e', borderColor: '#fff', fontWeight: 800, borderRadius: 999, fontSize: 11 }}>F1 94.8%</Tag>
            </div>
          </div>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={15}>
          <Card className="saffron-card animate-fade-in-up" bordered={false} bodyStyle={{ padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#242424', fontSize: 15 }}>7-Day Intake Velocity</div>
                <div style={{ fontSize: 11, color: '#737373', marginTop: 2 }}>Daily ingestion volume & peak saturation points</div>
              </div>
              <Tag style={{ margin: 0, borderRadius: 999, background: '#242424', color: '#fff', borderColor: '#242424', fontWeight: 800, fontSize: 11 }}><RiseOutlined /> Peak SAT 110</Tag>
            </div>

            {/* Velocity Strip BarChart substitute */}
            <div className="velocity-strip" style={{ display: 'flex', gap: 10, marginTop: 18, overflowX: 'auto', paddingBottom: 6 }}>
              {trendData.map((d) => {
                const isPeak = d.volume === maxVol;
                const isLow = d.volume === 38;
                const heightPct = Math.round((d.volume / maxVol) * 100);
                return (
                  <div
                    key={d.date}
                    style={{
                      flex: 1,
                      minWidth: 50,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 800, color: isPeak ? '#242424' : '#737373' }}>{d.volume}</div>
                    <div
                      style={{
                        width: '100%',
                        height: 100,
                        background: '#fafafa',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: 3,
                        border: '1px solid #e5e5e5',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: `${heightPct}%`,
                          background: isPeak ? '#242424' : isLow ? '#d4d4d4' : '#737373',
                          borderRadius: 6,
                          transition: 'height 0.3s cubic-bezier(0.16,1,0.3,1)',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#242424', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {d.date}
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: isPeak ? '#242424' : isLow ? '#a3a3a3' : '#525252', display: 'inline-block' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={9}>
          <Card className="invert-card animate-fade-in-up" bordered={false} style={{ height: '100%', borderRadius: 14 }} bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#fff', fontSize: 14 }}>Trust Spectrum</span>
              <Tag style={{ margin: 0, background: '#fff', color: '#0e0e0e', borderColor: '#fff', fontWeight: 800, borderRadius: 999, fontSize: 10 }}><SafetyCertificateOutlined /> F1 94.8%</Tag>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: -6 }}>Extraction confidence — no pie, pure tiers</div>

            {/* Spectrum bar */}
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: 3, display: 'flex', gap: 3, height: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)' }}>
              <div style={{ width: '65%', background: '#ffffff', borderRadius: 4 }} title="High 65%" />
              <div style={{ width: '25%', background: 'rgba(255,255,255,0.55)', borderRadius: 4 }} title="Medium 25%" />
              <div style={{ width: '10%', background: 'rgba(255,255,255,0.22)', borderRadius: 4, border: '1px dashed rgba(255,255,255,0.4)' }} title="Low 10%" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {accuracyData.map((tier) => {
                const isHigh = tier.value === 65;
                const isMed = tier.value === 25;
                return (
                  <div
                    key={tier.name}
                    style={{
                      background: isHigh ? 'rgba(255,255,255,0.96)' : isMed ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isHigh ? '#fff' : isMed ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.18)'}`,
                      borderStyle: tier.value === 10 ? 'dashed' : 'solid',
                      borderRadius: 10,
                      padding: '10px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: isHigh ? '#0e0e0e' : '#fff',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: isHigh ? '#0e0e0e' : 'rgba(255,255,255,0.14)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 900,
                          fontSize: 11,
                          border: `1px solid ${isHigh ? '#0e0e0e' : 'rgba(255,255,255,0.18)'}`,
                        }}
                      >
                        {tier.value}%
                      </div>
                      <div>
                        <div style={{ fontWeight: 850, fontSize: 12, lineHeight: 1.2, color: isHigh ? '#0e0e0e' : '#fff' }}>{tier.name}</div>
                        <div style={{ fontSize: 11, color: isHigh ? '#737373' : 'rgba(255,255,255,0.6)', marginTop: 1 }}>{tier.count} docs • {tier.label === 'AUTO' ? 'Auto-approved' : tier.label === 'VERIFY' ? 'Guided inspect' : 'Routed to queue'}</div>
                      </div>
                    </div>
                    <Tag style={{ margin: 0, borderRadius: 999, background: isHigh ? '#0e0e0e' : tier.value === 10 ? '#fff' : 'transparent', color: isHigh ? '#fff' : tier.value === 10 ? '#0e0e0e' : '#fff', border: `1px solid ${isHigh ? '#0e0e0e' : tier.value === 10 ? '#fff' : 'rgba(255,255,255,0.25)'}`, fontWeight: 800, fontSize: 10, padding: '2px 8px' }}>{tier.label}</Tag>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
              <AuditOutlined style={{ color: '#fff' }} /> Threshold &lt; 80% auto-routes to Verification Queue • {accuracyData[2].count} flagged
            </div>
          </Card>
        </Col>
      </Row>

      {/* District Ledger - editorial substitute for BarChart */}
      <Card
        className="saffron-card animate-fade-in-up territory-card"
        bordered={false}
        bodyStyle={{ padding: 16 }}
      >
        <div style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: 12, marginBottom: 14 }}>
          <div className="territory-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 850, letterSpacing: '-0.02em', color: '#242424', fontSize: 14 }}>Territory Ledger</span>
              <Tag className="territory-badge" style={{ margin: 0, borderRadius: 999, background: '#fff', border: '1px solid #242424', color: '#242424', fontWeight: 800, fontSize: 10 }}>RANKED • VERIFIED</Tag>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <Tag style={{ margin: 0, borderRadius: 999, background: '#242424', color: '#fff', borderColor: '#242424', fontWeight: 800, fontSize: 10 }}><TrophyOutlined /> Agra #1</Tag>
              <span style={{ color: '#737373', fontSize: 11, fontWeight: 700 }}>5 districts • {totalProcessed + totalPending} total</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {districtData.map((d, idx) => {
            const total = d.processed + d.pending;
            const pct = Math.round((d.processed / total) * 100);
            const isLeader = idx === 0;
            return (
              <div
                key={d.name}
                className="animate-fade-in district-ledger-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1.1fr 1.2fr 110px',
                  gap: 14,
                  alignItems: 'center',
                  background: isLeader ? '#0e0e0e' : '#fff',
                  color: isLeader ? '#fff' : '#242424',
                  border: `1px solid ${isLeader ? '#0e0e0e' : '#e5e5e5'}`,
                  borderRadius: 12,
                  padding: '12px 14px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {isLeader && <div style={{ position: 'absolute', right: 12, top: -8, fontSize: 42, fontWeight: 900, letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.09)', lineHeight: 1, pointerEvents: 'none' }}>#1</div>}
                <div style={{ width: 36, height: 36, borderRadius: 9, background: isLeader ? '#fff' : '#242424', color: isLeader ? '#0e0e0e' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, border: `1px solid ${isLeader ? '#fff' : '#242424'}`, zIndex: 1 }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div style={{ minWidth: 0, zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: '-0.02em', color: isLeader ? '#fff' : '#242424' }}>{d.name}</span>
                    <Tag style={{ margin: 0, borderRadius: 999, background: isLeader ? 'rgba(255,255,255,0.12)' : '#fafafa', color: isLeader ? 'rgba(255,255,255,0.85)' : '#737373', border: `1px solid ${isLeader ? 'rgba(255,255,255,0.18)' : '#e5e5e5'}`, fontWeight: 700, fontSize: 10 }}>{d.state}</Tag>
                    {isLeader && <Tag style={{ margin: 0, borderRadius: 999, background: '#fff', color: '#0e0e0e', borderColor: '#fff', fontWeight: 850, fontSize: 10, display: 'inline-flex', alignItems: 'center', gap: 4 }}><FireOutlined /> LEADER</Tag>}
                  </div>
                  <div style={{ fontSize: 12, color: isLeader ? 'rgba(255,255,255,0.65)' : '#737373', marginTop: 2, display: 'flex', gap: 6, flexWrap: 'wrap' }}><span>{d.processed} verified</span><span>•</span><span>{d.pending} queued</span><span>•</span><span>{total} total</span></div>
                </div>
                <div style={{ minWidth: 120, zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 800, color: isLeader ? '#fff' : '#242424', letterSpacing: '0.02em' }}><span>{pct}% VERIFIED</span><span style={{ color: isLeader ? 'rgba(255,255,255,0.6)' : '#a3a3a3' }}>{d.pending} pending</span></div>
                  <Progress percent={pct} showInfo={false} strokeColor={isLeader ? '#fff' : '#242424'} trailColor={isLeader ? 'rgba(255,255,255,0.15)' : '#f0f0f0'} strokeWidth={7} size="small" style={{ marginTop: 6 }} />
                  <div style={{ fontSize: 10, color: isLeader ? 'rgba(255,255,255,0.5)' : '#a3a3a3', marginTop: 4, fontWeight: 600 }}>Throughput {pct >= 85 ? 'high' : pct >= 75 ? 'steady' : 'needs push'}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', zIndex: 1 }}>
                  <Tag style={{ margin: 0, borderRadius: 999, background: isLeader ? '#fff' : pct >= 84 ? '#242424' : '#fff', color: isLeader ? '#0e0e0e' : pct >= 84 ? '#fff' : '#242424', border: `1px solid ${isLeader ? '#fff' : '#242424'}`, fontWeight: 850, fontSize: 11, padding: '4px 10px', minWidth: 92, justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {pct >= 90 ? <><TrophyOutlined /> TOP FORM</> : pct >= 80 ? <><ExperimentOutlined /> STEADY</> : <><WarningOutlined /> PUSH</>}
                  </Tag>
                </div>
              </div>
            );
          })}
        </div>
        <Divider style={{ margin: '14px 0 12px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Tag style={{ margin: 0, borderRadius: 999, background: '#0e0e0e', color: '#fff', borderColor: '#0e0e0e', fontWeight: 800 }}><EyeOutlined /> Live ledger</Tag>
            <span style={{ fontSize: 12, color: '#737373' }}>Ranked by verified throughput • Prayagraj fastest weekly growth +22%</span>
          </div>
          <Space size={8}>
            <span style={{ fontSize: 11, color: '#737373', fontWeight: 700 }}>Overall verified {Math.round((totalProcessed / (totalProcessed + totalPending)) * 100)}%</span>
            <Progress percent={Math.round((totalProcessed / (totalProcessed + totalPending)) * 100)} showInfo={false} strokeColor="#242424" trailColor="#f0f0f0" size="small" style={{ width: 100 }} />
          </Space>
        </div>
      </Card>

      {/* Bottom eye-catchy stat strip - B/W editorial */}
      <div className="hero-bw grid-bw analytics-stats-strip" style={{ borderRadius: 12, padding: '12px 14px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, border: '1px solid #111' }}>
        {[
          { k: 'Avg. Handle Time', v: '2.4 min', sub: 'per record', icon: <ClockCircleOutlined /> },
          { k: 'Model F1 Score', v: '94.8%', sub: 'extraction', icon: <SafetyCertificateOutlined /> },
          { k: 'Human Override', v: '9.2%', sub: 'fields corrected', icon: <AuditOutlined /> },
          { k: 'LRMS Sync', v: '367', sub: 'pushed live', icon: <GlobalOutlined /> },
        ].map((s) => (
          <div key={s.k} style={{ background: '#fff', border: '1px solid #fff', borderRadius: 10, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
            <div><div style={{ fontSize: 10, fontWeight: 850, letterSpacing: '0.06em', color: '#737373' }}>{s.k.toUpperCase()}</div><div style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em', color: '#0e0e0e', marginTop: 4 }}>{s.v}</div><div style={{ fontSize: 11, color: '#737373' }}>{s.sub}</div></div>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#0e0e0e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, border: '1px solid #0e0e0e' }}>{s.icon}</div>
          </div>
        ))}
        <style>{`@media(max-width: 860px){ .hero-bw.grid-bw{ grid-template-columns: 1fr 1fr !important; } } @media(max-width: 520px){ .hero-bw.grid-bw{ grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </div>
  );
}
export default Analytics;
