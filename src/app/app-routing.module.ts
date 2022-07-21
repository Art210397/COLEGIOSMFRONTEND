import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Alumnos2Component } from './dashboard-components/alumnos2/alumnos2.component';
import { Apoderados2Component } from './dashboard-components/apoderados2/apoderados2.component';
import { DashboardComponent } from './dashboard-components/dashboard/dashboard.component';
import { HomeComponent } from './dashboard-components/home/home.component';
import { LoginComponent } from './dashboard-components/login/login.component';
import { LogsComponent } from './dashboard-components/logs/logs.component';
import { Matricula2Component } from './dashboard-components/matricula2/matricula2.component';

const routes: Routes = [
  {
    path: 'loginadm',
    component: LoginComponent,
  },

  {
    path: '',
    component: DashboardComponent,
    children: [
        {
            path: 'home',
            component: HomeComponent,
        },

        {
          path: 'alumno',
          component: Alumnos2Component,
        },

        {
          path: 'apoderado',
          component: Apoderados2Component,
        },

        {
          path: 'matricula',
          component: Matricula2Component,
        },

        {
          path: 'logs',
          component: LogsComponent
        }
    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
