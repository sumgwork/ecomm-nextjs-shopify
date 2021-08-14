import { fetchApi } from "../utils";
import { ApiConfig } from "@common/types/api";

class Config {
  private config: any;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  getConfig(): ApiConfig {
    return this.config;
  }
}

const configWrapper = new Config({
  apiUrl: "http://localhost:4000/graphql",
  fetch: fetchApi,
});

export function getConfig() {
  return configWrapper.getConfig();
}
