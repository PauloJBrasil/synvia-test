import { AxiosInstance } from "axios";
import { UseQueryOptions, useQuery } from "react-query";
import { isTruthy } from "../utils/validations";
import { api } from "../services/api";

type ReactQueryProps = {
    page?: number;
    currentFieldByOrder?: string | null;
    orderDirection?: "DESC" | "ASC" | null;
    take?: number;
  };

  export const formatQueryParams = (query?: { [key: string]: any }) => {
    if (query) {
      const formattedQuery = Object.keys(query).reduce((acc, key) => {
        if (isTruthy(query[key])) {
          if (Array.isArray(query[key])) {
            acc[key] = query[key].join(",");
          } else {
            acc[key] = query[key];
          }
        }
        return acc;
      }, {} as { [key: string]: any });
  
      return formattedQuery;
    }
  
    return {};
  };
  

export const useReactQuery = <T = unknown>(
    url: string,
    query?: ReactQueryProps & { [key: string]: any },
    fetchOptions?: UseQueryOptions<any> & { baseAPI?: AxiosInstance },
    cancel?: boolean
  ) => {
    const { baseAPI = api, ...options } = fetchOptions ?? {};
  
    const { page, currentFieldByOrder, orderDirection, take, ...rest } =
      query ?? {};
  
    const deps = [url, currentFieldByOrder, orderDirection, page, take, rest];
  
    const { data, isLoading, error, refetch, isFetching } = useQuery<T>(
      deps,
      async ({ signal }) => {
        if (cancel) return Promise.resolve({} as any);
        const { data } = await baseAPI.get(url, {
          params: {
            take: take ?? (page ? 10 : undefined),
            page,
            orderBy: currentFieldByOrder ?? undefined,
            direction: orderDirection ?? undefined,
            ...formatQueryParams(rest),
          },
          signal,
        });
        return data;
      },
      {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60 * 10, // 10 minutes
        ...options,
      }
    );
  
    return {
      response: data,
      isLoading,
      error: error as any,
      refetch,
      isFetching,
    };
    // return {
    //   response: {
    //     data: [] as any[],
    //     count: {
    //       COUNT: 0,
    //     },
    //   },
    //   isLoading: false,
    //   error: null,
    //   refetch: () => "",
    // };
  };
  