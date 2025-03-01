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
        className={`max-h-[320px] bg-[#010400] text-[#FFFBFC] rounded-lg overflow-hidden ${className}`}
      >
        {children}
      </div>
    </ListSectionContext.Provider>
  );
}

function Header({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <div className="sticky top-0 h-14 mx-3 flex items-center justify-between border-b border-dashed border-gray-400 z-10 ">
      <span className="font-medium">{label}</span>
      {children}
    </div>
  );
}

function List({ children }: { children: ReactNode }) {
  return (
    <div className="h-[calc(330px-56px)] overflow-y-auto py-2 mx-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {children}
    </div>
  );
}

ListSection.Header = Header;
ListSection.List = List;

export default ListSection;
