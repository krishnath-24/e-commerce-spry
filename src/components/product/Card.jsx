import React, { useState } from "react";
import { HeartIcon as HeartFill } from "@heroicons/react/24/solid";
import { HeartIcon as Heart } from "@heroicons/react/24/outline";

const Card = React.memo(function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      key={product.id}
      className={`min-w-[300px] h-[250px] border rounded-xl p-4 shadow flex gap-2 hover:shadow-md cursor-pointer relative`}
    >
      <button
        onClick={() => onToggleFavorite(product.id)}
        className="absolute top-4 right-2 mx-2"
        aria-label={isFavorite ? "Remove Favorite" : "Add to Favorite"}
      >
        {isFavorite ? (
          <HeartFill className="w-6 h-6 text-red-500 mt-2" />
        ) : (
          <Heart className="w-6 h-6 text-gray-400 mt-2" />
        )}
      </button>
      <div className="relative mb-2 h-[150px] w-[150px] flex items-center justify-center">
        {!imgLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        )}
        <img
          src={product.thumbnail}
          alt={product.name}
          className={`h-[150px] w-[150px] object-cover rounded transition-opacity duration-300 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
      </div>
      <div className="flex flex-col mr-2 flex-1 gap-3">
        <h2 className="text-lg font-medium mr-2 flex flex-wrap pr-2 max-w-[200px]">
          {product.title}
        </h2>
        <p>${product.price}</p>
        <p className="bg-gray-400 py-1 px-2 text-xs rounded-md w-min text-white">
          {product.category}
        </p>
        <p>⭐ {product.rating}</p>
      </div>
    </div>
  );
});

export default Card;