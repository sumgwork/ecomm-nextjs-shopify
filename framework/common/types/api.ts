export type Variables = { [key: string]: string | undefined };

export type ApiFetcherOptions = {
  url: string;
  query: string;
  variables?: Variables;
};

export type ApiFetcherResults<T> = {
  data: T;
};

export interface ApiConfig {
  apiUrl: string;
  fetch: ApiFetcher;
}

export interface ApiHooks {
  cart: {
    useAddItem: any;
  };
}

export type ApiFetcher<T> = (
  options: ApiFetcherOptions
) => Promise<ApiFetcherResults<T>>;

export interface ApiProviderContext {
  fetcher: ApiFetcher;
  hooks: ApiHooks;
}
