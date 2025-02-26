import { Pessoa } from "../interfaces/pessoa";


 export class Aluno implements Pessoa {
    id: Number;
    nome: String;
    idade?: Number;
    dataNascimento: Date;
    dias: string[];
    autorizacaoDeImagem?: Boolean;
    iniciaisNome: String;
    sexo: String;

    constructor(nome: String, dataNascimento: Date, sexo: String ,autorizacaoDeImagem?: Boolean, diasDaSemana?: string[], id?: Number, iniciais?: String){
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.autorizacaoDeImagem = autorizacaoDeImagem;
        this.iniciaisNome = this.gerarIniciais(nome);
        this.sexo = sexo;
        this.dias = diasDaSemana;
        this.id = id;
        this.idade = this.calcularIdade(dataNascimento);
    }



    gerarIniciais(nome: String):String{
        let partes = nome.trim().split(/\s+/);
        if (partes.length < 2) {
            let inicialApenasUmNome = partes[0][0].toUpperCase();
            return inicialApenasUmNome;
        }
        let inicialPrimeiroNome = partes[0][0].toUpperCase();
        let inicialUltimoNome = partes [partes.length -1][0].toUpperCase();
        return  inicialPrimeiroNome + inicialUltimoNome;
    }

    calcularIdade(dataNascimento: Date): Number{
        const data = new Date();
        let idade = data.getFullYear() - dataNascimento.getFullYear();
        const mesAtual = data.getMonth();
        const mesNascimento = dataNascimento.getMonth();

        if(mesAtual < mesNascimento || (mesAtual === mesNascimento && data.getDate() < data.getDate())){
            idade--;
        }
        return idade;
    }


}