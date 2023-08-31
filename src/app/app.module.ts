import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AboutComponent} from './components/about/about.component';
import {CaseExplorerComponent} from './components/case-explorer/case-explorer.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from "@angular/material/legacy-progress-spinner";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {HttpClientModule} from "@angular/common/http";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {RegistryViewerComponent} from './components/registry-viewer/registry-viewer.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import { DemographicDataComponent } from './components/registry-viewer/demographic-data/demographic-data.component';
import { SummaryViewComponent } from './components/registry-viewer/summary-view/summary-view.component';
import { ChronologicalViewComponent } from './components/registry-viewer/chronological-view/chronological-view.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";
import { SidePanelComponent } from './components/registry-viewer/side-panel/side-panel.component';
import { DetailsComponent } from './components/registry-viewer/side-panel/details/details.component';
import { FlagComponent } from './components/registry-viewer/side-panel/flag/flag.component';
import { AnnotationsComponent } from './components/registry-viewer/side-panel/annotations/annotations.component';
import {MatLegacyRadioModule as MatRadioModule} from "@angular/material/legacy-radio";
import {DrawerService} from "./service/drawer.service";
import {MatMultiSortModule} from "ngx-mat-multi-sort";
import {MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import {AddRecordDialogComponent} from './components/registry-viewer/add-record-dialog/add-record-dialog.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {DatePipe} from "@angular/common";
import { SectionComponent } from './components/registry-viewer/summary-view/section/section.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import { ConformationDialogComponent } from './components/conformation-dialog/conformation-dialog.component';


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
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        HttpClientModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatSelectModule,
        MatExpansionModule,
        MatSlideToggleModule,
        FormsModule,
        MatRadioModule,
        MatMultiSortModule,
        MatCheckboxModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        ScrollingModule
    ],
  providers: [DrawerService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
