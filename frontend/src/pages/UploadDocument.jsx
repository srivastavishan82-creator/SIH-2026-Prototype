import { useState } from 'react';
import { Upload, message, Progress, Card, Row, Col } from 'antd';
import { CloudUploadOutlined, FilePdfOutlined, FileImageOutlined, FileAddOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const formats = [
  { icon: <FilePdfOutlined style={{ color: '#ff4d4f' }} />, label: 'PDF' },
  { icon: <FileImageOutlined style={{ color: '#1677ff' }} />, label: 'JPG / PNG' },
  { icon: <FileAddOutlined style={{ color: '#52c41a' }} />, label: 'Scanned Maps' },
];

function UploadDocument() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf,.jpg,.jpeg,.png',
    beforeUpload: () => true,
    onChange(info) {
      if (info.file.status === 'uploading') {
        setUploading(true);
        setProgress(66);
      }
      if (info.file.status === 'done') {
        setProgress(100);
        message.success(`${info.file.name} uploaded successfully`);
        setUploading(false);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} upload failed.`);
        setUploading(false);
      }
    },
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={18}>
          <Dragger {...uploadProps} className="upload-dragger" style={{ background: 'rgba(22,119,255,0.02)' }}>
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined />
            </p>
            <p className="ant-upload-text" style={{ fontWeight: 600 }}>Tap to upload or drag file here</p>
            <p className="ant-upload-hint">Scanned documents, cadastral maps & registers in multiple Indian languages</p>
          </Dragger>
          {uploading && (
            <div style={{ marginTop: 16 }}>
              <Progress percent={progress} status="active" />
            </div>
          )}
        </Col>
        <Col xs={24} md={6}>
          <Card size="small" title="Supported Formats">
            {formats.map((f) => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 14 }}>
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default UploadDocument;
