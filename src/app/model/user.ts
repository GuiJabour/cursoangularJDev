import { Telefone } from './telefone';
export class User {


    id!: Number;
    login!: String;
    nome!: String;
    senha!: String;
    cpf!:  string;
    dataNascimento!: String;

    telefones!: Array<Telefone>;

}
