import { useState, useEffect } from "react";
import ProductList from "../component/productList"
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import AddProduct from "../component/addProduct";
import { fetchProducts } from '../../api/product';

const ProductContainer = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const result = await fetchProducts();
      const formattedData = result.data.map(item => ({
        ...item,
        expirationDate: item.expirationDate.split('T')[0],
      }));
  
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="button-div">
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New product
        </Button>
        {open && <AddProduct onClose={onClose} showDrawer={showDrawer} open={open} fetchProducts={fetchData}/>}
      </div>
      <ProductList data={data} loading={loading}/>
    </>
  )
}
export default ProductContainer;