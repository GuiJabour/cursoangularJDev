import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }

  students!: Array<User>;
  nome!: String;
  p!: number;
  total!: number;

  ngOnInit() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
      console.info('Total de elementos: ' + this.total);
    });

  }
  deleteUsuario(id: Number, index: any) {

    if (confirm('Deseja mesmo remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        //console.log("Retorno do Método Delete: " + data)

        this.students.splice(index, 1);

        //this.usuarioService.getUsuarioList().subscribe(data => {
        //  this.students = data;
        // });




      });
    }

  }
  consultaUsuario() {
    console.info(this.nome);

    if (this.nome === '') {
      this.usuarioService.getUsuarioList().subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
        console.info('Total de elementos: ' + this.total);
      });
    } else {
      this.usuarioService.consultaUsuarioPorNome(this.nome).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
      });
    }


  }


  carregarPagina(pagina: any) {
    console.info(pagina);


    if (this.nome !== '') {
      this.usuarioService.consultaUsuarioPorNomePorPage(this.nome, pagina - 1).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
        console.info('Total de elementos: ' + this.total);
      });
    } else {
      this.usuarioService.getUsuarioListPage(pagina - 1).subscribe(data => {
        this.students = data.content;
        this.total = data.totalElements;
        console.info('Total de elementos: ' + this.total);
      });
    }




  }





}
