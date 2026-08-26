import { Card, Row, Col, Grid } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileTextOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

function Analytics() {
  const screens = useBreakpoint();

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

  const isMobile = !screens.md;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card">
            <span className="stat-icon blue"><FileTextOutlined /></span>
            <div className="stat-meta">
              <div className="stat-title">Total Documents</div>
              <div className="stat-value">413</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card">
            <span className="stat-icon green"><CheckCircleOutlined /></span>
            <div className="stat-meta">
              <div className="stat-title">Verified Records</div>
              <div className="stat-value">367</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card className="stat-card">
            <span className="stat-icon orange"><ClockCircleOutlined /></span>
            <div className="stat-meta">
              <div className="stat-title">Pending Review</div>
              <div className="stat-value">46</div>
            </div>
          </Card>
        </Col>
      </Row>
      <Card title="District-wise Processing" style={{ marginTop: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={districtData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={isMobile ? -35 : 0} textAnchor={isMobile ? 'end' : 'middle'} height={isMobile ? 70 : 30} tick={{ fontSize: isMobile ? 11 : 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="processed" fill="#1677ff" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Accuracy Distribution" style={{ marginTop: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={accuracyData} cx="50%" cy="50%" labelLine={isMobile} label={isMobile ? ({ percent }) => `${(percent * 100).toFixed(0)}%` : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={isMobile ? 60 : 80} dataKey="value">
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
