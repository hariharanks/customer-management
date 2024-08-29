import { axiosInstance } from './token';

export const fetchProducts = async () => {
  try {
    const response = await axiosInstance.get('/api/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProducts = async (productData) => {
  try {
    const response = await axiosInstance.post('/api/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const uploadImage = async (formData) => {
  console.log("formData======", formData);
  
  try {
    const response = await axiosInstance.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const updateProduct = async (productId, productData) => {
  console.log("productId, productData",productId, productData);
  
  try {
    const response = await axiosInstance.put(`/api/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};