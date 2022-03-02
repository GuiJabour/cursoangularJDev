import { Profissao } from './profissao';
import { Telefone } from './telefone';
export class User {


    id!: Number;
    login!: String;
    nome!: String;
    senha!: String;
    cpf!:  string;
    dataNascimento!: String;
    salario!: DoubleRange;
    profissao: Profissao = new Profissao();
    telefones!: Array<Telefone>;

}
