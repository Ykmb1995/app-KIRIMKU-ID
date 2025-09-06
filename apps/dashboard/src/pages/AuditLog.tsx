import React, { useEffect, useState } from 'react';
import { Table, Card } from 'antd';
import axios from 'axios';

interface Log {
  id: string;
  user: string;
  action: string;
  orderId?: string;
  createdAt: string;
}

const AuditLog: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/audit-log').then(res => setLogs(res.data)).finally(() => setLoading(false));
  }, []);

  return (
    <Card title="Audit Log" style={{ maxWidth: 900, margin: '0 auto' }}>
      <Table
        rowKey="id"
        columns={[
          { title: 'User', dataIndex: 'user', key: 'user' },
          { title: 'Aksi', dataIndex: 'action', key: 'action' },
          { title: 'Order', dataIndex: 'orderId', key: 'orderId' },
          { title: 'Waktu', dataIndex: 'createdAt', key: 'createdAt' },
        ]}
        dataSource={logs}
        loading={loading}
        bordered
      />
    </Card>
  );
};

export default AuditLog;
