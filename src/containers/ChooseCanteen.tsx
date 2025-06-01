import CanteenCard from "@/components/CanteenCard";
import { Typography } from "@/components/ui/Typography";
import { useFetchAllCanteen } from "@/services/api/hook/useCanteen";
import { typecastCanteenResponse } from "@/types/response";

export default function ChooseCanteen() {
  const { data, isLoading } = useFetchAllCanteen();
  const canteens = typecastCanteenResponse(data?.data) || [];

  return (
    <div className="flex flex-col items-center gap-10 w-full h-[calc(100vh-4rem)] overflow-auto p-[2rem]">
      <Typography text={"h5"} className="opacity-90">
        Pilih kantin yang terdekat dengan Anda
      </Typography>
      { isLoading && (
        <Typography text={"h6"} className="text-gray-500">
          Memuat daftar kantin...
        </Typography>
      )}
      <div className="flex justify-center flex-wrap gap-7 w-full max-w-[80rem]">
        {canteens?.map((canteen) => (
          <CanteenCard
            key={canteen.k_id}
            id={canteen.k_id}
            name={canteen.k_name}
            address={canteen.k_address}
          />
        ))}
      </div>
    </div>
  );
}
