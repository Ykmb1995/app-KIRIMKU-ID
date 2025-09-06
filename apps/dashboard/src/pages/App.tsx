import React from 'react';
import { Layout, Menu } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Orders from './Orders';
import Shipping from './Shipping';
import Tracking from './Tracking';
import Label from './Label';

const { Header, Content, Sider } = Layout;

const App: React.FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider>
      <div style={{ color: 'white', padding: 16, fontWeight: 'bold', fontSize: 18 }}>Kirimku.ID</div>
      <Menu theme="dark" mode="inline">
        <Menu.Item key="dashboard"><Link to="/">Dashboard</Link></Menu.Item>
        <Menu.Item key="orders"><Link to="/orders">Orders</Link></Menu.Item>
        <Menu.Item key="shipping"><Link to="/shipping">Shipping</Link></Menu.Item>
        <Menu.Item key="tracking"><Link to="/tracking">Tracking</Link></Menu.Item>
        <Menu.Item key="label"><Link to="/label">Label</Link></Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '16px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/label" element={<Label />} />
        </Routes>
      </Content>
    </Layout>
  </Layout>
);

export default App;
