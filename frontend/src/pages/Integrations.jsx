import { useState } from 'react';
import { Card, Form, Input, Button, message, Tabs, Table } from 'antd';
import { ApiOutlined } from '@ant-design/icons';

function Integrations() {
  const [loading, setLoading] = useState(false);
  const [lrmsResponse, setLrmsResponse] = useState(null);
  const [gisData, setGisData] = useState([]);

  const lrmsColumns = [
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Records Synced', dataIndex: 'records_synced', key: 'records_synced' },
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp' },
  ];

  const gisColumns = [
    { title: 'Survey Number', dataIndex: 'survey_no', key: 'survey_no' },
    { title: 'Village', dataIndex: 'village', key: 'village' },
    { title: 'Area', dataIndex: 'area', key: 'area' },
    { title: 'Coordinates', dataIndex: 'coordinates', key: 'coordinates' },
  ];

  const syncLrms = async () => {
    setLoading(true);
    setLrmsResponse({ status: 'Success', records_synced: 245, timestamp: new Date().toISOString() });
    setLoading(false);
    message.success('LRMS sync completed');
  };

  const fetchGis = () => {
    setGisData([
      { key: '1', survey_no: '45/2B', village: 'Rampur', area: '2.45 hectares', coordinates: '26.8467, 80.9462' },
      { key: '2', survey_no: '46/1', village: 'Rampur', area: '1.8 hectares', coordinates: '26.8470, 80.9465' },
    ]);
    message.success('GIS data loaded');
  };

  const items = [
    {
      key: 'lrms',
      label: 'LRMS / DILRMP',
      children: (
        <div>
          <p style={{ marginBottom: 16 }}>Sync land record data with government systems.</p>
          <Button type="primary" icon={<ApiOutlined />} loading={loading} onClick={syncLrms}>
            Sync with LRMS
          </Button>
          {lrmsResponse && (
            <Table dataSource={[lrmsResponse]} columns={lrmsColumns} style={{ marginTop: 16 }} pagination={false} />
          )}
        </div>
      ),
    },
    {
      key: 'gis',
      label: 'GIS / Cadastral Maps',
      children: (
        <div>
          <p style={{ marginBottom: 16 }}>Fetch parcel data from GIS systems.</p>
          <Button type="primary" icon={<ApiOutlined />} onClick={fetchGis}>
            Load GIS Data
          </Button>
          {gisData.length > 0 && (
            <Table dataSource={gisData} columns={gisColumns} style={{ marginTop: 16 }} pagination={false} />
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>System Integrations</h2>
      <Card>
        <Tabs items={items} />
      </Card>
    </div>
  );
}

export default Integrations;
