import React from 'react';
import { Card, List, Button } from 'antd';

const plugins = [
  { name: 'WooCommerce', desc: 'Integrasi toko WooCommerce', url: '#' },
  { name: 'Shopify', desc: 'Integrasi toko Shopify', url: '#' },
  { name: 'Tokopedia', desc: 'Integrasi Tokopedia', url: '#' },
  { name: 'Shopee', desc: 'Integrasi Shopee', url: '#' },
  { name: 'Magento', desc: 'Integrasi Magento', url: '#' },
];

const MarketplacePlugin: React.FC = () => (
  <Card title="Integrasi Marketplace & Plugin" style={{ maxWidth: 700, margin: '0 auto' }}>
    <List
      itemLayout="horizontal"
      dataSource={plugins}
      renderItem={item => (
        <List.Item actions={[<Button type="primary" href={item.url}>Integrasi</Button>]}> 
          <List.Item.Meta title={item.name} description={item.desc} />
        </List.Item>
      )}
    />
  </Card>
);

export default MarketplacePlugin;
