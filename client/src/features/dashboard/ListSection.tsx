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
        className={`max-h-[335px] bg-gray-100 rounded-lg overflow-hidden ${className}`}
      >
        {children}
      </div>
    </ListSectionContext.Provider>
  );
}

function Header({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="sticky top-0 h-14 mx-3 flex items-center justify-between border-b border-dashed border-gray-400 z-10 bg-gray-100">
      <span className="font-medium text-gray-900">{label}</span>
      {children}
    </div>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <div className="h-[calc(330px-56px)] overflow-y-auto py-2 mx-2 text-gray-700 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ">
      {children}
    </div>
  );
}

ListSection.Header = Header;
ListSection.List = List;

export default ListSection;
