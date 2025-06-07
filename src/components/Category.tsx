interface CategoryProps {
  icon?: React.ComponentType<{ className?: string }>;
  name: string;
  active: boolean;
  handleClick: () => void;
}

export default function Category({
  icon: Icon,
  name,
  active,
  handleClick,
}: CategoryProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center p-3 rounded-lg w-[13rem] h-[3rem] cursor-pointer border border-gray-200 hover:translate-y-[-0.25rem] transition-all duration-300 ease-in-out ${
        active ? "bg-blue-400 text-white" : "bg-white text-gray-700"
      }`}
      onClick={handleClick}
    >
      <div className="text-center flex gap-5">
        {Icon && <Icon className="text-[1.5rem]" />}
        <p className="font-semibold">{name}</p>
      </div>
    </div>
  );
}
