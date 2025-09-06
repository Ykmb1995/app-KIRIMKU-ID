import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Timeline, message } from 'antd';
import axios from 'axios';

const couriers = [
  { label: 'JNE', value: 'jne' },
  { label: 'J&T', value: 'jnt' },
  { label: 'SiCepat', value: 'sicepat' },
  { label: 'AnterAja', value: 'anteraja' },
  { label: 'Ninja', value: 'ninja' },
  { label: 'SAP', value: 'sap' },
];

const Tracking: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.get(`/shipping/tracking/${values.resi}`, { params: { courier: values.courier } });
      setResult(res.data);
    } catch (err) {
      message.error('Gagal tracking resi');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Tracking Pengiriman" style={{ maxWidth: 600 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="resi" label="No. Resi" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name="courier" label="Ekspedisi" rules={[{ required: true }]}>
          <Select options={couriers} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Tracking</Button>
        </Form.Item>
      </Form>
      {result && (
        <div style={{ marginTop: 24 }}>
          <b>Status:</b> {result.status}
          <Timeline style={{ marginTop: 16 }}>
            {(result.history || []).map((item: any, idx: number) => (
              <Timeline.Item key={idx}>{item}</Timeline.Item>
            ))}
          </Timeline>
        </div>
      )}
    </Card>
  );
};

export default Tracking;
