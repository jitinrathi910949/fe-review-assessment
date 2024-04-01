import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const usePaginationQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const count = searchParams.get('count') || '10';
  
  const onBtPaginate = useCallback((offset: number) => {
    searchParams.set("offset", String(offset));
    setSearchParams(searchParams);
  }, []);

  const handleCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVal = event.target.value;
    searchParams.set("count", selectedVal);
    setSearchParams(searchParams);
  };

  return { count, onBtPaginate, handleCountChange };
};
