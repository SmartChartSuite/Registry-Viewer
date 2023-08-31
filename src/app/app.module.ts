import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";

import {MatToolbarModule} from "@angular/material/toolbar";
import {AboutComponent} from './components/about/about.component';
import {CaseExplorerComponent} from './components/case-explorer/case-explorer.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSortModule} from "@angular/material/sort";
import {RegistryViewerComponent} from './components/registry-viewer/registry-viewer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { DemographicDataComponent } from './components/registry-viewer/demographic-data/demographic-data.component';
import { SummaryViewComponent } from './components/registry-viewer/summary-view/summary-view.component';
import { ChronologicalViewComponent } from './components/registry-viewer/chronological-view/chronological-view.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { SidePanelComponent } from './components/registry-viewer/side-panel/side-panel.component';
import { DetailsComponent } from './components/registry-viewer/side-panel/details/details.component';
import { FlagComponent } from './components/registry-viewer/side-panel/flag/flag.component';
import { AnnotationsComponent } from './components/registry-viewer/side-panel/annotations/annotations.component';
import {DrawerService} from "./service/drawer.service";
import {MatMultiSortModule} from "ngx-mat-multi-sort";
import {AddRecordDialogComponent} from './components/registry-viewer/add-record-dialog/add-record-dialog.component';
import {DatePipe} from "@angular/common";
import { SectionComponent } from './components/registry-viewer/summary-view/section/section.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { ConformationDialogComponent } from './components/conformation-dialog/conformation-dialog.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    CaseExplorerComponent,
    RegistryViewerComponent,
    ChronologicalViewComponent,
    DemographicDataComponent,
    SummaryViewComponent,
    ChronologicalViewComponent,
    SidePanelComponent,
    DetailsComponent,
    FlagComponent,
    AnnotationsComponent,
    AddRecordDialogComponent,
    SectionComponent,
    ConformationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSortModule,
    HttpClientModule,

    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatExpansionModule,

    FormsModule,

    MatMultiSortModule,

    ScrollingModule,
    MatGridListModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  providers: [DrawerService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
