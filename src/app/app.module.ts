import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {AboutComponent} from './components/about/about.component';
import {CaseExplorerComponent} from './components/case-explorer/case-explorer.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSortModule} from "@angular/material/sort";
import {RegistryViewerComponent} from './components/registry-viewer/registry-viewer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from "@angular/material/core";
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
import {DatePipe, NgOptimizedImage} from "@angular/common";
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
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {DemoModeComponent} from "./components/demo-mode/demo-mode.component";
import {ConfigService} from "./service/config.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {APP_DATE_FORMATS, AppDateAdapter} from "./provider/format-datepicker"
import {MatMenuModule} from "@angular/material/menu";
import {MatDividerModule} from "@angular/material/divider";
import { LandingComponent } from './components/landing/landing.component';
import {MatRadioModule} from "@angular/material/radio";
import {OAuthModule} from "angular-oauth2-oidc";
import {authModuleConfig} from "../assets/config/auth-module-config";
import {LoginComponent} from "./components/login/login.component";

export const configFactory = (configService: ConfigService) => {
  return () => configService.loadConfig();
};


@NgModule({
  declarations: [
    AppComponent,
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
    DemoModeComponent,
    LandingComponent,
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
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDatepickerModule,
    NgOptimizedImage,
    MatTooltipModule,
    OAuthModule.forRoot(
      authModuleConfig
    ),
    MatMenuModule,
    MatDividerModule,
    MatRadioModule,
    LoginComponent
  ],
  providers: [
    DrawerService,
    DatePipe,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    {
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      deps: [ConfigService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
