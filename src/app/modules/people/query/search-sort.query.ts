import { useDebounce } from "@/app/shared/hooks";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SORT = {
  ASC: "ASC",
  DESC: "DESC",
};

export const useSearchSortQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get("sort") || SORT.ASC;
  const isAscending = sortOrder === SORT.ASC;
  const [searchText, setSearchText] = useState(searchParams.get("search") || "")

  const onBtSort = useCallback(() => {
    searchParams.set("sort", isAscending ? SORT.DESC : SORT.ASC);
    setSearchParams(searchParams);
  }, []);

  const onSearch = useCallback((searchText: string) => {
    if (searchText) {
      searchParams.set("search", searchText);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  }, []);

  const debouncedSearch = useDebounce(onSearch);

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch(text);
  }

  return { onBtSort, handleSearch, sortOrder, searchText };
};
