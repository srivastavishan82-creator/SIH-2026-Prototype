import { useState } from 'react';
import { Card, Form, Input, Select, Button, message, Tabs } from 'antd';
import { RobotOutlined } from '@ant-design/icons';

function AISettings() {
  const [loading, setLoading] = useState(false);
  const [openaiForm] = Form.useForm();
  const [googleForm] = Form.useForm();

  const saveOpenAI = async (values) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    message.success('OpenAI settings saved');
    setLoading(false);
  };

  const saveGoogle = async (values) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    message.success('Google AI Studio settings saved');
    setLoading(false);
  };

  const items = [
    {
      key: 'openai',
      label: 'OpenAI',
      children: (
        <Card>
          <Form form={openaiForm} layout="vertical" onFinish={saveOpenAI}>
            <Form.Item label="API Key" name="apiKey" rules={[{ required: true, message: 'Please enter API key' }]}>
              <Input.Password placeholder="sk-..." />
            </Form.Item>
            <Form.Item label="Model" name="model" initialValue="gpt-4o-mini">
              <Select
                options={[
                  { value: 'gpt-4o-mini', label: 'gpt-4o-mini' },
                  { value: 'gpt-4o', label: 'gpt-4o' },
                  { value: 'o1-mini', label: 'o1-mini' },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} icon={<RobotOutlined />}>
                Save OpenAI Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: 'google',
      label: 'Google AI Studio',
      children: (
        <Card>
          <Form form={googleForm} layout="vertical" onFinish={saveGoogle}>
            <Form.Item label="API Key" name="apiKey" rules={[{ required: true, message: 'Please enter API key' }]}>
              <Input.Password placeholder="AI..." />
            </Form.Item>
            <Form.Item label="Model" name="model" initialValue="gemini-1.5-flash">
              <Select
                options={[
                  { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
                  { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} icon={<RobotOutlined />}>
                Save Google AI Settings
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>AI Settings</h2>
      <Card>
        <p style={{ marginBottom: 16 }}>
          Configure LLM providers for structured extraction, validation, and post-processing.
        </p>
        <Tabs items={items} />
      </Card>
    </div>
  );
}

export default AISettings;
