import { BiSearch } from "react-icons/bi";
import { IoEnter } from "react-icons/io5";

function SearchBar() {
  return (
    <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-md">
      <BiSearch size={20} color="#99a1af" />
      <input type="search" className="outline-none text-[14px]" />
      <button className="bg-stone-50 p-2 cursor-pointer hover:bg-gray-400 rounded-md">
        <IoEnter />
      </button>
    </div>
  );
}

export default SearchBar;
