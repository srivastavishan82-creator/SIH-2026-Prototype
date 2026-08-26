import { useState } from 'react';
import { Card, Row, Col, Progress, Table, Tag } from 'antd';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

function Dashboard() {
  const [stats] = useState({
    total: 0,
    processed: 0,
    pending: 0,
    accuracy: 0,
  });

  const recentDocuments = [
    { key: '1', name: 'land_record_001.pdf', status: 'Completed', confidence: 92, date: '2026-08-26' },
    { key: '2', name: 'khasra_map_045.jpg', status: 'Processing', confidence: 0, date: '2026-08-26' },
    { key: '3', name: 'registry_2025.pdf', status: 'Pending Review', confidence: 78, date: '2026-08-25' },
    { key: '4', name: 'handwritten_register.pdf', status: 'Completed', confidence: 85, date: '2026-08-25' },
  ];

  const columns = [
    { title: 'Document', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => {
      const color = status === 'Completed' ? 'green' : status === 'Processing' ? 'blue' : 'orange';
      return <Tag color={color}>{status}</Tag>;
    }},
    { title: 'Confidence', dataIndex: 'confidence', key: 'confidence', render: (val) => val ? `${val}%` : '-' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <span className="stat-icon blue"><FileTextOutlined /></span>
            <div className="stat-meta">
              <div className="stat-title">Total Documents</div>
              <div className="stat-value">{stats.total}</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <span className="stat-icon green"><CheckCircleOutlined /></span>
            <div className="stat-meta">
              <div className="stat-title">Processed</div>
              <div className="stat-value">{stats.processed}</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <span className="stat-icon orange"><ClockCircleOutlined /></span>
            <div className="stat-meta">
              <div className="stat-title">Pending</div>
              <div className="stat-value">{stats.pending}</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card">
            <span className="stat-icon purple"><ExclamationCircleOutlined /></span>
            <div className="stat-meta">
              <div className="stat-title">Accuracy</div>
              <div className="stat-value">{stats.accuracy}%</div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Processing Progress">
            <Progress percent={stats.processed} status="active" />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Confidence Distribution">
            <Progress type="dashboard" percent={stats.accuracy} />
          </Card>
        </Col>
      </Row>
      <Card title="Recent Documents" style={{ marginTop: 24 }} styles={{ body: { padding: '0 8px 8px' } }}>
        <Table dataSource={recentDocuments} columns={columns} pagination={false} scroll={{ x: 600 }} size="middle" />
      </Card>
    </div>
  );
}

export default Dashboard;
