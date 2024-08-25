import React, { useState, useEffect } from 'react';
import { Table, Image, Spin } from 'antd';
import { generateURL } from '../../utils/imageUrl';


const columns = [
  {
    title: 'Image',
    width: 100,
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    fixed: 'left',
    render: (imageUrl) => (
      <Image
        width={50}
        src={imageUrl}
        alt="Product"
      />
    ),
  },
  {
    title: 'Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
  },
  {
    title: 'Weight/Volume',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Expiration Date',
    dataIndex: 'expirationDate',
    key: 'expirationDate',
  },
  {
    title: 'Supplier',
    dataIndex: 'supplier',
    key: 'supplier',
  },
  {
    title: 'Sale Price',
    dataIndex: 'salePrice',
    key: 'salePrice',
  },
  {
    title: 'List Price',
    dataIndex: 'listPrice',
    key: 'listPrice',
  },
  {
    title: 'Quantity',
    dataIndex: 'stockQuantity',
    key: 'stockQuantity',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a>Edit</a>,
  },
];

const ProductList = ({data, loading}) => {

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 10,
      }}
      scroll={{
        x: 1500,
        y: 300,
      }}
    />
  );
};

export default ProductList;
