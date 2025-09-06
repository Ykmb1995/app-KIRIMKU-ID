import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Staff', value: 'staff' },
];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/user');
      setUsers(res.data);
    } catch {
      message.error('Gagal mengambil data user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleAdd = () => { setEditing(null); form.resetFields(); setModalOpen(true); };
  const handleEdit = (user: User) => { setEditing(user); form.setFieldsValue(user); setModalOpen(true); };
  const handleDelete = (user: User) => {
    Modal.confirm({
      title: 'Hapus User',
      content: `Yakin hapus user ${user.email}?`,
      okText: 'Hapus', okType: 'danger', cancelText: 'Batal',
      onOk: async () => {
        try { await axios.delete(`/user/${user.id}`); message.success('User dihapus'); fetchUsers(); }
        catch { message.error('Gagal hapus user'); }
      },
    });
  };
  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editing) { await axios.put(`/user/${editing.id}`, values); message.success('User diupdate'); }
      else { await axios.post('/user', values); message.success('User ditambah'); }
      setModalOpen(false); fetchUsers();
    } catch {}
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleAdd}>Tambah User</Button>
      </Space>
      <Table
        rowKey="id"
        columns={[
          { title: 'Email', dataIndex: 'email', key: 'email' },
          { title: 'Nama', dataIndex: 'name', key: 'name' },
          { title: 'Role', dataIndex: 'role', key: 'role' },
          {
            title: 'Aksi', key: 'aksi', render: (_: any, record: User) => (
              <Space>
                <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                <Button type="link" danger onClick={() => handleDelete(record)}>Hapus</Button>
              </Space>
            ),
          },
        ]}
        dataSource={users}
        loading={loading}
        bordered
      />
      <Modal
        title={editing ? 'Edit User' : 'Tambah User'}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => setModalOpen(false)}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
          <Form.Item name="name" label="Nama" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}><Select options={roleOptions} /></Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: !editing }]}><Input.Password /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
