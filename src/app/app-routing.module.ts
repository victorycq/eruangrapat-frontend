import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RapatComponent } from './rapat/rapat.component';
import { PermohonanComponent } from './permohonan/permohonan.component';
import { PegawaiComponent } from './pegawai/pegawai.component';
import { RuanganComponent } from './ruangan/ruangan.component';
import { SkpdComponent } from './skpd/skpd.component';
import { RuanganDetailComponent } from './ruangan-detail/ruangan-detail.component';
import { RuanganEditComponent } from './ruangan-edit/ruangan-edit.component';
import { RuanganPinjamComponent } from './ruangan-pinjam/ruangan-pinjam.component';
import { RapatDetailComponent } from './rapat-detail/rapat-detail.component';
import { PermohonanDetailComponent } from './permohonan-detail/permohonan-detail.component';
import { SkpdTambahComponent } from './skpd-tambah/skpd-tambah.component';
import { RuanganAddComponent } from './ruangan-add/ruangan-add.component';
import { RapatEditComponent} from './rapat-edit/rapat-edit.component';
import { DialogVerifikasiTokenComponent } from './dialog-verifikasi-token/dialog-verifikasi-token.component';
import { DialogCalenderComponent } from './dialog-calender/dialog-calender.component';

const routes: Routes = [
  {  path: '', component: LoginComponent },
  {  path: 'home', component: HomeComponent },
  {  path: 'login', component: LoginComponent },
  {  path: 'register', component: RegisterComponent },
  {  path: 'rapat', component: RapatComponent },
  {  path: 'ruangan', component: RuanganComponent },
  {  path: 'permohonan', component: PermohonanComponent },
  {  path: 'pegawai', component: PegawaiComponent },
  {  path: 'skpd', component:SkpdComponent },
  {  path: 'detail/:id', component:RuanganDetailComponent },
  {  path: 'edit/:id', component:RuanganEditComponent },
  {  path: 'pinjam/:id', component:RuanganPinjamComponent },
  {  path: 'detailRapat/:id', component:RapatDetailComponent},
  {  path: 'detailPermohonan/:id', component:PermohonanDetailComponent},
  {  path: 'tambahSkpd', component: SkpdTambahComponent},
  {  path: 'tambahRuangan', component: RuanganAddComponent},
  {  path: 'editRapat/:id', component: RapatEditComponent},
  {  path: 'verifikasiToken', component: DialogVerifikasiTokenComponent},
  {  path: 'calender', component: DialogCalenderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
