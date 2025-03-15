import { BiSearch } from "react-icons/bi";

function SearchBar({ label }: { label: string }) {
  return (
    <div className="bg-light-50 border-light-300 flex items-center gap-2 rounded-md border px-3 py-2">
      <BiSearch size={16} color="#99a1af" />
      <input
        type="text"
        placeholder={label}
        className="w-full text-[14px] outline-none"
      />
      {/* <button className="hover:bg-light-300 bg-light-200 cursor-pointer rounded-md p-2">
        <IoEnter />
      </button> */}
    </div>
  );
}

export default SearchBar;
