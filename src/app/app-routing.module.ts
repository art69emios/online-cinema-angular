import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { BaseComponent } from './components/base/base.component';
import { CinemaDetailsComponent } from './components/cinema-details/cinema-details.component';
import { CinemaComponent } from './components/cinema/cinema.component';
import { ImportantComponent } from './components/important/important.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', component: BaseComponent},
  {path:'base', component: BaseComponent},
  {path:'cinema', component:CinemaComponent},
  {path:'cinema/:id', component: CinemaDetailsComponent},
  {path:'important', component:ImportantComponent},
  {path:'admin', canActivate: [AuthGuard], component:AdminComponent, },
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'**', component:BaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
