import { MapPin } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import data from "@/data/data.json";
import { searchStore } from "@/search/store/searchStore";
import NotFound from "./errors/NotFound";

export default function Search() {
  const [query, setQuery] = useState<string>("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);
  const setChosenStation = searchStore((state: any) => state.setChosenStation);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filter = useMemo(() => {
    if (!query.trim()) return [];
    return data.filter((item) =>
      item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [query]);

  const handleSelect = (station: any) => {
    setChosenStation(station);
    if (!isDesktop) setQuery("");
  };

  return (
    <>
      <div className="max-w-[384px] bg-white">
        <div className="flex absolute z-30 top-3 left-3 items-center gap-2 rounded-2xl px-4 py-2 h-12 shadow-sm bg-[#f6f6f6] w-[290px] sm:w-[384px]">
          <MapPin
            className="text-red-500"
            size={20}
            aria-label="Location icon"
          />
          <input
            type="text"
            placeholder="Search by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow outline-none bg-transparent w-full"
            aria-label="Search input"
          />
        </div>

        {query && filter.length === 0 && <NotFound />}

        {(isDesktop || query) && (
          <ul className="absolute z-30 top-16 left-4 bg-white max-h-[900px] overflow-y-scroll">
            {filter.map((value) => {
              const { id, name, coreHours, images, address } = value;
              return (
                <li
                  onClick={() => handleSelect(value)}
                  key={id}
                  className="p-4 pb-5 border-b-[1px] border-b-[#eee] shadow-sm hover:bg-gray-100 flex justify-between cursor-pointer"
                >
                  <div className="max-w-[190px] sm:max-w-[272px]">
                    <h2 className="font-bold truncate">{name}</h2>
                    <p>{coreHours}</p>
                    <p className="truncate">{address}</p>
                  </div>
                  <div className="relative">
                    <img
                      className="w-[64px] h-[64px] rounded-[12px]"
                      src={images[0]}
                      alt={name}
                    />
                    <span className="absolute bottom-2 text-white text-center align-middle rounded-tr-md p-1 bg-black">
                      {images.length}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
