export type MutationHookContext = {
  fetch: (input: any) => any;
};

export type MutationHook = {
  fetcher: () => any;
  useHook(context: MutationHookContext): (input: any) => any;
};
