import { MutationHook } from "@common/types/hooks";

export const handler: MutationHook = {
  fetcher: (input: any) => {
    return JSON.stringify(input) + "_MODIFIED";
  },
  useHook: ({ fetch }) => {
    const addItemFunction = (input: any) => {
      const response = fetch(input);
      return {
        output: response,
      };
    };

    return addItemFunction;
  },
};
