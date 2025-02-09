import { Sheet, SheetContent } from "@/shared/ui/sheet";
import { useEffect, useState } from "react";

interface Peculiarity {
  peculiarityIcon: string;
  peculiarity: string;
}

interface Availabilities {
  availabilityIcon: string;
  availability: string;
}

export default function MapInfoSheet({
  item,
  onClose,
}: {
  item: any;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [side, setSide] = useState<"right" | "bottom">("right");

  useEffect(() => {
    if (item) {
      setIsOpen(true);
      setCurrentImageIndex(0);
    }
  }, [item]);

  useEffect(() => {
    if (!item || item.images.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
    }, 2200);

    return () => clearInterval(intervalId);
  }, [item]);

  useEffect(() => {
    const updateSide = () => {
      setSide(window.innerWidth <= 835 ? "bottom" : "right");
    };

    updateSide();
    window.addEventListener("resize", updateSide);

    return () => window.removeEventListener("resize", updateSide);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return item ? (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        className="min-w-[20rem] h-[400px] overflow-y-auto md:h-[480px] dg:h-full lg:min-w-[26.25rem] xl:min-w-[32rem]"
        side={side}
      >
        <img
          src={item.images[currentImageIndex]}
          alt={item.name}
          className="w-full h-[280px] rounded-lg object-cover"
        />
        <div className="pl-1.5">
          <h1 className="text-[#196dff] text-[20px] leading-6 font-semibold pt-5 pb-4">
            {item.name}
          </h1>
          <p className="text-[18px] leading-4 text-[#8a8a8a] mb-5">
            {item.type}
          </p>
          <div>
            <div className="flex items-center gap-x-2">
              <img src="/src/assets/images/icons/clock.svg" alt="clock icon" />
              <h3>Ish tartibi</h3>
            </div>
            <p className="pl-9 py-2">{item.coreHours}</p>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <img
                src="/src/assets/images/icons/location.svg"
                alt="location icon"
              />
              <h3 className="text-4 leading-4 font-medium">Manzil</h3>
            </div>
            <p className="pl-9 py-3">{item.address}</p>
          </div>
          {item?.contacts && (
            <div>
              <div className="flex items-center gap-x-2">
                <img
                  src="/src/assets/images/icons/contacts.svg"
                  alt="contacts logo"
                />
                <h3 className="text-4 leading-4 font-medium">Kontaktlar</h3>
              </div>
              <div>
                {item.contacts?.phoneNumbers && (
                  <ul className="pl-9 py-3 flex flex-col gap-y-1.5">
                    {item.contacts.phoneNumbers.map((v: string, i: number) => (
                      <li key={i}>
                        <a href={`tel:${v}`} rel="nofollow noreferrer">
                          {v}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {item.contacts?.webSite && (
                  <a
                    href={item.contacts.webSite.url}
                    className="underline text-[#196dff] pl-9"
                  >
                    {item.contacts.webSite.title}
                  </a>
                )}
                <ul className="flex items-center mt-6 gap-x-5 pl-9">
                  {item.contacts?.telegram && (
                    <li className="cursor-pointer w-[50px] h-[50px] bg-[#f6f6f6] items-center flex justify-center rounded-lg hover:bg-[#d5d4d4] transition-all duration-150">
                      <a
                        href={item.contacts.telegram.url}
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        <img src={item.contacts.telegram.icon} alt="telegram" />
                      </a>
                    </li>
                  )}
                  {item.contacts?.instagram && (
                    <li className="cursor-pointer w-[50px] h-[50px] bg-[#f6f6f6] items-center flex justify-center rounded-lg hover:bg-[#d5d4d4] transition-all duration-150">
                      <a
                        href={item.contacts.instagram.url}
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        <img
                          src={item.contacts.instagram.icon}
                          alt="telegram"
                        />
                      </a>
                    </li>
                  )}
                  {item.contacts?.ok && (
                    <li className="cursor-pointer w-[50px] h-[50px] bg-[#f6f6f6] items-center flex justify-center rounded-lg hover:bg-[#d5d4d4] transition-all duration-150">
                      <a
                        href={item.contacts.ok.url}
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        <img src={item.contacts.ok.icon} alt="telegram" />
                      </a>
                    </li>
                  )}
                  {item.contacts?.facebook && (
                    <li className="cursor-pointer w-[50px] h-[50px] bg-[#f6f6f6] items-center flex justify-center rounded-lg hover:bg-[#d5d4d4] transition-all duration-150">
                      <a
                        href={item.contacts.facebook.url}
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        <img src={item.contacts.facebook.icon} alt="telegram" />
                      </a>
                    </li>
                  )}
                  {item.contacts?.whatsapp && (
                    <li className="cursor-pointer w-[50px] h-[50px] bg-[#f6f6f6] items-center flex justify-center rounded-lg hover:bg-[#d5d4d4] transition-all duration-150">
                      <a
                        href={item.contacts.whatsapp.url}
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        <img src={item.contacts.whatsapp.icon} alt="telegram" />
                      </a>
                    </li>
                  )}
                  {item.contacts?.youtube && (
                    <li className="cursor-pointer w-[50px] h-[50px] bg-[#f6f6f6] items-center flex justify-center rounded-lg hover:bg-[#d5d4d4] transition-all duration-150">
                      <a
                        href={item.contacts.youtube.url}
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        <img src={item.contacts.youtube.icon} alt="telegram" />
                      </a>
                    </li>
                  )}
                  {item.contacts?.vk && (
                    <li className="cursor-pointer w-[50px] h-[50px] bg-[#f6f6f6] items-center flex justify-center rounded-lg hover:bg-[#d5d4d4] transition-all duration-150">
                      <a
                        href={item.contacts.vk.url}
                        target="_blank"
                        rel="nofollow noreferrer"
                      >
                        <img src={item.contacts.vk.icon} alt="telegram" />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
          <div className="mt-4">
            <h3 className="text-4 leading-5 font-medium">Xususiyatlari</h3>
            {item?.peculiarities && (
              <ul className="grid grid-cols-2 gap-y-4 pl-9 mt-3">
                {item.peculiarities.map((v: Peculiarity, i: number) => {
                  return (
                    <li key={i} className="flex items-center gap-x-3">
                      <span className="flex items-center justify-between bg-[#eee] p-1.5">
                        <img
                          src={v.peculiarityIcon}
                          alt={`${v.peculiarity} icon`}
                        />
                      </span>
                      <h4 className="truncate text-[14px] leading-4">
                        {v.peculiarity}
                      </h4>
                    </li>
                  );
                })}
              </ul>
            )}
            <p className="text-[#878787] text-[15px] pl-9 pt-5 leading-4">
              Yoqilg'i:{" "}
              <span className="text-black">
                {item.availableFuels.join(", ")}
              </span>
            </p>
          </div>
          <h3 className="text-4 leading-5 font-medium my-5">
            Boshqa xususiyatlar
          </h3>
          {item?.availabilities && (
            <ul className="grid grid-cols-2 gap-y-4 pl-9 mt-3">
              {item.availabilities.map((v: Availabilities, i: number) => {
                return (
                  <li key={i} className="flex items-center gap-x-3">
                    <span className="flex items-center justify-between bg-[#eee] p-1.5">
                      <img
                        src={v.availabilityIcon}
                        alt={`${v.availability} icon`}
                      />
                    </span>
                    <h4 className="truncate text-[14px] leading-4">
                      {v.availability}
                    </h4>
                  </li>
                );
              })}
            </ul>
          )}
          {item?.services && (
            <p className="text-[#878787] text-[15px] pl-9 pt-5 leading-4">
              Xizmatlar:{" "}
              <span className="text-black">{item.services.join(", ")}</span>
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  ) : null;
}
