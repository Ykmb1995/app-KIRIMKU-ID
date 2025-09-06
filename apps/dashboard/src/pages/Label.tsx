import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

const couriers = [
  { label: 'JNE', value: 'jne' },
  { label: 'J&T', value: 'jnt' },
  { label: 'SiCepat', value: 'sicepat' },
  { label: 'AnterAja', value: 'anteraja' },
  { label: 'Ninja', value: 'ninja' },
  { label: 'SAP', value: 'sap' },
];

const Label: React.FC = () => {
  const [labelUrl, setLabelUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post('/label/generate', values);
      setLabelUrl(res.data.labelUrl);
    } catch (err) {
      message.error('Gagal generate label');
      setLabelUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Cetak Label Pengiriman" style={{ maxWidth: 600 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="orderId" label="Order ID" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item name="ekspedisi" label="Ekspedisi" rules={[{ required: true }]}>
          <Select options={couriers} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>Generate Label</Button>
        </Form.Item>
      </Form>
      {labelUrl && (
        <div style={{ marginTop: 24 }}>
          <a href={labelUrl} target="_blank" rel="noopener noreferrer">Download / Preview Label</a>
        </div>
      )}
    </Card>
  );
};

export default Label;
