import { Card, Row, Col, Statistic } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

function Analytics() {
  const districtData = [
    { name: 'Agra', processed: 120 },
    { name: 'Lucknow', processed: 98 },
    { name: 'Varanasi', processed: 76 },
    { name: 'Kanpur', processed: 65 },
    { name: 'Prayagraj', processed: 54 },
  ];

  const accuracyData = [
    { name: 'High (>90%)', value: 65 },
    { name: 'Medium (70-90%)', value: 25 },
    { name: 'Low (<70%)', value: 10 },
  ];

  const COLORS = ['#52c41a', '#faad14', '#ff4d4f'];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Analytics Dashboard</h2>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Documents" value={413} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Verified Records" value={367} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Review" value={46} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
      </Row>
      <Card title="District-wise Processing" style={{ marginTop: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={districtData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="processed" fill="#1677ff" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Accuracy Distribution" style={{ marginTop: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={accuracyData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
              {accuracyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

export default Analytics;
