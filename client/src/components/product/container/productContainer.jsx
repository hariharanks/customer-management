import { useState, useEffect } from "react";
import ProductList from "../component/productList";
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import AddProduct from "../component/addProduct";
import { fetchProducts } from '../../api/product';

const ProductContainer = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setEditingProduct(null);
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
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (product) => {
    console.log("editingProduct=====",product);
    setEditingProduct(product);
    showDrawer();
  };

  return (
    <>
      <div className="button-div">
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New product
        </Button>
      </div>
      <ProductList data={data} loading={loading} onEdit={handleEditProduct} />
      <AddProduct 
        onClose={onClose} 
        showDrawer={showDrawer} 
        open={open} 
        fetchProducts={fetchData} 
        editingProduct={editingProduct} 
      />
    </>
  );
};

export default ProductContainer;
