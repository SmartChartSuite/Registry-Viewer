export interface Status {
  severity: 'fatal' | 'error' | 'warning' | 'information' | 'active' | 'inactive';
  lastUpdated: string;
  information: string;
}
