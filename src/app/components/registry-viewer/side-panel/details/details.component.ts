import {Component, OnInit} from '@angular/core';
import {DrawerService} from "../../../../service/drawer.service";
import {Observable} from "rxjs";
import { DatePipe } from '@angular/common';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CaseRecordsService} from "../../../../service/case-records.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor (private sidenavService: DrawerService,
               private datePipe: DatePipe,
               private sanitized: DomSanitizer,
               private caseRecordsService: CaseRecordsService) { }

  safeHtml: SafeHtml;

  details$: Observable<any>;

  htmlString: string;

  query: string;

  ignoreProperties: string[] = ['query', 'tableDisplayText', 'type'];

  formatKeyToString(key: string): string{
    // Nothing like regex without comments :-)
    // We do two operations here
    // 1. separate the camelCase from the keys -> camelCase -> camel Case
    // 2. convert the camel Case to Title Case -> camel Case -> Camel Case
     return key.replace(/([a-z])([A-Z])/g, '$1 $2')    // to split camel Case
      .toLowerCase().replace(/\w{3,}/g,                           // to Title String
      (match) => match.replace(/\w/, (m) => m.toUpperCase()))
  }

  highlightText(text : string, query: string): string{
    let re = new RegExp(query, 'gi')
    // Angular refused to apply class, so I had to go with style tage here. I wonder why.
    return text.replace(re, '<span style="background-color: #fff59d">' + query + '</span>')
  }


  ngOnInit(): void {
    this.details$ = this.caseRecordsService.selectedCaseRecord$;
    this.details$.subscribe({
      next: value => {
        this.query = value?.details?.query;
        this.htmlString = '';
        const details = value?.details;
        for (const key in details) {
          if(details[key] &&  this.ignoreProperties.indexOf(key) === -1){
            if(key === 'date' || key === 'startDate' || key === 'endDate'){
              // If we find dates we need to render them appropriately
              this.htmlString =
                this.htmlString
                + '<p>'
                + this.formatKeyToString(key)
                + ': '
                + this.datePipe.transform(details[key], 'mediumDate')
                + '</p>';
            }
            else if(this.query && key== 'noteText' && details['type'] === "DetailNote"){
              // If there is text we need to highlight this is where we do it.
              this.htmlString =
                this.htmlString
                + '<p>'
                +  this.formatKeyToString(key)
                + ': '
                + this.highlightText(details[key], this.query)
                + '</p>';
            }
            else {
              // The rest of it we just render as paragraphs.
              this.htmlString =
                this.htmlString
                + '<p>'
                +  this.formatKeyToString(key)
                + ': '
                + details[key]
                + '</p>';
            }
          }
        }
        this.safeHtml = this.sanitized.bypassSecurityTrustHtml(this.htmlString);
      }
    })
  }

}
