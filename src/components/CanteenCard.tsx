interface CanteenCardProps {
  id: string;
  name: string;
  address: string;
}

export default function CanteenCard({ id, name, address }: CanteenCardProps) {
  const handleClick = () => {
    window.localStorage.setItem("canteen", JSON.stringify({ id, name }));
    window.location.replace("/");
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center p-4 rounded-lg shadow-md w-[30rem] h-[5rem] hover:translate-y-[-0.25rem] transition-all duration-300 ease-in-out cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 bg-[url('/Canteen/image.png')] bg-cover bg-center opacity-40 rounded-lg"
        aria-hidden="true"
      />
      <div className="relative z-10 text-center">
        <p className="text-xl opacity-60 font-semibold">{name}</p>
        <p className="opacity-60">{address}</p>
      </div>
    </div>
  );
}
