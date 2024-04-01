import { SetURLSearchParams } from "./../../../../../node_modules/react-router-dom/dist/index.d";
import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";

import { API_RESOURCE } from "@shared/constant";
import { useAxios } from "@shared/context";
import { Person } from "../model";
import { useSearchParams } from "react-router-dom";
import useIsMountedRef from "@/app/shared/hooks/use-mount-ref.hook";

interface PeopleQueryState {
  loading: boolean;
  data?: Person[];
  totalPage?: number;
  error?: AxiosError;
  currentOffset?: number;
  totalCount?: number;
}

export interface PeopleRequest {
  count: number;
  offset: number;
  sort ?: string;
  search?: string | null;
}

interface PeopleResponse {
  result: Person[];
  totalPage: number;
  offset: number;
  totalCount: number;
}


export const usePeopleQuery = (): PeopleQueryState => {
  const axios = useAxios();
  const [state, setState] = useState<PeopleQueryState>({ loading: false });

  const [searchParams] = useSearchParams();
  const isMounted = useIsMountedRef();
  const offset = searchParams.get("offset");
  const count = searchParams.get("count");
  const sort = searchParams.get('sort') || 'ASC';
  const searchText = searchParams.get('search');

  const fetchPeoples = async (params: PeopleRequest) => {
    try {
      const { data } = await axios.get<PeopleResponse>(
        `/${API_RESOURCE.PEOPLE}`,
        {
          params,
        }
      );
      const { result, totalPage, offset, totalCount } = data;
      // setTimeout(() => {
      //   setState({ data: [], loading: false, error: undefined });
      // }, 200);

      setState({
        data: result,
        totalPage,
        currentOffset: offset,
        loading: false,
        totalCount,
        error: undefined,
      });
    } catch (error) {
      setState({
        data: undefined,
        totalPage: 0,
        error: error as AxiosError,
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (isMounted.current || offset) {
      setState(prevState => ({ ...prevState, loading: true  }));

      // if (!state.loading && Number(offset) !== Number(state.currentOffset))
      fetchPeoples({
        count: Number(count) || 10,
        offset: Number(offset) || 1,
        sort,
        search: searchText
      });
    }
  }, [searchParams]);

  const value = useMemo(() => state, [state]);

  return value;
};
