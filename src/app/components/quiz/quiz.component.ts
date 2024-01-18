import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ResultadoService } from 'src/app/services/resultado.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css', './quiz.component.responsive.css'],
})
export class QuizComponent implements OnInit {

  totalQuestion: number = 0;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: string = '';
  currentOptions: any[] = [];
  // contagem 
  homer: number = 0;
  marge: number = 0;
  lisa: number = 0;
  bart: number = 0;

  resultado: string = '';

  constructor(private dataService: DataService, private resultadoService: ResultadoService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.dataService.fetchData().subscribe((data: any) => {
      this.totalQuestion = data.questions.length;
      this.questions = data.questions;

      this.currentQuestion = this.questions[this.currentQuestionIndex].question;
      this.currentOptions = this.questions[this.currentQuestionIndex].options;

    })
  }

  respostaSelecionada(personagem: string) {
    if (personagem == 'Homer') {
      this.homer++;
    } else if (personagem == 'Marge') {
      this.marge++;
    } else if (personagem == 'Bart') {
      this.bart++;
    } else {
      this.lisa++;
    }

    this.currentQuestionIndex++;
    this.atualizarPergunta();
  }

  private atualizarPergunta() {
    if (this.currentQuestionIndex < this.totalQuestion) {
      this.currentQuestion = this.questions[this.currentQuestionIndex].question;
      this.currentOptions = this.questions[this.currentQuestionIndex].options;
    } else {
      this.resuladoFinal();
    }
  }

  private resuladoFinal() {
    const pontuacoes: { [key: string]: number } = {
      homer: this.homer,
      marge: this.marge,
      lisa: this.lisa,
      bart: this.bart,
    }

    const pontuacoesOrdenadas = Object.keys(pontuacoes).sort((a, b) => pontuacoes[b] - pontuacoes[a]);
    const pontuacaoVencedora = pontuacoes[pontuacoesOrdenadas[0]];
    // Encontrar todos os personagens com a pontuação mais alta
    const personagensEmpatados = pontuacoesOrdenadas.filter(personagem => pontuacoes[personagem] === pontuacaoVencedora);
    // Se houver empate, escolher aleatoriamente entre os personagens empatados
    const personagemVencedor = personagensEmpatados[Math.floor(Math.random() * personagensEmpatados.length)];

    this.resultado = personagemVencedor.charAt(0).toUpperCase() + personagemVencedor.slice(1);
    this.resultadoService.resultado = this.resultado;
  }

}
