"use client";

import ChooseCanteen from "@/containers/ChooseCanteen";
import MenuShowUp from "@/containers/MenuShowUp";
import { useEffect, useState } from "react";

interface Canteen {
  id: string;
  name: string;
}

export default function Page() {
  const [canteen, setCanteen] = useState<Canteen | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedCanteen = window.localStorage.getItem("canteen");
    if (storedCanteen) {
      const parsedCanteen = JSON.parse(storedCanteen);
      setCanteen(parsedCanteen);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex justify-center w-full md:w-[80%] h-[calc(100vh-4rem)] overflow-auto">
      {isLoading && (
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      )}

      {!canteen && !isLoading ? (
        <ChooseCanteen />
      ) : canteen ? (
        <MenuShowUp canteenName={canteen.name}  />
      ) : null}
    </div>
  );
}
