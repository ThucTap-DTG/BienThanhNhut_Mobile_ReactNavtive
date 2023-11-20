import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type PanigationContextType = {
  currentPage: number | undefined;
  itemsPerPage: number | undefined;
  total: number | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number | undefined>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number | undefined>>;
  setTotal: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const PaginationContext = createContext<PanigationContextType|undefined>(undefined);

export const PaginationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<number | undefined>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | undefined>(5);
  const [total, setTotal] = useState<number | undefined>(undefined);
  return (
    <PaginationContext.Provider
      value={{
        currentPage,
        itemsPerPage,
        total,
        setCurrentPage,
        setItemsPerPage,
        setTotal,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};
