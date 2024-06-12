// All API 
import axios from "axios";

const API_URL = "http://localhost:3001";

export const apiService = {
  getProduct: async () => {
    try {
      const response = await axios.get(`${API_URL}/product`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/product/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  },

  createProduct: async (newProduct) => {
    try {
      const response = await axios.post(`${API_URL}/product`, newProduct);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  updateProduct: async (id, updatedPost) => {
    try {
      const response = await axios.put(`${API_URL}/product/${id}`, updatedPost);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API_URL}/product/${id}`);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  },
};
