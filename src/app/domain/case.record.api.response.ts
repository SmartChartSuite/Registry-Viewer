import {CaseRecord} from "./case.record";

export class CaseRecordApiResponse {
  count: number;
  data: CaseRecord[];
}

export class QuerySearchApiResponse{
  // TODO append the modal with actual response data structure
  [key: string]: any;
  query: string;
  interpretation: string;
  images: any[];
  patients: any[];
}
