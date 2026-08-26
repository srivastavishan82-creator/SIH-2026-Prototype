import { useState } from 'react';
import { Table, Tag, Button, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

function VerificationQueue() {
  const [data, setData] = useState([
    { key: '1', document: 'registry_2025.pdf', field: 'Plot Area', value: '2.45', confidence: 45, status: 'Low Confidence' },
    { key: '2', document: 'khasra_map_045.jpg', field: 'Khasra Number', value: '123/4A', confidence: 62, status: 'Low Confidence' },
    { key: '3', document: 'handwritten_register.pdf', field: 'Landowner Name', value: 'राजेश कुमार', confidence: 71, status: 'Needs Review' },
  ]);

  const verify = (record) => {
    setData(data.map(item => item.key === record.key ? { ...item, status: 'Verified' } : item));
    message.success('Record verified successfully');
  };

  const columns = [
    { title: 'Document', dataIndex: 'document', key: 'document' },
    { title: 'Field', dataIndex: 'field', key: 'field' },
    { title: 'Extracted Value', dataIndex: 'value', key: 'value' },
    { title: 'Confidence', dataIndex: 'confidence', key: 'confidence', render: (val) => (
      <Tag color={val < 60 ? 'red' : val < 80 ? 'orange' : 'green'}>{val}%</Tag>
    )},
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => (
      <Tag color={status === 'Verified' ? 'green' : 'orange'}>{status}</Tag>
    )},
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" size="small" icon={<CheckCircleOutlined />} onClick={() => verify(record)}>
          Verify
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} scroll={{ x: 800 }} size="middle" />
    </div>
  );
}

export default VerificationQueue;
