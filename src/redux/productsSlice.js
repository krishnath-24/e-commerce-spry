import { createSlice } from "@reduxjs/toolkit";

const initialFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

const productsSlice = createSlice({
  name: "products",
  initialState: {
    categoryFilter: "",
    ratingFilter: 0,
    sortOrder: "",
    favorites: initialFavorites,
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((fid) => fid !== id);
      } else {
        state.favorites.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const {
  setCategoryFilter,
  setRatingFilter,
  setSortOrder,
  toggleFavorite,
} = productsSlice.actions;

export default productsSlice.reducer;