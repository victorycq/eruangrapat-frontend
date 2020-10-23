import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgxWebstorageModule } from "ngx-webstorage";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  NbThemeModule,
  NbLayoutModule,
  NbSidebarModule,
  NbActionsModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbTooltipModule,
  NbCalendarModule,
  NbMenuModule,
  NbTreeGridModule,
  NbSelectModule,
  NbContextMenuModule,
  NbDatepickerModule,
  NbButtonModule,
  NbCheckboxModule,
  NbAccordionModule,
  NbListModule,
  NbWindowModule,
  NbDialogModule,
  NbStepperModule,
  NbToastrModule,
  NbAlertModule,
} from "@nebular/theme";
import { NbEvaIconsModule } from "@nebular/eva-icons";

import { RegisterComponent } from "./register/register.component";
import { RuanganComponent } from "./ruangan/ruangan.component";
import { RapatComponent } from "./rapat/rapat.component";
import { PermohonanComponent } from "./permohonan/permohonan.component";
import { SkpdComponent } from "./skpd/skpd.component";
import { PegawaiComponent } from "./pegawai/pegawai.component";
import { RuanganDetailComponent } from "./ruangan-detail/ruangan-detail.component";
import { RuanganPinjamComponent } from "./ruangan-pinjam/ruangan-pinjam.component";
import { RuanganEditComponent } from "./ruangan-edit/ruangan-edit.component";
import { RuanganAddComponent } from "./ruangan-add/ruangan-add.component";
import { TemplateDefaultComponent } from "./template-default/template-default.component";
import { RapatDetailComponent } from "./rapat-detail/rapat-detail.component";
import { PermohonanDetailComponent } from "./permohonan-detail/permohonan-detail.component";
import { SkpdTambahComponent } from "./skpd-tambah/skpd-tambah.component";
import { RapatEditComponent } from "./rapat-edit/rapat-edit.component";
import { DialogVerifikasiTokenComponent } from "./dialog-verifikasi-token/dialog-verifikasi-token.component";
import { config } from "rxjs";
import { DialogCalenderComponent } from "./dialog-calender/dialog-calender.component";

// const appRoutes: Routes = [
//   {  path: '', component: LoginComponent },
//   {  path: 'home', component: HomeComponent },
//   {  path: 'login', component: HomeComponent },
//   ];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    RuanganComponent,
    RapatComponent,
    PermohonanComponent,
    SkpdComponent,
    PegawaiComponent,
    RuanganDetailComponent,
    RuanganPinjamComponent,
    RuanganEditComponent,
    RuanganAddComponent,
    TemplateDefaultComponent,
    RapatDetailComponent,
    PermohonanDetailComponent,
    SkpdTambahComponent,
    RapatEditComponent,
    DialogVerifikasiTokenComponent,
    DialogCalenderComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // RouterModule.forRoot(appRoutes),
    NgxWebstorageModule.forRoot(),
    AngularFontAwesomeModule,
    NgbModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSidebarModule.forRoot(),
    NbActionsModule,
    BrowserAnimationsModule,
    NbInputModule,
    NbCardModule,
    NbTooltipModule,
    NbCalendarModule,
    NbMenuModule.forRoot(),
    NbTreeGridModule,
    NbSelectModule,
    NbCheckboxModule,
    NbButtonModule,
    NbContextMenuModule,
    NbAccordionModule,
    NbListModule,
    NbDatepickerModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule.forRoot(),
    NbStepperModule,
    NbToastrModule.forRoot(),
    NbAlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
