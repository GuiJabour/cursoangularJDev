import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  login(usuario: { login: string; senha: string; }) {

    return this.http.post(AppConstants.baseLogin, JSON.stringify(usuario)).subscribe(data => {
      /*Retorno HTTP*/
      var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem('token', token);

      console.info(localStorage.getItem('token'));

      this.router.navigate(['home']);

    },
      error => {
        alert('Acesso Negado!');
      }
    );

  }
}
