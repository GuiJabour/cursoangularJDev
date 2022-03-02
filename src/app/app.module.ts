import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home/home.component'; /*Requisições Ajax*/
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor.service';

import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add.component';
import { GuardiaoGuardService } from './service/guardiao.guard.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const appRouters: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [GuardiaoGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'usuarioList', component: UsuarioComponent, canActivate: [GuardiaoGuardService] },
  { path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuardService] },
  { path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuardService] }
];



export const routes: ModuleWithProviders<any> = RouterModule.forRoot(appRouters);

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxPaginationModule,
    NgxMaskModule.forRoot(options),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
