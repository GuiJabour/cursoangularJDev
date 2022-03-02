import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from 'src/app/model/user';
import { Telefone } from 'src/app/model/telefone';
import { NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Profissao } from 'src/app/model/profissao';


@Injectable()
export class FormatDateAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if(value){
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;
  }
  toModel(date: NgbDateStruct | null): string | null {
    return date? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }

}


@Injectable()
export class FormataData extends NgbDateParserFormatter{

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {

    if(value){
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    return null;

    
  }
  format(date: NgbDateStruct | null): string {

    return date? validarData(date.day) + this.DELIMITER + validarData(date.month) + this.DELIMITER + date.year : '';
  }
  toModel(date: NgbDateStruct | null) : string | null {
    return date? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

function validarData(valor:any) {
  if(valor.toString !=='' && parseInt(valor) <= 9){
    return '0' + valor;
  }
  return valor;
}


@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormataData} ,
              {provide: NgbDateAdapter, useClass: FormatDateAdapter}]
})



export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  telefone = new Telefone();

  profissoes = new Array<Profissao>();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  ngOnInit() {

    this.userService.getProfissaoList().subscribe(data => {
      this.profissoes = data;
      console.log(this.profissoes);
    })


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
