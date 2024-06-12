// Home page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation hook from React Router

import { apiService } from "../api/APIUtils"; // Custom hook for API calls
import { ProductTableHeaders } from "../constant"; // Constants for table headers

import { MdDeleteForever, MdOutlineEdit } from "react-icons/md"; // Icons for edit and delete actions
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Sorting icons
import { ConfirmationModal } from "./form/ConfirmationModal";

export const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState({
    isModalOpen: false,
  });
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "productName",
    direction: "ascending",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch products from the API and update state
  const fetchProducts = async () => {
    const fetchedProducts = await apiService.getProduct();
    setProducts(fetchedProducts);
  };

  // Delete a product by ID, then refresh the list and close the modal
  const deleteProduct = async (id) => {
    await apiService.deleteProduct(id);
    fetchProducts();
    setModal({ isModalOpen: false });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open the confirmation modal for deleting a product
  const handleDelete = (item) => {
    setModal({
      isModalOpen: true,
      message: `Do you want to delete this "${item?.productName}" product?`,
      id: item?.id,
    });
  };

  // Navigate to the edit page for a product
  const handleEdit = (item) => {
    navigate(`/edit-product/${item?.id}`);
  };

  // Sort products based on the selected configuration
  const sortedProducts = [...products]?.sort((a, b) => {
    let aValue = a[sortConfig?.key];
    let bValue = b[sortConfig?.key];

    // Convert numeric strings to numbers for correct sorting
    if (sortConfig?.key === "price" || sortConfig?.key === "stock") {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    }

    // Perform case-insensitive comparison for strings
    if (typeof aValue === "string" && typeof bValue === "string") {
      aValue = aValue?.toLowerCase();
      bValue = bValue?.toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig?.direction === "ascending" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig?.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  // Filter products by name and status
  const filteredProducts = sortedProducts?.filter((product) => {
    const nameMatches = product?.productName?.toLowerCase()?.includes(filter?.toLowerCase());
    const statusMatches = statusFilter === "all" || product?.status?.toLowerCase() === statusFilter?.toLowerCase();
    return nameMatches && statusMatches;
  });

  // Update sorting configuration
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig?.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);

  // Get products for the current page
  const currentPageData = filteredProducts?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const classNameForTd = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

  return (
    <>
      <div className=" mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product List</h1>

        {/* Filters */}
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Filter by product name"
            value={filter}
            onChange={(e) => {
              setFilter(e?.target?.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded w-full max-w-60"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e?.target?.value);
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Products table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded">
            <thead className="bg-gray-50">
              <tr>
                {ProductTableHeaders?.map(({ key, label }) => (
                  <th
                    key={key}
                    className={`px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider ${
                      key === "actions" ? "" : "text-left cursor-pointer"
                    }`}
                    onClick={() => key !== "actions" && requestSort(key)}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {sortConfig?.key === key ? (
                        sortConfig?.direction === "ascending" ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : key !== "actions" ? (
                        <FaSort />
                      ) : (
                        ""
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPageData?.length ? (
                currentPageData?.map((item) => {
                  return (
                    <tr key={item?.id} className="hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item?.productName}
                      </td>
                      <td className={classNameForTd}>{item?.stock}</td>
                      <td className={classNameForTd}>{item?.price}</td>
                      <td className={classNameForTd}>{item?.status}</td>
                      <td className={classNameForTd}>{item?.note}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-6 justify-center">
                        <MdOutlineEdit
                          size={20}
                          className="cursor-pointer text-blue-500"
                          onClick={() => handleEdit(item)}
                        />
                        <MdDeleteForever
                          size={20}
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDelete(item)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={ProductTableHeaders?.length}
                    className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500"
                  >
                    Data not found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        {!!filteredProducts?.length && (
          <div className="pagination-controls flex items-center justify-center mt-4">
            <button
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-3 py-1 mx-2 bg-gray-200 rounded">
              {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Confirmation modal for delete */}
      {modal?.isModalOpen && (
        <ConfirmationModal
          isOpen={modal?.isModalOpen}
          onConfirm={() => deleteProduct(modal?.id)}
          message={modal?.message}
          onClose={() => setModal({ isModalOpen: false })}
        />
      )}
    </>
  );
};
