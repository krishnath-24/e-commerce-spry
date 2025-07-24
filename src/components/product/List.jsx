import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFavorite,
  setCategoryFilter,
  setRatingFilter,
  setSortOrder,
} from "../../redux/productsSlice";
import { fetchCategories, fetchProducts } from "../../api/products";
import ProductCard from "./Card";
import ProductSkeleton from "../ProductSkeleton";
import Filters from "../filters/Filters";
import Pagination from "./Pagination";
import { toast } from "react-toastify";

const PAGE_SIZE = 20;

export default function List() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const { categoryFilter, ratingFilter, sortOrder, favorites } = useSelector((state) => state.products);

  const fetchData = async (pageNum = 1) => {
    setLoading(true);
    try {
      const filters = { category: categoryFilter, rating: ratingFilter, order: sortOrder };
      const { data, total } = await fetchProducts(pageNum, PAGE_SIZE, filters);
      setProducts(data);
      setTotal(total);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

const filteredProducts = useMemo(() => {
    return products
      .filter((p) => (categoryFilter ? p.category === categoryFilter : true))
      .filter((p) => (ratingFilter ? p.rating >= ratingFilter : true))
      .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
  }, [products, categoryFilter, ratingFilter, sortOrder]);


  const isFilterApplied = categoryFilter || ratingFilter || sortOrder;
  const totalPages = isFilterApplied ? 1 :  Math.ceil(total / PAGE_SIZE);


  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [categoryFilter, ratingFilter, sortOrder]);

  useEffect(() => {
    fetchData(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="relative">
      <div className="flex sticky top-0 shadow-lg flex-col md:flex-row md:items-center gap-4 bg-white z-10">
        <Filters
          categories={categories}
          categoryFilter={categoryFilter}
          setCategoryFilter={(slug) => dispatch(setCategoryFilter(slug))}
          ratingFilter={ratingFilter}
          setRatingFilter={(val) => dispatch(setRatingFilter(val))}
          sortOrder={sortOrder}
          setSortOrder={(order) => dispatch(setSortOrder(order))}
        />
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={() => {
                  toast.success(
                    favorites.includes(product.id)
                      ? "Removed from favorites"
                      : "Added to favorites",
                    {
                      position: "top-right",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                    }
                  );
                  dispatch(toggleFavorite(product.id));
                }}
              />
            ))}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 py-6">No matching products!</div>
      )}
    </div>
  );
}
