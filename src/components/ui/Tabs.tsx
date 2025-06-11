interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function Tabs({ label, active, onClick }: TabProps) {
  return (
    <div
      className={`flex flex-col ${
        active ? "border-blue-500 border-b-2" : "border-transparent"
      } cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between p-3">
        <h2 className={`${active ? "text-black" : "text-black/50"}`}>
          {label}
        </h2>
      </div>
    </div>
  );
}
