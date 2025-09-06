import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Modal, Form, Input, Select, Switch, Upload, Card, Badge, Avatar, Tooltip } from 'antd';
import { DownloadOutlined, UploadOutlined, PlusOutlined, SearchOutlined, SendOutlined, PrinterOutlined, EyeOutlined, AuditOutlined, BellOutlined, ShopOutlined } from '@ant-design/icons';
import axios from 'axios';
import Papa from 'papaparse';

interface Order {
  id: string;
  userId: string;
  ekspedisi: string;
  trackingCode?: string;
  status: string;
  cod: boolean;
  insurance: boolean;
  address: string;
  createdAt: string;
}

const ekspedisiOptions = [
  { label: 'JNE', value: 'jne' },
  { label: 'J&T', value: 'jnt' },
  { label: 'SiCepat', value: 'sicepat' },
  { label: 'AnterAja', value: 'anteraja' },
  { label: 'Ninja', value: 'ninja' },
  { label: 'SAP', value: 'sap' },
];

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<{ ekspedisi?: string; status?: string }>({});
  const [importing, setImporting] = useState(false);
  // Tambahan: Dummy userRole, bisa diganti dari context/auth
  const [userRole] = useState<string>('admin'); // ganti dengan context/auth jika sudah ada
  const [auditLogModal, setAuditLogModal] = useState<{ open: boolean; orderId?: string }>({ open: false });
  const [pluginModal, setPluginModal] = useState<{ open: boolean; orderId?: string }>({ open: false });
  const [notifLoading, setNotifLoading] = useState<string | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/order');
      setOrders(res.data);
    } catch (err) {
      message.error('Gagal mengambil data order');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (order: Order) => {
    setEditing(order);
    form.setFieldsValue(order);
    setModalOpen(true);
  };

  const handleDelete = async (order: Order) => {
    Modal.confirm({
      title: 'Hapus Order',
      content: `Yakin hapus order ${order.id}?`,
      okText: 'Hapus',
      okType: 'danger',
      cancelText: 'Batal',
      onOk: async () => {
        try {
          await axios.delete(`/order/${order.id}`);
          message.success('Order dihapus');
          fetchOrders();
        } catch {
          message.error('Gagal hapus order');
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await axios.put(`/order/${editing.id}`, values);
        message.success('Order diupdate');
      } else {
        await axios.post('/order', values);
        message.success('Order ditambah');
      }
      setModalOpen(false);
      fetchOrders();
    } catch (err) {
      // error handled by antd
    }
  };

  // Bulk Import CSV
  const handleImport = (file: File) => {
    setImporting(true);
    Papa.parse(file, {
      header: true,
      complete: async (results: Papa.ParseResult<Order>) => {
        try {
          await axios.post('/order/bulk', results.data);
          message.success('Import berhasil');
          fetchOrders();
        } catch {
          message.error('Import gagal');
        } finally {
          setImporting(false);
        }
      },
      error: () => {
        message.error('Format CSV tidak valid');
        setImporting(false);
      },
    });
    return false;
  };

  // Export CSV
  const handleExport = () => {
    const csv = Papa.unparse(orders);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter & Search
  const filteredOrders = orders.filter((o: Order) =>
    (!search || o.id.includes(search) || o.ekspedisi.includes(search) || o.status.includes(search)) &&
    (!filter.ekspedisi || o.ekspedisi === filter.ekspedisi) &&
    (!filter.status || o.status === filter.status)
  );

  // Buat Pengiriman
  const handleCreateShipment = async (order: Order) => {
    try {
      await axios.post('/shipping/create-shipment', {
        orderId: order.id,
        address: order.address,
        items: [],
        courier: order.ekspedisi,
        cod: order.cod,
        insurance: order.insurance,
      });
      message.success('Pengiriman dibuat');
      fetchOrders();
    } catch {
      message.error('Gagal membuat pengiriman');
    }
  };

  // Audit Log: Dummy fetch, ganti dengan API call jika sudah ada endpoint
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const fetchAuditLog = async (orderId: string) => {
    setAuditLogs([]);
    setAuditLogModal({ open: true, orderId });
    try {
      // Ganti endpoint sesuai backend
      const res = await axios.get(`/audit-log/order/${orderId}`);
      setAuditLogs(res.data);
    } catch {
      setAuditLogs([]);
    }
  };

  // Notifikasi Otomatis (manual trigger)
  const handleSendNotification = async (order: Order) => {
    setNotifLoading(order.id);
    try {
      await axios.post(`/notification/send`, { orderId: order.id });
      message.success('Notifikasi dikirim');
    } catch {
      message.error('Gagal mengirim notifikasi');
    } finally {
      setNotifLoading(null);
    }
  };

  // Plugin Marketplace (dummy modal)
  const handlePluginIntegrate = (order: Order) => {
    setPluginModal({ open: true, orderId: order.id });
  };

  // Helper: Status badge color
  const statusColor: Record<string, string> = {
    pending: 'orange',
    'in transit': 'blue',
    delivered: 'green',
    exception: 'red',
    processing: 'purple',
    assuring: 'cyan',
    selesai: 'green',
    diproses: 'blue',
    baru: 'orange',
  };

  // Helper: Ekspedisi logo
  const ekspedisiLogo: Record<string, string> = {
    jne: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/JNE_logo.png',
    jnt: 'https://1000logos.net/wp-content/uploads/2021/05/JT-Express-logo.png',
    sicepat: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/SiCepat_logo.png',
    anteraja: 'https://anteraja.id/assets/img/logo-2.png',
    ninja: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Ninja_Van_logo.png',
    sap: 'https://sap-express.id/assets/img/logo.png',
  };

  // Summary cards data
  const summary = [
    { title: 'Total Orders', value: orders.length, color: '#e6f7ff' },
    { title: 'Pending', value: orders.filter(o => o.status.toLowerCase() === 'pending' || o.status.toLowerCase() === 'baru').length, color: '#fffbe6' },
    { title: 'In Transit', value: orders.filter(o => o.status.toLowerCase().includes('transit')).length, color: '#e6f4ff' },
    { title: 'Delivered', value: orders.filter(o => o.status.toLowerCase().includes('delivered') || o.status.toLowerCase() === 'selesai').length, color: '#f6ffed' },
    { title: 'Exception', value: orders.filter(o => o.status.toLowerCase() === 'exception').length, color: '#fff1f0' },
  ];

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => <b style={{ color: '#1677ff' }}>#{id}</b>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Badge color={statusColor[status.toLowerCase()] || 'gray'} text={status.charAt(0).toUpperCase() + status.slice(1)} />,
    },
    {
      title: 'Recipient',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: string) => <span>{userId}</span>, // Ganti dengan nama jika ada
    },
    {
      title: 'Courier',
      dataIndex: 'ekspedisi',
      key: 'ekspedisi',
      render: (ekspedisi: string) => (
        <span>
          <Avatar size={20} src={ekspedisiLogo[ekspedisi]} style={{ marginRight: 6 }} />
          {ekspedisi.toUpperCase()}
        </span>
      ),
    },
    {
      title: 'Tracking',
      dataIndex: 'trackingCode',
      key: 'trackingCode',
      render: (tracking: string) => tracking || '-',
    },
    {
      title: 'Alamat',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Order) => (
        <Space>
          <Tooltip title="Print Label"><Button icon={<PrinterOutlined />} /></Tooltip>
          <Tooltip title="View Detail"><Button icon={<EyeOutlined />} /></Tooltip>
          <Tooltip title="Audit Log"><Button icon={<AuditOutlined />} onClick={() => fetchAuditLog(record.id)} /></Tooltip>
          <Tooltip title="Send Notification"><Button icon={<BellOutlined />} loading={notifLoading === record.id} onClick={() => handleSendNotification(record)} /></Tooltip>
          <Tooltip title="Integrasi Marketplace"><Button icon={<ShopOutlined />} onClick={() => handlePluginIntegrate(record)} /></Tooltip>
          {['admin', 'staff'].includes(userRole) && (
            <Tooltip title="Edit"><Button type="link" onClick={() => handleEdit(record)}>Edit</Button></Tooltip>
          )}
          {userRole === 'admin' && (
            <Tooltip title="Delete"><Button type="link" danger onClick={() => handleDelete(record)}>Hapus</Button></Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f5f7fa', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        {summary.map((s, i) => (
          <Card key={i} style={{ minWidth: 160, background: s.color, borderRadius: 12, boxShadow: '0 2px 8px #0001' }}>
            <div style={{ fontSize: 13, color: '#888' }}>{s.title}</div>
            <div style={{ fontSize: 28, fontWeight: 700 }}>{s.value}</div>
          </Card>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Select
              placeholder="Status"
              allowClear
              style={{ width: 120 }}
              options={['Pending', 'In Transit', 'Delivered', 'Exception', 'Processing', 'Assuring', 'Baru', 'Diproses', 'Selesai'].map(s => ({ label: s, value: s.toLowerCase() }))}
              value={filter.status}
              onChange={(v: string | undefined) => setFilter((f: { ekspedisi?: string; status?: string }) => ({ ...f, status: v }))}
            />
            <Select
              placeholder="Ekspedisi"
              allowClear
              style={{ width: 120 }}
              options={ekspedisiOptions}
              value={filter.ekspedisi}
              onChange={(v: string | undefined) => setFilter((f: { ekspedisi?: string; status?: string }) => ({ ...f, ekspedisi: v }))}
            />
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Input.Search
              placeholder="Cari Order/Tracking/Alamat"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              style={{ width: 220 }}
            />
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Create Shipment</Button>
            <Button icon={<DownloadOutlined />} onClick={handleExport}>Export</Button>
            <Upload beforeUpload={handleImport} showUploadList={false} accept=".csv">
              <Button icon={<UploadOutlined />} loading={importing}>Import</Button>
            </Upload>
          </div>
        </div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredOrders}
          loading={loading}
          bordered
          pagination={{ pageSize: 10 }}
          style={{ borderRadius: 8 }}
        />
      </div>
      <Modal
        title={editing ? 'Edit Order' : 'Tambah Order'}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical" initialValues={{ cod: false, insurance: false }}>
          <Form.Item name="ekspedisi" label="Ekspedisi" rules={[{ required: true }]}>
            <Select options={ekspedisiOptions} />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="cod" label="COD" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="insurance" label="Asuransi" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item name="address" label="Alamat" rules={[{ required: true }]}>
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Audit Log Modal */}
      <Modal
        title={`Audit Log Order ${auditLogModal.orderId}`}
        open={auditLogModal.open}
        onCancel={() => setAuditLogModal({ open: false })}
        footer={null}
        width={600}
      >
        <Table
          size="small"
          columns={[
            { title: 'Waktu', dataIndex: 'createdAt', key: 'createdAt' },
            { title: 'Aksi', dataIndex: 'action', key: 'action' },
            { title: 'User', dataIndex: 'user', key: 'user' },
            { title: 'Detail', dataIndex: 'detail', key: 'detail' },
          ]}
          dataSource={auditLogs}
          rowKey={(r: any) => r.id || r.createdAt}
          pagination={false}
        />
      </Modal>

      {/* Plugin Marketplace Modal */}
      <Modal
        title={`Integrasi Marketplace Order ${pluginModal.orderId}`}
        open={pluginModal.open}
        onCancel={() => setPluginModal({ open: false })}
        footer={null}
      >
        <p>Integrasi dengan WooCommerce, Shopify, Tokopedia, Shopee, Magento, dll (fitur coming soon).</p>
        <Button type="primary" disabled>Hubungkan Marketplace</Button>
      </Modal>
    </div>
  );
};

export default Orders;
