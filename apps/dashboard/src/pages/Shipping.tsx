import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, Table, message } from 'antd';
import axios from 'axios';

const couriers = [
  { label: 'JNE', value: 'jne' },
  { label: 'J&T', value: 'jnt' },
  { label: 'SiCepat', value: 'sicepat' },
  { label: 'AnterAja', value: 'anteraja' },
  { label: 'Ninja', value: 'ninja' },
  { label: 'SAP', value: 'sap' },
];

const Shipping: React.FC = () => {
  const [rates, setRates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.get('/shipping/ongkir', { params: values });
      setRates(res.data);
    } catch (err) {
      message.error('Gagal cek ongkir');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Cek Ongkir & Buat Pengiriman" style={{ maxWidth: 600 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="origin" label="Origin" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="destination" label="Destination" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="weight" label="Weight (gram)" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="courier" label="Courier" rules={[{ required: true }]}>
          <Select options={couriers} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Cek Ongkir
          </Button>
        </Form.Item>
      </Form>
      {rates.length > 0 && (
        <Table
          columns={[
            { title: 'Service', dataIndex: 'service', key: 'service' },
            { title: 'Price', dataIndex: 'price', key: 'price' },
            { title: 'ETD', dataIndex: 'etd', key: 'etd' },
          ]}
          dataSource={rates}
          rowKey="service"
          pagination={false}
          style={{ marginTop: 16 }}
        />
      )}
    </Card>
  );
};

export default Shipping;
