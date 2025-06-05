interface CardDashboardProps {
  title: string;
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
  value: number | string;
  className?: string;
}

export default function CardDashboard({
  title,
  description,
  Icon,
  value,
  className = "",
}: CardDashboardProps) {
  return (
    <div
      className={`flex flex-col md:flex-row p-4 bg-white rounded-lg shadow-md w-[11rem] md:w-[15rem] items-center gap-5 text-white ${className}`}
    >
      <Icon className="text-4xl" />
      <div className="flex flex-col gap-2 justify-center text-sm">
        <h3>{title}</h3>
        <span className="text-xl font-bold text-clip">{value + " " + description}</span>
      </div>
    </div>
  );
}
