import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Questao {
  id: number
  mostrar: boolean,
  pergunta: string,
  alternativas: Array<number>,
  respostaEsperada: number,
  alternativaMarcada: number | null,
  alternativaMarcadaCheck: number | null
}

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss'
})
export class Quiz {

  listaQuiz: Array<Questao> = [
    {
      id: 1,
      mostrar: false,
      pergunta: "1. Qual o resultado da soma 2 + 2?",
      alternativas: [1, 2, 3, 4, 5],
      respostaEsperada: 4,
      alternativaMarcada: null,
      alternativaMarcadaCheck: null
    },
    {
      id: 2,
      mostrar: false,
      pergunta: "2. Qual o resultado da soma 2 + 1?",
      alternativas: [1, 2, 3, 4, 5],
      respostaEsperada: 3,
      alternativaMarcada: null,
      alternativaMarcadaCheck: null
    }]

  acertos: number = 0
  flagResultado: boolean = false;
  textoFinal1: string = "Parabéns"
  textoFInal2: string = "Voce acertou "

  ngOnInit(): void {
    this.listaQuiz[0].mostrar = true;
  }

  proxima(questao: Questao, index: number): void {
    if (questao.alternativaMarcada) {
      this.verificarALternativa(questao)

      if (index + 1 >= this.listaQuiz.length) {
        this.flagResultado = true
      } else {
        this.listaQuiz[index].mostrar = false
        this.listaQuiz[index + 1].mostrar = true
      }
    }
  }

  verificarALternativa(questao: Questao): void {
    if (questao.respostaEsperada === questao.alternativaMarcada
      && questao.alternativaMarcadaCheck !== questao.alternativaMarcada) {
      questao.alternativaMarcadaCheck = questao.alternativaMarcada
      this.acertos++;
    }
  }

  voltar(index: number): void {
    this.listaQuiz[index].mostrar = false;
    this.listaQuiz[index - 1].mostrar = true;
  }

  porcentagemAcertos(): string {
    const resultado = Math.round((this.acertos / this.listaQuiz.length) * 100);
    return `${resultado}%`
  }

  refresh() {
    window.location.reload();
  }

}
