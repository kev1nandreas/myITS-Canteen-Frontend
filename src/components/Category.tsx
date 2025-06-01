interface CategoryProps {
    icon?: React.ComponentType<{ className?: string }>;
    name: string;
}

export default function Category({icon: Icon, name}: CategoryProps) {
  const handleClick = () => {};

  return (
    <div
      className="relative flex flex-col items-center justify-center p-3 rounded-lg w-[13rem] h-[3rem] cursor-pointer bg-white border border-gray-200 hover:translate-y-[-0.25rem] transition-all duration-300 ease-in-out"
      onClick={handleClick}
    >
      <div className="text-center flex gap-5 opacity-70">
        {Icon && <Icon className="text-[1.5rem]" />}
        <p className="font-semibold">{name}</p>
      </div>
    </div>
  );
}
