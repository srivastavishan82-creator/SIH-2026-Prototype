import { useState } from 'react';
import { Table, Tag, Input, Button, Space, message } from 'antd';

function DocumentDetails() {
  const [data, setData] = useState([
    { key: '1', field: 'Landowner Name', value: 'राजेश कुमार शर्मा', confidence: 92, verified: true },
    { key: '2', field: 'Father Name', value: 'राम कुमार शर्मा', confidence: 88, verified: true },
    { key: '3', field: 'Survey Number', value: '45/2B', confidence: 95, verified: true },
    { key: '4', field: 'Khasra Number', value: '123/4A', confidence: 78, verified: false },
    { key: '5', field: 'Plot Area', value: '2.45 hectares', confidence: 82, verified: true },
    { key: '6', field: 'Village', value: 'रामपुर', confidence: 90, verified: true },
  ]);

  const updateValue = (key, newValue) => {
    setData(data.map(item => item.key === key ? { ...item, value: newValue } : item));
    message.success('Updated');
  };

  const columns = [
    { title: 'Field', dataIndex: 'field', key: 'field' },
    { title: 'Extracted Value', dataIndex: 'value', key: 'value', render: (val, record) => (
      <Input defaultValue={val} onPressEnter={(e) => updateValue(record.key, e.target.value)} />
    )},
    { title: 'Confidence', dataIndex: 'confidence', key: 'confidence', render: (val) => (
      <Tag color={val < 60 ? 'red' : val < 80 ? 'orange' : 'green'}>{val}%</Tag>
    )},
    { title: 'Verified', dataIndex: 'verified', key: 'verified', render: (verified) => (
      <Tag color={verified ? 'green' : 'red'}>{verified ? 'Yes' : 'No'}</Tag>
    )},
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Button type="primary">Save Changes</Button>
        <Button>Export JSON</Button>
      </Space>
      <Table dataSource={data} columns={columns} scroll={{ x: 700 }} size="middle" />
    </div>
  );
}

export default DocumentDetails;
