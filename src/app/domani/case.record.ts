import {Status} from "./case.record.status";

export class CaseRecord {
  caseId: number;
  givenName: string;
  lastName: string;
  gender: string;
  dob: string;
  phone: string;
  state: string;
  status: Status;
  street: string;
  zip: string;
  city: string;
  initialReportDate: string;
}
