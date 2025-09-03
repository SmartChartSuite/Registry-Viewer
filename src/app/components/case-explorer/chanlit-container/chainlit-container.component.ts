import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {EnvironmentHandlerService} from "../../../service/environment-handler.service";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-chanlit-container',
  imports: [],
  templateUrl: './chainlit-container.component.html',
  styleUrl: './chainlit-container.component.scss'
})
export class ChainlitContainerComponent implements OnInit {
  iframeUrl: SafeResourceUrl;
  chailitApiList = [{url: "http://localhost:8000/", name: "local" }, {url: "https://dev.heat.icl.gtri.org/impact-ai/", name: "dev" },]
  selectedChainlitApi = this.chailitApiList[0];

  constructor(private sanitizer: DomSanitizer, private environmentHandlerService: EnvironmentHandlerService,) { }

  ngOnInit(): void {
    //TODO : remove hardcoded url
    // const local = 'http://localhost:8000/';
    // const dev = 'https://dev.heat.icl.gtri.org/impact-ai/';
    // let url = local;

    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedChainlitApi.url);3
  }

}
