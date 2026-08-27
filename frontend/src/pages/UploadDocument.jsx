import { useState } from 'react';
import { Upload, Button, message, Progress, Card, Typography, Select, Form, Space, Steps, Tag, Divider, Alert } from 'antd';
import { InboxOutlined, FileImageOutlined, FilePdfOutlined, CheckCircleOutlined, LoadingOutlined, ThunderboltOutlined, GlobalOutlined, ClockCircleOutlined, CloudUploadOutlined, AimOutlined, ExperimentOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const { Title, Text } = Typography;
function UploadDocument() {
  const [uploading, setUploading] = useState(false); const [progress, setProgress] = useState(0); const [currentStep, setCurrentStep] = useState(0);
  const simulateProcessing = () => {
    setUploading(true); setProgress(0); setCurrentStep(0);
    setTimeout(() => { setProgress(28); setCurrentStep(1); }, 900);
    setTimeout(() => { setProgress(58); setCurrentStep(2); }, 2200);
    setTimeout(() => { setProgress(86); setCurrentStep(3); }, 3800);
    setTimeout(() => { setProgress(100); setCurrentStep(4); message.success('Document ingested and queued for AI extraction'); setTimeout(() => setUploading(false), 1800); }, 5200);
  };
  const uploadProps = { name: 'file', multiple: false, accept: '.pdf,.jpg,.jpeg,.png', showUploadList: false, customRequest: () => simulateProcessing(), beforeUpload: (file) => { const isLt10M = file.size / 1024 / 1024 < 10; if (!isLt10M) message.error('File must be smaller than 10MB'); return isLt10M || Upload.LIST_IGNORE; } };
  const steps = [{ title: 'Upload & Scan', description: 'Checksum & virus scan' }, { title: 'OCR Engine', description: 'Layout + handwriting' }, { title: 'NLP Extraction', description: 'Fields, entities' }, { title: 'Confidence Gate', description: 'Auto-route if < 80%' }];
  return (
    <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="hero-bw grain grid-bw" style={{ borderRadius: 12, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.55)', fontWeight: 700 }}>— INTAKE • INGEST • OCR —</div>
          <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1, marginTop: 4, color: '#fff' }}>Document Intake <span className="outline-text" style={{ fontWeight: 900 }}>— drop & go</span></div>
          <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 12, marginTop: 6 }}>Upload land records & cadastral maps • 300 DPI • 10MB max</div>
        </div>
        <Space wrap><Tag style={{ borderRadius: 999, padding: '5px 10px', background: '#fff', color: '#0e0e0e', border: '1px solid #fff', fontWeight: 800 }}>Gov-grade encryption</Tag><Tag style={{ borderRadius: 999, padding: '5px 10px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.28)', fontWeight: 700 }}>Avg 6.2s / doc</Tag></Space>
      </div>
      <div className="upload-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr', gap: 16, alignItems: 'stretch' }}>
        <Card bordered={false} className="saffron-card animate-scale-in" bodyStyle={{ padding: 18, display: 'flex', flexDirection: 'column', height: '100%' }} style={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontWeight: 850, color: '#242424', letterSpacing: '-0.02em', fontSize: 15 }}>Intake Configuration & Upload</div>
              <div style={{ fontSize: 12, color: '#737373' }}>Choose document & language for optimal AI extraction accuracy</div>
            </div>
            <Tag style={{ background: '#fff', border: '1px solid #242424', color: '#242424', borderRadius: 999, fontWeight: 700 }}>
              <GlobalOutlined /> Multilingual • 6 scripts
            </Tag>
          </div>

          <Form layout="vertical" style={{ marginBottom: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Form.Item label={<Text strong style={{ color: '#242424', fontSize: 11, letterSpacing: '0.06em' }}>DOCUMENT TYPE</Text>} style={{ marginBottom: 12 }}>
                <Select defaultValue="register" size="large">
                  <Select.Option value="register">Handwritten Register (Khatauni)</Select.Option>
                  <Select.Option value="map">Cadastral Map (Bhu-Naksha)</Select.Option>
                  <Select.Option value="registry">Sale Deed / Registry (PDF)</Select.Option>
                  <Select.Option value="mutation">Mutation Record (Dakhil Kharij)</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label={<Text strong style={{ color: '#242424', fontSize: 11, letterSpacing: '0.06em' }}>PRIMARY SCRIPT</Text>} style={{ marginBottom: 12 }}>
                <Select defaultValue="hi" size="large">
                  <Select.Option value="hi">Hindi — Devanagari</Select.Option>
                  <Select.Option value="en">English — Latin</Select.Option>
                  <Select.Option value="mr">Marathi</Select.Option>
                  <Select.Option value="ta">Tamil</Select.Option>
                  <Select.Option value="te">Telugu</Select.Option>
                  <Select.Option value="bn">Bengali</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Form>

          <Dragger {...uploadProps} disabled={uploading} style={{ padding: 20 }}>
            <p className="ant-upload-drag-icon" style={{ marginBottom: 12 }}>
              <span style={{ width: 60, height: 60, borderRadius: '50%', background: '#fafafa', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#242424', fontSize: 28, border: '1.5px solid #242424', boxShadow: '0 4px 12px rgba(36,36,36,0.06)' }}>
                <CloudUploadOutlined style={{ fontSize: 30, color: '#242424' }} />
              </span>
            </p>
            <p className="ant-upload-text" style={{ fontSize: 15, fontWeight: 800, color: '#242424', marginBottom: 4 }}>Drop land record here, or <span style={{ color: '#242424', textDecoration: 'underline' }}>browse</span></p>
            <p className="ant-upload-hint" style={{ color: '#737373', fontSize: 13 }}>High-res PDF, scanned JPG or PNG • Max 10MB • 300 DPI recommended</p>
            <Space style={{ marginTop: 12 }} wrap>
              <Tag style={{ borderRadius: 8, padding: '3px 10px', background: '#242424', border: '1px solid #242424', color: '#fff', fontWeight: 700 }}><FilePdfOutlined /> PDF</Tag>
              <Tag style={{ borderRadius: 8, padding: '3px 10px', background: '#fff', border: '1px solid #242424', color: '#242424', fontWeight: 700 }}><FileImageOutlined /> JPG / PNG</Tag>
              <Tag style={{ borderRadius: 8, padding: '3px 10px', background: '#fafafa', border: '1px solid #e5e5e5', color: '#525252', fontWeight: 700 }}><ClockCircleOutlined /> Bulk: 50/batch</Tag>
            </Space>
          </Dragger>

          <Alert type="info" showIcon message={<span style={{ fontWeight: 700, color: '#242424' }}>Quality tip for best extraction</span>} description={<span style={{ color: '#525252', fontSize: 12 }}>Ensure scans are flat, well-lit and deskewed. Handwriting confidence improves 12–18% at ≥300 DPI.</span>} style={{ marginTop: 14, borderRadius: 10, background: '#fafafa', border: '1px solid #e5e5e5' }} />

          {/* Quick Demo Templates */}
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #f5f5f5', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 800, color: '#242424', fontSize: 11, letterSpacing: '0.06em' }}>QUICK DEMO TEMPLATES</span>
              <Tag style={{ margin: 0, background: '#242424', color: '#fff', border: '1px solid #242424', fontSize: 10, fontWeight: 750 }}>1-CLICK INGEST</Tag>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                { name: 'khatauni_sample.pdf', type: 'Khatauni', district: 'Agra • 2.4 MB', icon: <FilePdfOutlined /> },
                { name: 'bhu_naksha_045.jpg', type: 'Cadastral Map', district: 'Lucknow • 4.1 MB', icon: <FileImageOutlined /> },
                { name: 'sale_deed_2025.pdf', type: 'Sale Deed', district: 'Varanasi • 1.8 MB', icon: <FilePdfOutlined /> },
              ].map((sample) => (
                <div
                  key={sample.name}
                  onClick={() => simulateProcessing()}
                  style={{
                    background: '#fafafa',
                    border: '1px solid #e5e5e5',
                    borderRadius: 9,
                    padding: '8px 10px',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.background = '#ffffff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.background = '#fafafa'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 800, color: '#242424', fontSize: 11.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 100 }}>{sample.name}</span>
                    <span style={{ color: '#242424', fontSize: 11 }}>{sample.icon}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#737373', marginTop: 1 }}>
                    <span>{sample.type}</span>
                    <span>{sample.district}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Pre-Processing Capabilities Panel — Unique Modern Design */}
          <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #f5f5f5', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 850, color: '#242424', fontSize: 11.5, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6 }}>
                <ThunderboltOutlined style={{ color: '#242424' }} /> AUTOMATED PRE-PROCESSING ENGINES
              </span>
              <Tag style={{ margin: 0, background: '#242424', color: '#fff', border: '1px solid #242424', fontSize: 9.5, fontWeight: 800, borderRadius: 999, padding: '1px 8px' }}>
                4 MODULES ACTIVE
              </Tag>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {/* Module 1 */}
              <div style={{ background: '#242424', color: '#fff', border: '1px solid #242424', borderRadius: 10, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '-0.01em', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AimOutlined style={{ color: '#fff', fontSize: 13 }} /> Auto-Deskew
                  </span>
                  <Tag style={{ margin: 0, padding: '0 5px', fontSize: 9, background: '#fff', color: '#242424', border: 'none', fontWeight: 850 }}>±25°</Tag>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 4, lineHeight: 1.3 }}>
                  Rotational scan alignment & border crop
                </div>
              </div>

              {/* Module 2 */}
              <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '-0.01em', color: '#242424', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ExperimentOutlined style={{ color: '#242424', fontSize: 13 }} /> Adaptive Contrast
                  </span>
                  <Tag style={{ margin: 0, padding: '0 5px', fontSize: 9, background: '#242424', color: '#fff', border: 'none', fontWeight: 850 }}>AUTO</Tag>
                </div>
                <div style={{ color: '#737373', fontSize: 10, marginTop: 4, lineHeight: 1.3 }}>
                  Faded Devanagari manuscript ink restoration
                </div>
              </div>

              {/* Module 3 */}
              <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 10, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '-0.01em', color: '#242424', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <SafetyCertificateOutlined style={{ color: '#242424', fontSize: 13 }} /> Denoise Filter
                  </span>
                  <Tag style={{ margin: 0, padding: '0 5px', fontSize: 9, background: '#fff', border: '1px solid #242424', color: '#242424', fontWeight: 800 }}>300 DPI</Tag>
                </div>
                <div style={{ color: '#737373', fontSize: 10, marginTop: 4, lineHeight: 1.3 }}>
                  Background speckle & shadow removal
                </div>
              </div>

              {/* Module 4 */}
              <div style={{ background: '#242424', color: '#fff', border: '1px solid #242424', borderRadius: 10, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '-0.01em', color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircleOutlined style={{ color: '#fff', fontSize: 13 }} /> Grid Segmenter
                  </span>
                  <Tag style={{ margin: 0, padding: '0 5px', fontSize: 9, background: '#fff', color: '#242424', border: 'none', fontWeight: 850 }}>TOKEN</Tag>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, marginTop: 4, lineHeight: 1.3 }}>
                  Khatauni row & cadastral plot boundary parse
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
          <Card bordered={false} className="saffron-card animate-scale-in" bodyStyle={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 850, color: '#242424', letterSpacing: '-0.02em', marginBottom: 4 }}>Processing Pipeline</div>
            <div style={{ fontSize: 12, color: '#737373', marginBottom: 14 }}>Live trace of OCR → NLP → validation</div>
            {!uploading ? (
              <div style={{ background: '#fafafa', border: '1px dashed #d4d4d4', borderRadius: 12, padding: 24, textAlign: 'center', color: '#737373', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fff', border: '1px solid #e5e5e5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <ThunderboltOutlined style={{ color: '#242424', fontSize: 20 }} />
                </div>
                <div style={{ fontWeight: 800, color: '#242424', fontSize: 14 }}>Awaiting upload</div>
                <div style={{ fontSize: 12, marginTop: 4, maxWidth: 260 }}>Drop a land record file or select a demo template above to trace real-time OCR execution.</div>
              </div>
            ) : (
              <>
                <Progress percent={progress} status="active" strokeColor="#242424" trailColor="#f5f5f5" strokeWidth={8} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#737373', marginTop: 6 }}>
                  <span>Elapsed 00:{String(Math.floor(progress / 20)).padStart(2, '0')}</span>
                  <span style={{ fontWeight: 800, color: '#242424' }}>{progress}%</span>
                </div>
                <Divider style={{ margin: '14px 0' }} className="divider-subtle" />
                <Steps
                  direction="vertical"
                  current={currentStep}
                  size="small"
                  items={steps.map((s, idx) => ({
                    title: <span style={{ fontWeight: 700, color: idx === currentStep ? '#242424' : idx < currentStep ? '#242424' : '#737373', fontSize: 13 }}>{s.title}</span>,
                    description: <span style={{ fontSize: 12, color: '#737373' }}>{s.description}</span>,
                    icon: idx < currentStep ? <CheckCircleOutlined style={{ color: '#242424' }} /> : idx === currentStep ? <LoadingOutlined style={{ color: '#242424' }} /> : undefined
                  }))}
                />
              </>
            )}
          </Card>

          <Card bordered={false} className="saffron-card" bodyStyle={{ padding: 16 }}>
            <div style={{ fontWeight: 800, color: '#242424', fontSize: 13, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#242424' }} /> Compliance & Security Audit
            </div>
            <div style={{ display: 'grid', gap: 10, fontSize: 12, color: '#525252' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>• SHA-256 Hashed & Signed</span>
                <Tag style={{ margin: 0, background: '#242424', color: '#fff', borderColor: '#242424', fontWeight: 800 }}>ACTIVE</Tag>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>• Gov Retention Policy</span>
                <span style={{ fontWeight: 750, color: '#242424' }}>7 Years • R-2026</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>• Automatic PII Redaction</span>
                <Tag style={{ margin: 0, background: '#fff', border: '1px solid #242424', color: '#242424', fontWeight: 800 }}>ENABLED</Tag>
              </div>
            </div>
          </Card>

          {/* NEW CARD ON BOTTOM RIGHT SIDE */}
          <Card bordered={false} className="saffron-card animate-scale-in" bodyStyle={{ padding: 16 }}>
            <div style={{ fontWeight: 800, color: '#242424', fontSize: 13, marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ThunderboltOutlined style={{ color: '#242424' }} /> Engine Health & Live SLA
              </span>
              <Tag style={{ margin: 0, background: '#242424', color: '#fff', border: '1px solid #242424', fontSize: 10, fontWeight: 750 }}>
                ONLINE
              </Tag>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11 }}>
              <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ color: '#737373', fontSize: 10, fontWeight: 700 }}>MEDIAN LATENCY</div>
                <div style={{ fontWeight: 850, color: '#242424', fontSize: 14, marginTop: 2 }}>4.2s / page</div>
              </div>
              <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: 8, padding: '8px 10px' }}>
                <div style={{ color: '#737373', fontSize: 10, fontWeight: 700 }}>OCR PASS RATE</div>
                <div style={{ fontWeight: 850, color: '#242424', fontSize: 14, marginTop: 2 }}>94.8% F1</div>
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: '#737373', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid #f5f5f5' }}>
              <span>Neural Model v4.2 • Devanagari+Latin</span>
              <span style={{ fontWeight: 750, color: '#242424' }}>SLA 99.9%</span>
            </div>
          </Card>
        </div>
      </div>
      <style>{`@media(max-width:980px){ div[style*="grid-template-columns: 1.2fr 0.9fr"]{ grid-template-columns:1fr !important; } }`}</style>
    </div>
  );
}
export default UploadDocument;

