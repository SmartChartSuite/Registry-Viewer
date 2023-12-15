import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {EnvironmentHandlerService} from "./environment-handler.service";
import {RegistrySchema} from "../domain/registry.schema";

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  baseApiUrl: string;
  private registrySchemaList = new BehaviorSubject<RegistrySchema[]>(null);
  registrySchemaList$: Observable<RegistrySchema[]> = this.registrySchemaList.asObservable();

  private selectedRegistrySchema = new BehaviorSubject<RegistrySchema>(null);
  selectedRegistrySchema$: Observable<RegistrySchema> = this.selectedRegistrySchema.asObservable();

  setSelectedRegistrySchema(registrySchema: RegistrySchema){
    this.selectedRegistrySchema.next(registrySchema);
  }

  constructor(private http: HttpClient, private environmentHandler: EnvironmentHandlerService) {
    this.baseApiUrl = this.environmentHandler.getBaseApiURL();
  }

  getMetadata(): Observable<RegistrySchema[]> {

    return this.http.get(this.baseApiUrl + 'metadata').pipe(
      map((result: any) => {
          let registrySchemaList: RegistrySchema[] = result.metadatas.map(
            element => {
              let registrySchema: RegistrySchema = {
                description: element.name,
                name: element.name,
                tag: element.tag,
              };
              return registrySchema;
            });
          this.registrySchemaList.next(registrySchemaList);
          return registrySchemaList;
        }
      ),
    );
  };
}
