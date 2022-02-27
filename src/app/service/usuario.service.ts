import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getUsuarioList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseURL);
  }
  getUsuarioId(id: Number): Observable<any> {
    return this.http.get<any>(AppConstants.baseURL + id);
  }

  deletarUsuario(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseURL + id, { responseType: 'text' })
  }
  consultaUsuarioPorNome(nome: String): Observable<any> {
    return this.http.get<any>(AppConstants.baseURL + 'usuarioPorNome/' + nome);
  }
  salvarUsuario(user: User): Observable<any> {
    return this.http.post<any>(AppConstants.baseURL, user);
  }
  atualizaUsuario(user: User): Observable<any> {
    return this.http.put<any>(AppConstants.baseURL, user);
  }
  removerTelefone(id: Number): Observable<any> {
    return this.http.delete(AppConstants.baseURL + 'removerTelefone/' + id, { responseType: 'text' });
  }

  userAutenticado() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }


}
