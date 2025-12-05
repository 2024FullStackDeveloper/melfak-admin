import {
  QueryClient,
  DefaultOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

export const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 60000,
  },
  mutations: {
    retry: false,
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T | null;
  errors?: Array<string>;
  validationErrors?: {
    identifier: string;
    errorMessage: string;
    errorCode: string;
    severity: number;
  }[];
  timestamp: string;
  path?: string;
};

export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
