import CanteenCard from "@/components/CanteenCard";
import { Typography } from "@/components/ui/Typography";

export default function ChooseCanteen() {
  return (
    <div className="flex flex-col items-center gap-10 w-full h-[calc(100vh-4rem)] overflow-auto p-[2rem]">
        <Typography text={"h5"} className="opacity-90">Pilih kantin yang terdekat dengan Anda</Typography>
        <div className="flex justify-center flex-wrap gap-7 w-full max-w-[80rem]">
          <CanteenCard id={"23"} name={"Kantin Informatika"} address={"Jl kenangan aww"} /> 
          <CanteenCard id={"23"} name={"Kantin Tekfis"} address={"Jl kenangan aww"} /> 
          <CanteenCard id={"23"} name={"Kantin Biologi"} address={"Jl kenangan aww"} /> 
          <CanteenCard id={"23"} name={"Kantin Matematika"} address={"Jl kenangan aww"} /> 
        </div>
    </div>
  );
}
