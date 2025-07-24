import { HeartIcon as Heart } from "@heroicons/react/24/outline";

export default function ProductSkeleton() {
  return (
    <div className="border rounded-xl p-4 shadow min-w-[300px] h-[250px] relative animate-pulse flex flex gap-2 min-w-[300px] h-[250px] border rounded-xl p-4 shadow flex gap-2 hover:shadow-md cursor-pointer relative">
      <Heart className="absolute top-3 right-2 text-gray-400 rounded-full w-6 h-6 mt-3 mr-2" />
      <div className="bg-gray-300 rounded h-[150px] w-[150px] mb-2 mx-auto" />
      <div className="flex flex-col gap-2 flex-1 align-left">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
}