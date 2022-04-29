import {Component, OnDestroy, OnInit, Pipe, PipeTransform} from '@angular/core';
import {SidenavService} from "../../../../service/sidenav.service";
import {Observable} from "rxjs";
import { DatePipe } from '@angular/common';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor (private sidenavService: SidenavService, private datePipe: DatePipe, private sanitized: DomSanitizer) { }

  safeHtml: SafeHtml;

  details$: Observable<any>;

  htmlString: string;

  sanitizedHtml: any;

  query: string;

  ignoreProperties: string[] = ['query', 'tableDisplayText', 'type'];

  formatKeyToString(key: string): string{
     return key.replace(/([a-z])([A-Z])/g, '$1 $2')    // to split camel Case
      .toLowerCase().replace(/\w{3,}/g,                     // to Title String
      (match) => match.replace(/\w/, (m) => m.toUpperCase()))
  }

  highlightText(text : string, query: string): string{
    let re = new RegExp(query, 'gi')
    return text.replace(re, '<span style="background-color: #fff59d">' + query + '</span>')
  }


  ngOnInit(): void {
    this.details$ = this.sidenavService.data$;
    this.details$.subscribe({
      next: value => {
        this.query = value?.details?.query;
        this.htmlString = '';
        const details = value?.details;
        for (const key in details) {
          if(details[key] &&  this.ignoreProperties.indexOf(details[key]) === -1){
            if(key === 'date' || key === 'startDate' || key === 'endDate'){
              this.htmlString =
                this.htmlString
                + '<p>'
                + this.formatKeyToString(key)
                + ': '
                + this.datePipe.transform(details[key], 'mediumDate')
                + '</p>';
            }
            else if(this.query && key== 'noteText' && details['type'] === "DetailNote"){
              this.htmlString =
                this.htmlString
                + '<p>'
                +  this.formatKeyToString(key)
                + ': '
                + this.highlightText(details[key], this.query)
                + '</p>';
            }
            else {
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
