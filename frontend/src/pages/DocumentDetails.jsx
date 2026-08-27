import { useState } from 'react';
import { Table, Tag, Input, Button, Space, message, Typography, Card, Divider, Progress } from 'antd';
import { SaveOutlined, ExportOutlined, CheckCircleOutlined, LeftOutlined, ZoomInOutlined, ZoomOutOutlined, FileTextOutlined, WarningOutlined, AimOutlined, SyncOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;

function DocumentDetails() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('4'); // Default highlight field needing review
  const [zoom, setZoom] = useState(100);

  const [data, setData] = useState([
    { key: '1', field: 'Landowner Name', value: 'राजेश कुमार शर्मा', confidence: 92, verified: true, category: 'Land Ownership' },
    { key: '2', field: 'Father Name', value: 'राम कुमार शर्मा', confidence: 88, verified: true, category: 'Land Ownership' },
    { key: '3', field: 'Survey Number', value: '45/2B', confidence: 95, verified: true, category: 'Plot Identifier' },
    { key: '4', field: 'Khasra Number', value: '123/4A', confidence: 78, verified: false, category: 'Plot Identifier' },
    { key: '5', field: 'Plot Area', value: '2.45 hectares', confidence: 82, verified: true, category: 'Measurement' },
    { key: '6', field: 'Village', value: 'रामपुर', confidence: 90, verified: true, category: 'Jurisdiction' },
    { key: '7', field: 'Tehsil', value: 'सदर', confidence: 55, verified: false, category: 'Jurisdiction' },
  ]);

  const updateValue = (key, newValue) => {
    setData(data.map(i => i.key === key ? { ...i, value: newValue, verified: true } : i));
    message.success('Field updated and verified');
  };

  const markVerified = (key) => {
    setData(data.map(i => i.key === key ? { ...i, verified: true } : i));
    message.success('Field marked verified');
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 80));

  const columns = [
    {
      title: 'Field Name',
      dataIndex: 'field',
      key: 'field',
      width: 150,
      render: (t, record) => (
        <span style={{ fontWeight: record.key === activeKey ? 800 : 650, color: '#242424', fontSize: 13 }}>
          {t}
        </span>
      )
    },
    {
      title: 'Extracted Value',
      dataIndex: 'value',
      key: 'value',
      render: (val, record) => (
        <Input
          value={val}
          onChange={(e) => {
            const newVal = e.target.value;
            setData(data.map(i => i.key === record.key ? { ...i, value: newVal } : i));
          }}
          onPressEnter={(e) => updateValue(record.key, e.target.value)}
          suffix={record.verified ? <CheckCircleOutlined style={{ color: '#242424', fontSize: 14 }} /> : <WarningOutlined style={{ color: '#a3a3a3', fontSize: 14 }} />}
          style={{
            background: record.key === activeKey ? '#fafafa' : '#fff',
            borderRadius: 8,
            fontWeight: 500,
            borderColor: record.key === activeKey ? '#242424' : (record.verified ? '#e5e5e5' : '#242424'),
            boxShadow: record.key === activeKey ? '0 0 0 2px rgba(36,36,36,0.08)' : 'none'
          }}
        />
      )
    },
    {
      title: 'Conf.',
      dataIndex: 'confidence',
      key: 'confidence',
      width: 85,
      align: 'center',
      render: (val) => {
        const isLow = val < 80;
        return (
          <Tag style={{
            margin: 0,
            borderRadius: 999,
            background: isLow ? '#fff' : '#242424',
            color: isLow ? '#242424' : '#fff',
            border: `1px solid ${isLow ? '#242424' : '#242424'}`,
            fontWeight: 800,
            minWidth: 48,
            height: 24,
            display: 'inline-flex',
            alignItems: 'center',
            justify: 'center'
          }}>
            {val}%
          </Tag>
        );
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 95,
      align: 'center',
      render: (_, record) => (
        <Button
          type={record.verified ? 'default' : 'primary'}
          size="small"
          disabled={record.verified}
          onClick={() => markVerified(record.key)}
          style={{ borderRadius: 8, fontWeight: 700, fontSize: 11, minWidth: 70, height: 28, padding: '0 8px' }}
        >
          {record.verified ? 'Verified' : 'Verify'}
        </Button>
      )
    },
  ];

  const overallConfidence = Math.round(data.reduce((a, c) => a + c.confidence, 0) / data.length);
  const verifiedCount = data.filter(d => d.verified).length;
  const activeRecord = data.find(d => d.key === activeKey) || data[0];

  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Top Header Bar — Aligned toolbar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center', background: '#fff', border: '1px solid #e5e5e5', borderRadius: 12, padding: '10px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
          <Button
            icon={<LeftOutlined style={{ fontSize: 12 }} />}
            onClick={() => navigate('/verification')}
            style={{ color: '#242424', fontWeight: 700, borderRadius: 8, background: '#fff', border: '1px solid #e5e5e5', height: 34, flexShrink: 0, display: 'inline-flex', alignItems: 'center' }}
          >
            Queue
          </Button>
          <div style={{ width: 1, height: 22, background: '#e5e5e5', flexShrink: 0 }} />
          <div style={{ width: 34, height: 34, borderRadius: 8, background: '#242424', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', border: '1px solid #242424', flexShrink: 0 }}>
            <FileTextOutlined style={{ fontSize: 16 }} />
          </div>
          <div style={{ minWidth: 0, lineHeight: 1.25 }}>
            <div style={{ fontWeight: 850, color: '#242424', letterSpacing: '-0.02em', fontSize: 13.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Khatauni • Land Record — khatauni_agra_2025.pdf
            </div>
            <div style={{ fontSize: 11, color: '#737373', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Agra District</span> • <span>7 Fields Extracted</span> • <Tag style={{ margin: 0, padding: '0 6px', fontSize: 10, background: '#242424', color: '#fff', border: 'none', height: 18, lineHeight: '18px' }}>SHA-256 VERIFIED</Tag>
            </div>
          </div>
        </div>
        <Space wrap size={8} style={{ justifyContent: 'flex-end' }}>
          <Button icon={<ExportOutlined />} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, fontWeight: 600, height: 34, color: '#242424' }}>
            Export GeoJSON
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            style={{ borderRadius: 8, fontWeight: 750, height: 34 }}
            onClick={() => message.success('Record approved and synchronized to LRMS database')}
          >
            Approve Record
          </Button>
        </Space>
      </div>

      {/* Main Split Layout — Aligned Panes */}
      <div className="verification-split">
        {/* Document Pane — Digitized Khatauni Land Record Preview */}
        <div className="verification-doc-pane animate-scale-in">
          {/* Top Floating Controls */}
          <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 8 }}>
            <Tag style={{ borderRadius: 999, background: '#242424', border: '1px solid #242424', color: '#fff', fontWeight: 750, padding: '3px 10px', height: 26, display: 'inline-flex', alignItems: 'center' }}>
              OCR Layout • 94.2%
            </Tag>
            <Tag style={{ borderRadius: 999, background: '#fff', color: '#242424', border: '1px solid #e5e5e5', fontWeight: 700, padding: '3px 10px', height: 26, display: 'inline-flex', alignItems: 'center' }}>
              Page 1 / 1
            </Tag>
          </div>
          <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 10 }}>
            <Space size={6}>
              <Button icon={<ZoomInOutlined />} onClick={handleZoomIn} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, height: 32, width: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} />
              <Button icon={<ZoomOutOutlined />} onClick={handleZoomOut} style={{ background: '#fff', border: '1px solid #e5e5e5', borderRadius: 8, height: 32, width: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} />
            </Space>
          </div>

          {/* Authentic Styled Khatauni Land Record Document */}
          <div className="khatauni-paper-container" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}>
            {/* Header of Khatauni Record */}
            <div className="khatauni-paper-header">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #242424', paddingBottom: 10, marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#242424', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, flexShrink: 0 }}>
                    🏛
                  </div>
                  <div>
                    <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.08em', color: '#737373', textTransform: 'uppercase' }}>
                      GOVERNMENT OF UTTAR PRADESH • REVENUE DEPARTMENT
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 900, color: '#242424', letterSpacing: '-0.02em' }}>
                      Khatauni • Land Record (उद्धरण खतौनी)
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <Tag style={{ margin: 0, background: '#242424', color: '#fff', fontWeight: 800, borderRadius: 6, fontSize: 10 }}>FASLI YEAR 1431</Tag>
                  <div style={{ fontSize: 10, color: '#737373', marginTop: 3, fontWeight: 600 }}>Hash: e8f9...3b2a</div>
                </div>
              </div>

              {/* Metadata Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 8, padding: '8px 10px', marginBottom: 12, fontSize: 11 }}>
                <div><span style={{ color: '#737373', fontWeight: 600 }}>District:</span> <strong style={{ color: '#242424' }}>Agra (आगरा)</strong></div>
                <div><span style={{ color: '#737373', fontWeight: 600 }}>Tehsil:</span> <strong style={{ color: '#242424' }}>Sadar (सदर)</strong></div>
                <div><span style={{ color: '#737373', fontWeight: 600 }}>Village:</span> <strong style={{ color: '#242424' }}>Rampur (रामपुर)</strong></div>
                <div><span style={{ color: '#737373', fontWeight: 600 }}>Khata No:</span> <strong style={{ color: '#242424' }}>00142</strong></div>
              </div>
            </div>

            {/* Document Data Table with Bounding Overlays */}
            <div className="khatauni-paper-table-wrap">
              <table className="khatauni-paper-table">
                <thead>
                  <tr>
                    <th style={{ width: '30%' }}>Field Name</th>
                    <th style={{ width: '50%' }}>Extracted Value (OCR)</th>
                    <th style={{ width: '20%', textAlign: 'center' }}>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => {
                    const isActive = activeKey === item.key;
                    const isLow = item.confidence < 80;
                    return (
                      <tr
                        key={item.key}
                        onClick={() => setActiveKey(item.key)}
                        className={`khatauni-row ${isActive ? 'active-row' : ''} ${isLow ? 'warning-row' : ''}`}
                        style={{ cursor: 'pointer' }}
                      >
                        <td style={{ fontWeight: 700, color: '#242424', fontSize: 12 }}>
                          {item.field}
                        </td>
                        <td>
                          <span className={`ocr-box-highlight ${isActive ? 'active-box' : ''} ${isLow ? 'warning-box' : ''}`}>
                            {item.value}
                            {isLow && <WarningOutlined style={{ marginLeft: 6, color: '#242424', fontSize: 11 }} />}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <Tag style={{
                            margin: 0,
                            borderRadius: 999,
                            background: isLow ? '#fff' : '#242424',
                            color: isLow ? '#242424' : '#fff',
                            borderColor: '#242424',
                            fontWeight: 800,
                            fontSize: 10,
                            minWidth: 44
                          }}>
                            {item.confidence}%
                          </Tag>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Active Field Focus Banner */}
            <div style={{ marginTop: 12, background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
              <span style={{ color: '#737373', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <AimOutlined style={{ color: '#242424', fontSize: 13 }} />
                Focused Field: <strong style={{ color: '#242424' }}>{activeRecord.field}</strong>
              </span>
              <Tag style={{ margin: 0, background: activeRecord.verified ? '#242424' : '#fff', color: activeRecord.verified ? '#fff' : '#242424', border: '1px solid #242424', fontWeight: 750, fontSize: 10 }}>
                {activeRecord.verified ? 'Verified' : 'Needs Review'}
              </Tag>
            </div>

            {/* Document Footer Status */}
            <div className="khatauni-paper-footer">
              <span>300 DPI • Deskewed • Denoised</span>
              <span style={{ color: '#242424', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <CheckCircleOutlined style={{ fontSize: 12 }} /> {verifiedCount} verified • {data.length - verifiedCount} fields need attention
              </span>
            </div>
          </div>
        </div>

        {/* Form Pane — Aligned Extracted Fields & Controls */}
        <div className="verification-form-pane animate-scale-in">
          <Card bordered={false} className="saffron-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }} bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 16, gap: 0 }}>
            {/* Stats Summary row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignItems: 'stretch' }}>
              <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: 136 }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', color: '#737373', lineHeight: 1 }}>AI CONFIDENCE</div>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Progress type="dashboard" percent={overallConfidence} size={68} strokeColor="#242424" trailColor="#e5e5e5" strokeWidth={7} format={(p) => <span style={{ fontWeight: 900, color: '#242424', fontSize: 14 }}>{p}%</span>} />
                </div>
                <div style={{ fontSize: 11, color: '#737373', marginTop: 6, fontWeight: 600, lineHeight: 1 }}>{overallConfidence >= 85 ? 'High trust' : 'Review recommended'}</div>
              </div>
              <div style={{ background: '#242424', border: '1px solid #242424', borderRadius: 10, padding: '14px 12px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: 136 }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.06em', color: '#a3a3a3', lineHeight: 1 }}>VERIFICATION</div>
                <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.03em', marginTop: 8, lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'flex-start' }}>
                  <span style={{ color: '#fff' }}>{verifiedCount}</span>
                  <span style={{ color: '#737373', fontSize: 14, fontWeight: 700 }}> / {data.length}</span>
                </div>
                <Progress percent={Math.round((verifiedCount / data.length) * 100)} showInfo={false} strokeColor="#fff" trailColor="rgba(255,255,255,0.18)" strokeWidth={6} size="small" style={{ marginTop: 12 }} />
                <div style={{ fontSize: 11, color: '#d4d4d4', marginTop: 8, fontWeight: 500, lineHeight: 1 }}>{data.length - verifiedCount} fields remaining</div>
              </div>
            </div>

            <Divider style={{ margin: '14px 0' }} className="divider-subtle" />

            {/* Extracted Fields Table Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8, minHeight: 24 }}>
              <span style={{ fontWeight: 800, color: '#242424', fontSize: 11, letterSpacing: '0.06em' }}>EXTRACTED FIELDS</span>
              <Tag style={{ borderRadius: 999, background: '#fff', border: '1px solid #242424', color: '#242424', fontWeight: 750, margin: 0, height: 24, display: 'inline-flex', alignItems: 'center' }}>
                {data.length - verifiedCount} need review
              </Tag>
            </div>

            {/* Extracted Fields Table */}
            <div style={{ flex: 1, minHeight: 0 }}>
              <Table
                className="verified-table"
                dataSource={data}
                columns={columns}
                pagination={false}
                size="small"
                style={{ background: 'transparent' }}
                rowClassName={(r) => `${r.key === activeKey ? 'active-row-highlight' : ''} ${r.verified ? '' : 'needs-review-row'}`}
                tableLayout="fixed"
                onRow={(record) => ({
                  onClick: () => setActiveKey(record.key),
                })}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 14, borderTop: '1px solid #f5f5f5' }}>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                style={{ borderRadius: 8, fontWeight: 700, height: 34, flex: '1 1 auto', maxWidth: 220 }}
                onClick={() => message.success('Record approved and queued for LRMS sync')}
              >
                Approve & Sync to LRMS
              </Button>
              <Button
                icon={<SyncOutlined />}
                style={{ borderRadius: 8, background: '#fff', border: '1px solid #e5e5e5', fontWeight: 600, height: 34, color: '#242424', flex: '0 0 auto' }}
                onClick={() => message.info('Rescan requested for low-confidence fields')}
              >
                Request re-scan
              </Button>
            </div>
            <div style={{ fontSize: 11, color: '#a3a3a3', marginTop: 10, lineHeight: 1.5, textAlign: 'center' }}>
              All edits are audit-logged • Original document hash preserved • Press Enter to save field
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DocumentDetails;

