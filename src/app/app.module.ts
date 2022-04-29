import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './components/login/login.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AboutComponent} from './components/about/about.component';
import {CaseExplorerComponent} from './components/case-explorer/case-explorer.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {RegistryViewerComponent} from './components/registry-viewer/registry-viewer.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import {TestComponent} from './components/test/test.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { LabResultsComponent } from './components/registry-viewer/details-view/lab-results/lab-results.component';
import { DiagnosticsComponent } from './components/registry-viewer/details-view/diagnostics/diagnostics.component';
import { TreatmentComponent } from './components/registry-viewer/details-view/treatment/treatment.component';
import { OtherHistoryComponent } from './components/registry-viewer/details-view/other-history/other-history.component';
import { DemographicDataComponent } from './components/registry-viewer/demographic-data/demographic-data.component';
import { DetailsViewComponent } from './components/registry-viewer/details-view/details-view.component';
import { ChronologicalViewComponent } from './components/registry-viewer/chronological-view/chronological-view.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { SidePanelComponent } from './components/registry-viewer/side-panel/side-panel.component';
import { DetailsComponent } from './components/registry-viewer/side-panel/details/details.component';
import { FlagComponent } from './components/registry-viewer/side-panel/flag/flag.component';
import { AnnotationsComponent } from './components/registry-viewer/side-panel/annotations/annotations.component';
import {MatRadioModule} from "@angular/material/radio";
import {SidenavService} from "./service/sidenav.service";
import {MatMultiSortModule} from "ngx-mat-multi-sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AddRecordDialogComponent} from './components/registry-viewer/addRecordDialog/add-record-dialog.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    CaseExplorerComponent,
    RegistryViewerComponent,
    TestComponent,
    LabResultsComponent,
    DiagnosticsComponent,
    TreatmentComponent,
    OtherHistoryComponent,
    DemographicDataComponent,
    DetailsViewComponent,
    ChronologicalViewComponent,
    SidePanelComponent,
    DetailsComponent,
    FlagComponent,
    AnnotationsComponent,
    AddRecordDialogComponent,
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
        MatSnackBarModule
    ],
  providers: [SidenavService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
