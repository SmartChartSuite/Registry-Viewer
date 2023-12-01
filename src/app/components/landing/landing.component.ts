import {Component, OnInit} from '@angular/core';
import {MetadataService} from "../../service/metadata.service";
import {RegistrySchema} from "../../domain/registry.schema";
import {UtilsService} from "../../service/utils.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  registrySchemaList: RegistrySchema[];
  selectedRegistrySchema: RegistrySchema;
  constructor(private metadataService: MetadataService, private utilsService: UtilsService, private router: Router){
  }
  ngOnInit(): void {
    this.metadataService.getMetadata().subscribe({
      next: value => {
        this.registrySchemaList = value;
        this.selectedRegistrySchema = value?.[0];
      },
      error: err => {
        console.error(err);
        this.utilsService.showErrorMessage("Server Error");
      }
    })
  }

  onSelectionChanged( registrySchema: any) {
    this.selectedRegistrySchema = registrySchema;
  }

  onContinue() {
    this.router.navigate(['case'], { queryParams: this.selectedRegistrySchema } );
  }
}
