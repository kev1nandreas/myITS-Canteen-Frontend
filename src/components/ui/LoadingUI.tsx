import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full md:w-[80%] h-[calc(100vh-4rem)]">
      <FaSpinner className="animate-spin text-blue-500 text-lg mr-3" />
      Loading...
    </div>
  );
}
