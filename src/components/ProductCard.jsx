import React from "react";
import { HeartIcon as HeartFill } from "@heroicons/react/24/solid";
import { HeartIcon as Heart } from "@heroicons/react/24/outline";

const ProductCard = React.memo(function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <div
      key={product.id}
      className={`min-w-[300px] h-[250px] border rounded-xl p-4 shadow flex gap-2 hover:shadow-md cursor-pointer relative`}
    >
      <button
        onClick={() => onToggleFavorite(product.id)}
        className="absolute top-4 right-2"
        aria-label={isFavorite ? "Remove Favorite" : "Add to Favorite"}
      >
        {isFavorite ? (
          <HeartFill className="w-6 h-6 text-red-500" />
        ) : (
          <Heart className="w-6 h-6 text-gray-400" />
        )}
      </button>
      <img
        src={product.thumbnail}
        alt={product.name}
        className="mb-2 h-[150px] w-[150px]"
        loading="lazy"
      />
      <div className="flex flex-col gap-2 flex-1 mr-2">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p>${product.price}</p>
        <p>{product.category}</p>
        <p>⭐ {product.rating}</p>
      </div>
    </div>
  );
});


export default ProductCard;