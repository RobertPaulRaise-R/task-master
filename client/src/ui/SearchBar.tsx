import { BiSearch } from "react-icons/bi";

function SearchBar({ label }: { label: string }) {
    return (
        <div className="bg-light-50 dark:bg-dark-900 border-light-300 dark:border-dark-950 flex items-center gap-2 rounded-md border px-3 py-2 ">
            <BiSearch size={16} className="text-light-600 dark:text-dark-50" />
            <input
                type="text"
                placeholder={label}
                className="w-full text-[14px] outline-none dark:text-dark-50 dark:placeholder:text-dark-50"
            />
        </div>
    );
}

export default SearchBar;
