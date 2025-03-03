import { createContext, ReactElement, ReactNode } from "react";

const ListSectionContext = createContext({});

function ListSection({
  children,
  className = "",
}: {
  children: ReactElement[];
  className?: string;
}) {
  return (
    <ListSectionContext.Provider value={{}}>
      <div
        className={`max-h-[358px] border border-light-400 bg-brand-50 text-brand-900 rounded-lg overflow-hidden ${className}`}
      >
        {children}
      </div>
    </ListSectionContext.Provider>
  );
}

function Header({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="sticky top-0 h-14 px-6 pt-6 pb-2 flex items-center justify-between z-10">
      <span className="font-medium">{label}</span>
      {children}
    </div>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <div className="h-[calc(358px-56px)] flex flex-col gap-3 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {children}
    </div>
  );
}

ListSection.Header = Header;
ListSection.List = List;

export default ListSection;
