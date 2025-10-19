import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:8000/api/product"),
          axios.get("http://localhost:8000/api/category"),
        ]);
        setProducts(productRes.data);
        setAllProducts(productRes.data);
        setCategories(categoryRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (!categoryId) {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (p) => p.category && p.category._id === categoryId
      );
      setProducts(filtered);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.name.toLowerCase().includes(term)
    );
    setProducts(filtered);
  };

  const handleAddToCart = (productId) => {
    setQuantities({ ...quantities, [productId]: 1 });
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const newQty = (prev[productId] || 0) + change;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  return (
    <div className="p-6 mt-20">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Row */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-6">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`text-sm flex flex-col items-center ${
            selectedCategory === null ? "font-bold text-blue-600" : ""
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
            <span>All</span>
          </div>
          <span>All</span>
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => handleCategoryClick(cat._id)}
            className={`text-sm flex flex-col items-center ${
              selectedCategory === cat._id ? "font-bold text-blue-600" : ""
            }`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-14 h-14 rounded-full object-cover border shadow"
            />
            <span className="mt-1">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>

              {quantities[product._id] ? (
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => handleQuantityChange(product._id, -1)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    -
                  </button>
                  <span>{quantities[product._id]}</span>
                  <button
                    onClick={() => handleQuantityChange(product._id, 1)}
                    className="px-2 py-1 bg-green-500 text-white rounded"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
