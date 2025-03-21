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
        className={`border-light-400 bg-light-50 text-light-900 max-h-[358px] overflow-hidden rounded-lg border ${className}`}
      >
        {children}
      </div>
    </ListSectionContext.Provider>
  );
}

function Header({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="sticky top-0 z-10 flex h-14 items-center justify-between px-6 pt-6 pb-2">
      <span className="font-medium">{label}</span>
      {children}
    </div>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 flex h-[calc(358px-56px)] flex-col gap-3 overflow-y-auto p-6">
      {children}
    </div>
  );
}

ListSection.Header = Header;
ListSection.List = List;

export default ListSection;
