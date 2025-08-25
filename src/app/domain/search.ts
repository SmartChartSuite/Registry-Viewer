import {SearchApiOptionsEnum} from "./search-api-options";
import {SearchTypeEnum} from "./search-type";

export interface Search {
  apiOption: SearchApiOptionsEnum,
  searchType: SearchTypeEnum,
  queryStr : string
}
