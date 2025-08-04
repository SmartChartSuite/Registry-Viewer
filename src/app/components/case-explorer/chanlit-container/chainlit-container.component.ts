import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-chanlit-container',
  imports: [],
  templateUrl: './chainlit-container.component.html',
  styleUrl: './chainlit-container.component.scss'
})
export class ChainlitContainerComponent implements OnInit {
  title = 'test-app';
  iframeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const url = 'http://localhost:8000/';
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
