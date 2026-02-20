"use client";

import { createContext, useState, ReactNode } from "react";
import { SearchContextType } from "./SearchContext.types";

export const SearchContext = createContext<SearchContextType | undefined>(
  undefined,
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
