import { FaMinus, FaPlus } from "react-icons/fa";

export default function Counter({
  count,
  onIncrement,
  onDecrement,
}: {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="text-sm p-2 bg-red-500 text-white rounded-full hover:bg-red-600 duration-200 ease-in-out cursor-pointer"
        onClick={onDecrement}
      >
        <FaMinus />
      </button>
      <span className="text-xl font-semibold">{count}</span>
      <button
        className="text-sm p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 duration-200 ease-in-out cursor-pointer"
        onClick={onIncrement}
      >
        <FaPlus />
      </button>
    </div>
  );
}
