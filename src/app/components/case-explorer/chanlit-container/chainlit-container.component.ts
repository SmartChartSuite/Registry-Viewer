import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {EnvironmentHandlerService} from "../../../service/environment-handler.service";

@Component({
  selector: 'app-chanlit-container',
  imports: [],
  templateUrl: './chainlit-container.component.html',
  styleUrl: './chainlit-container.component.scss'
})
export class ChainlitContainerComponent implements OnInit {
  title = 'test-app';
  iframeUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private environmentHandlerService: EnvironmentHandlerService,) { }

  ngOnInit(): void {
    //TODO : remove hardcoded url
    const url = 'https://dev.heat.icl.gtri.org/impact-ai/';
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
