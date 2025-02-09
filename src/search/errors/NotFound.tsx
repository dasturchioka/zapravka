import notfound from "../../../public/assets/images/icons/notfound.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-2 z-10 mt-16 absolute top-0.5 left-3 sm:left-3 bg-white p-4 shadow-md rounded-2xl w-[290px] sm:w-[384px]">
      <img src={notfound} alt="Not found" className="w-[245px] h-[115px]" />
      <h3 className="font-medium text-lg sm:text-xl text-black text-center">
        Hech narsa topilmadi.
      </h3>
      <p className="text-[#878787] font-light text-sm text-center">
        So'rov yoki masshtabni o'zgartirib ko'ring.
      </p>
    </div>
  );
}
