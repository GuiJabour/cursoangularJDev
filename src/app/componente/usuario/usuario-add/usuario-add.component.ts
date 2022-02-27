import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from 'src/app/model/user';
import { Telefone } from 'src/app/model/telefone';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  telefone = new Telefone();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {
    let id = this.routeActive.snapshot.paramMap.get('id');

    if (id != null) {
      this.userService.getUsuarioId(Number(id)).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  salvarUsuario() {
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null) { /* Atualizando ou editando */
      this.userService.atualizaUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info('User Atualizado!' + data);
        this.usuario = data;
      });
    } else {/* Salvando */
      this.userService.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info('Gravou User' + data);
        this.usuario = data;
      });
    }
  }

  addFone() {
    if (this.usuario.telefones === undefined) {
      this.usuario.telefones = new Array<Telefone>();
    }
    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

  novo() {
    this.usuario = new User();
    this.telefone = new Telefone();
  }

  deletarTelefone(id: number, i: number) {

    if (id === null) {
      this.usuario.telefones.splice(i, 1);
      return;
    }


    if (id != null && confirm('Deseja remover?')) {
      this.userService.removerTelefone(id).subscribe(data => {

        this.usuario.telefones.splice(i, 1);

      });
    }
  }

}
