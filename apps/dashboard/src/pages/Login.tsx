import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import axios from 'axios';

const Login: React.FC<{ onLogin: (token: string) => void }> = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', values);
      onLogin(res.data.token);
      message.success('Login berhasil');
    } catch (err: any) {
      message.error(err?.response?.data?.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Login Kirimku.ID" style={{ width: 350 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}> <Input /> </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}> <Input.Password /> </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>Login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
