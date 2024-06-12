//  Add and edit Product 
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";

import { apiService } from "../api/APIUtils";
import { Input } from "./form/Input";

export const AddEditProduct = ({ isEdit }) => {
  const navigate = useNavigate();

  const [productById, setProductById] = useState({});
  const { id } = useParams();

  // Fetches a single product by ID for editing
  const fetchProductById = async (id) => {
    const fetchedProduct = await apiService.getProductById(id);
    setProductById(fetchedProduct);
  };

  // Effect to fetch product details when editing
  useEffect(() => {
    if (isEdit) {
      fetchProductById(id);
    }
  }, [id, isEdit]);

  // Effect to fetch product details when editing
  const formik = useFormik({
    initialValues: {
      productName: "",
      stock: "",
      price: "",
      status: "active",
      note: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Product name is required"),
      stock: Yup.number(),
      price: Yup.number().required("Price is required"),
      status: Yup.string().oneOf(["active", "inactive"]).required("Status is required"),
      note: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        if (isEdit) {
          await apiService.updateProduct(id, values);
          formik.resetForm();
        } else {
          values.id = uuidv4();
          await apiService.createProduct(values);
          formik.resetForm();
        }
      } catch (error) {
        console.error("Failed to save product:", error);
      }
      if (isEdit) {
        navigate(`/`);
      }
    },
  });

  // Effect to populate form fields with product details when editing
  useEffect(() => {
    if (isEdit && productById) {
      formik.setValues({
        id: productById?.id,
        productName: productById?.productName || "",
        stock: productById?.stock || "",
        price: productById?.price || "",
        status: productById?.status || "",
        note: productById?.note || "",
      });
    }
  }, [productById, isEdit]);

  return (
    <>
      <div className="container mx-auto p-4 max-w-[800px]">
        <h1 className="text-2xl font-bold mb-6">{`${isEdit ? "Edit" : "Add"} Product`}</h1>
        {/* product form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <Input
            name="productName"
            label="Product Name"
            value={formik?.values?.productName}
            onChange={formik.handleChange}
            formik={formik}
            isRequired
          />
          <Input
            name="stock"
            label="Stock"
            type="text"
            value={formik?.values?.stock}
            onChange={formik.handleChange}
            formik={formik}
          />
          <Input
            name="price"
            label="Price"
            type="text"
            value={formik?.values?.price}
            onChange={formik.handleChange}
            formik={formik}
            isRequired
          />
          <div className="mb-4">
            <label className="block text-sm text-gray-700 required font-bold">Status</label>
            <div className="flex items-center mt-1 space-x-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  type="radio"
                  name="status"
                  id="active"
                  value="active"
                  checked={formik.values.status === "active"}
                  onChange={formik.handleChange}
                />
                <label className="ml-2 block text-sm font-medium text-gray-700" htmlFor="active">
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  type="radio"
                  name="status"
                  id="inactive"
                  value="inactive"
                  checked={formik.values.status === "inactive"}
                  onChange={formik.handleChange}
                />
                <label className="ml-2 block text-sm font-medium text-gray-700" htmlFor="inactive">
                  Inactive
                </label>
              </div>
            </div>
            {formik?.errors?.status && formik?.touched?.status && (
              <span className="text-red-500 text-sm mt-1 block">{formik?.errors?.status}</span>
            )}
          </div>
          <Input name="note" label="Note" value={formik?.values?.note} onChange={formik.handleChange} formik={formik} />

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(`/`)}
              className="bg-gray-300 text-gray-700 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              {`${isEdit ? "Edit" : "Add"} Product`}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
