import { useState } from 'react';
import { Upload, Button, message, Progress, Card } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

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
      <h2 style={{ marginBottom: 24 }}>Upload Land Record</h2>
      <Card>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag scanned image / PDF here</p>
          <p className="ant-upload-hint">Supports scanned images, PDFs, cadastral maps. Multiple Indian languages.</p>
        </Dragger>
        {uploading && (
          <div style={{ marginTop: 16 }}>
            <Progress percent={progress} status="active" />
          </div>
        )}
      </Card>
    </div>
  );
}

export default UploadDocument;
