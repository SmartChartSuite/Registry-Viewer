import {QuerySearchApiResponse} from "./case.record.api.response";
import {RegistrySchema} from "./registry.schema";

export interface SearchHistory{
  queryStr: string;
  searchResults?: QuerySearchApiResponse;
  registrySchema: RegistrySchema;
  isCancelled: boolean;
  errorReturned: boolean;
}
