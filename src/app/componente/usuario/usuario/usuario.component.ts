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

  students!: Observable<User[]>;
  nome!: String;
  p!: Number;
  total!: Number;

  ngOnInit() {
    this.usuarioService.getUsuarioList().subscribe(data => {
      this.students = data.content;
      this.total = data.totalElements;
      console.info('Total de elementos: ' + this.total);
    });

  }
  deleteUsuario(id: Number) {

    if (confirm('Deseja mesmo remover?')) {
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        console.log("Retorno do Método Delete: " + data)

        this.usuarioService.getUsuarioList().subscribe(data => {
          this.students = data;
        });

      });
    }

  }
  consultaUsuario() {
    this.usuarioService.consultaUsuarioPorNome(this.nome).subscribe(data => {
      this.students = data;
    });
  }
  
  /*
  carregarPagina(pagina){
    console.info(pagina);
  }
  */
  



}
