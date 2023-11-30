import {Annotation} from "./annotation";

export class ChronologicalCaseRecord {
  contentId: number;
  section: string;
  category: string;
  date: string;
  value: string;
  question: string;
  flag: string;
  details: any;
  annotation: Annotation [];
}
