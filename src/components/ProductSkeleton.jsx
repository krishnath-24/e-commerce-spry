import { HeartIcon as Heart } from "@heroicons/react/24/outline";

export default function ProductSkeleton() {
  return (
    <div className="border rounded p-4 shadow w-[300px] relative animate-pulse flex flex gap-2">
      <Heart className="absolute top-2 right-2 text-gray-300 rounded-full w-6 h-6" />
      <div className="bg-gray-300 rounded w-[100px] h-[100px] mb-2 mx-auto" />
      <div className="flex flex-col gap-2 flex-1 align-left">
        <div className="h-5 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
}