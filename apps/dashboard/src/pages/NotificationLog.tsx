import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import axios from 'axios';

interface NotificationLog {
  id: string;
  user: string;
  type: string;
  to: string;
  message: string;
  status: string;
  createdAt: string;
}

const NotificationLog: React.FC = () => {
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/notification/log').then(res => setLogs(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <Card title="Log Notifikasi" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Table
        rowKey="id"
        columns={[
          { title: 'User', dataIndex: 'user', key: 'user' },
          { title: 'Tipe', dataIndex: 'type', key: 'type' },
          { title: 'Tujuan', dataIndex: 'to', key: 'to' },
          { title: 'Pesan', dataIndex: 'message', key: 'message' },
          { title: 'Status', dataIndex: 'status', key: 'status' },
          { title: 'Waktu', dataIndex: 'createdAt', key: 'createdAt' },
        ]}
        dataSource={logs}
        loading={loading}
        bordered
      />
    </Card>
  );
};

export default NotificationLog;
