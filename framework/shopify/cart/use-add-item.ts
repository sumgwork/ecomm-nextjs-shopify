export const handler = {
  fetcher: () => {
    console.log("Fetching Data");
  },
  useHook: () => {
    const addItemFunction = (input: any) => {
      return {
        output: JSON.stringify(input) + "_MODIFIED",
      };
    };

    return addItemFunction;
  },
};
