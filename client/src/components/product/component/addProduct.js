import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, InputNumber, Row, Select, Space, Upload, message } from 'antd';
import { addProducts, uploadImage } from '../../api/product';

const { Option } = Select;

const AddProduct = ({ onClose, open, fetchProducts }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleFinish = async (values) => {
    try {
      const productData = {
        ...values,
        expirationDate: values.expirationDate ? values.expirationDate.format('YYYY-MM-DD') : null,
        imageUrl
      };

      // Send data to the API
      const response = await addProducts(productData);

      if (response.success) {
        message.success('Product added successfully');
        fetchProducts();
        form.resetFields();
        setImageUrl('');
        setFileList([]);
        onClose();
      }
    } catch (error) {
      message.error('Failed to add product');
    }
  };

  const handleChange = (info) => {
    console.log("info====", info);
    
    if (info.file.status === 'done') {
      if (info.file.response && info.file.response.filePath) {
        const fileUrl = info.file.response.filePath;
        setImageUrl(fileUrl);
        setFileList([
          {
            uid: info.file.uid,
            name: info.file.name,
            status: 'done',
            url: fileUrl, // Set the URL from the response
          },
        ]);
        message.success(`File uploaded successfully: ${fileUrl}`);
      } else {
        message.error('File upload response did not contain a filePath.');
      }
    } else if (info.file.status === 'error') {
      message.error('File upload failed.');
    }
  };

  const customRequest = async (options) => {
    console.log("xxxxxxxxxxx");
    
    const { file, onSuccess, onError } = options;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await uploadImage(formData);
      // Ensure the API response contains the filePath
      const filePath = response.data.filePath;
      if (filePath) {
        onSuccess(response.data); // Notify Ant Design that upload was successful
      } else {
        throw new Error('File path is missing in the response');
      }
    } catch (error) {
      onError(error); // Notify Ant Design that upload failed
    }
  };

  return (
    <Drawer
      title="Create a new product"
      width={720}
      onClose={onClose}
      open={open}
      bodyStyle={{
        paddingBottom: 80,
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={() => form.submit()} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        onFinish={handleFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter the product name',
                },
              ]}
            >
              <Input placeholder="Please enter the product name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: 'Please select a category',
                },
              ]}
            >
              <Select placeholder="Please select a category">
                <Option value="Fruits">Fruits</Option>
                <Option value="Vegetables">Vegetables</Option>
                <Option value="Dairy">Dairy</Option>
                <Option value="Snacks">Snacks</Option>
                <Option value="Others">Others</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[
                {
                  required: true,
                  message: 'Please enter the brand',
                },
              ]}
            >
              <Input placeholder="Please enter the brand" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="weight"
              label="Weight/Volume"
              rules={[
                {
                  required: true,
                  message: 'Please enter the weight or volume',
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="e.g. 1kg, 500ml"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="salePrice"
              label="Sale Price"
              rules={[
                {
                  required: true,
                  message: 'Please enter the sale price',
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Please enter the sale price"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="listPrice"
              label="List Price"
              rules={[
                {
                  required: true,
                  message: 'Please enter the list price',
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Please enter the list price"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="stockQuantity"
              label="Quantity"
              rules={[
                {
                  required: true,
                  message: 'Please enter the quantity',
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: '100%' }}
                placeholder="Please enter the quantity"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="expirationDate"
              label="Expiration Date"
              rules={[
                {
                  required: false,
                  message: 'Please select the expiration date',
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="Select expiration date"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="image"
              label="Product Image"
              valuePropName="fileList"
              getValueFromEvent={({ fileList }) => fileList}
              rules={[
                {
                  required: true,
                  message: 'Please upload a product image',
                },
              ]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => true} // Prevents auto-upload
                customRequest={customRequest}
                onChange={handleChange}
                fileList={fileList}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Please enter a description',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Please enter a product description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default AddProduct;
