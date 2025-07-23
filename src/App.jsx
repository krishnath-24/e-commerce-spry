import React from "react";
import ProductList from "./components/ProductList";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Product Listing</h1>
        <ProductList />
      </div>
    </Provider>
  );
}

export default App;