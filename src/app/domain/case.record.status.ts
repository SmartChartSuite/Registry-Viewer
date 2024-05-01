export enum StatusCode {
  paused = 'paused',
  error = 'error',
  fatal = 'fatal',
  information = 'information'

}

export interface Status {
  code: StatusCode;
  lastUpdated: string;
  detail: string;
  createdDateTime: Date;
  activatedDateTime: string;
  lastSuccessfulDateTime: string;
  nextScheduledDateTime: string;
  caseStartedRunningDateTime: string;
}
