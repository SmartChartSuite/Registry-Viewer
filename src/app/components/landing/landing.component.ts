import {Component, OnInit} from '@angular/core';
import {MetadataService} from "../../service/metadata.service";
import {RegistrySchema} from "../../domain/registry.schema";
import {UtilsService} from "../../service/utils.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  registrySchemaList$: Observable<RegistrySchema[]>;
  selectedRegistrySchema: RegistrySchema;
  constructor(private metadataService: MetadataService, private utilsService: UtilsService, private router: Router){
  }
  ngOnInit(): void {
    this.registrySchemaList$ = this.metadataService.registrySchemaList$;
    this.metadataService.selectedRegistrySchema$.subscribe(schema=> this.selectedRegistrySchema = schema);
  }

  onSelectionChanged(registrySchema: RegistrySchema) {
    this.metadataService.setSelectedRegistrySchema(registrySchema);
  }

  onContinue() {
    this.router.navigate(['case'], { queryParams: {registrySchema: this.selectedRegistrySchema.tag}} );
  }
}
