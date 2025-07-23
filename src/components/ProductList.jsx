import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleFavorite,
  setCategoryFilter,
  setRatingFilter,
  setSortOrder,
} from "../redux/productsSlice";
import { fetchCategories, fetchProducts } from "../api/products";
import { HeartIcon as Heart } from "@heroicons/react/24/outline";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const PAGE_SIZE = 20;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const observer = useRef();
  const dispatch = useDispatch();
  const { categoryFilter, ratingFilter, sortOrder, favorites } = useSelector(
    (state) => state.products
  );
  const [categories, setCategories] = useState([]);
  const isFetchingRef = useRef(false);

  const fetchData = async (pageNum = 1, reset = false) => {
    if (loading || isFetchingRef.current) {
      return;
    }
    isFetchingRef.current = true;
    try {
      const filterData = {
        category: categoryFilter,
        rating: ratingFilter,
        order: sortOrder,
      };
      setLoading(true);
      const { data, total } = await fetchProducts(pageNum, PAGE_SIZE, filterData);
      if (reset) {
        setProducts(data);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }
      setHasMore(products.length + data.length < total);
      setLoading(false);
      isFetchingRef.current = false;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Reset products when filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setProducts([]);
    fetchData(1, true);
  }, [categoryFilter, ratingFilter, sortOrder]);


  const lastProductRef = useCallback(
    (node) => {
      if ( !hasMore || categoryFilter || ratingFilter || sortOrder) {
        return;
      }
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (categoryFilter || ratingFilter) return;
        if (entries[0].isIntersecting && !isFetchingRef.current && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
        console.log("Observing last product:", node);
      }
    },
    [hasMore, categoryFilter, ratingFilter, sortOrder]
  );

  useEffect(() => {
    if (page === 1) {
      return;
    }
    fetchData(page, false);
  }, [page]);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));

  }, []);

  const filtered = useMemo(() => {
    return products
      .filter((p) =>
        categoryFilter ? p.category === categoryFilter : true
      )
      .filter((p) => (ratingFilter ? p.rating >= ratingFilter : true))
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [products, categoryFilter, ratingFilter, sortOrder]);

  const toggleCategoryDropdown = () => setShowCategoryDropdown(prev => !prev);

  return (
    <div>
      <div className="sticky top-0 bg-white p-2 z-10 flex gap-2 items-center flex-wrap">
        <div
          className="relative"
          tabIndex={0}
        >
          <button
            className="border p-2 rounded w-[180px] bg-white text-left"
            onClick={toggleCategoryDropdown}
            type="button"
          >
            {categoryFilter
              ? categories.find((c) => c.slug === categoryFilter)?.name
              : "All Categories"}
          </button>
          {showCategoryDropdown && (
            <div className="absolute mt-1 border rounded bg-white shadow-lg z-20 w-[180px] max-h-[220px] overflow-y-auto">
              <div
                className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                onClick={() => {
                  dispatch(setCategoryFilter(""));
                  toggleCategoryDropdown();
                }}
              >
                All Categories
              </div>
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className="cursor-pointer px-2 py-1 hover:bg-gray-100"
                  onClick={() => {
                    dispatch(setCategoryFilter(category.slug));
                    toggleCategoryDropdown()
                  }}
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <select
          onChange={(e) => dispatch(setRatingFilter(Number(e.target.value)))}
          className="border p-2 rounded"
        >
          <option value="">All Ratings</option>
          <option value="4">4 & up</option>
          <option value="3">3 & up</option>
        </select>
        <select
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
          className="border p-2 rounded"
        >
          <option value="">Sort by : none</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 overflow-hidden overflow-y-auto max-h-[100vh-200px]">
        {loading && products.length === 0
          ? Array.from({ length: 4 }).map((_, idx) => (
            <ProductSkeleton key={idx} />
          ))
          : !filtered.length ? <div className="flex items-center">No matching products!</div> : filtered.map((product, idx) => {
              return (
                <div ref={idx === filtered.length - 1 ? lastProductRef : null} key={product.id}>
                  <ProductCard
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
                  />
                </div>
                
              );
            })}
      </div>
      {(loading && products.length > 0) &&
        <ProductSkeleton />
      }
      {!hasMore && (
        <div className="text-center py-4 text-gray-400">No more products :(</div>
      )}
    </div>
  );
}