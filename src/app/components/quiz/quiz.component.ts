import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  totalQuestion: number  = 0;
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: string = '';
  currentOptions: any[] = [];
  // contagem 
  homer: number = 0;
  marge: number = 0;
  lisa: number = 0;
  bart: number = 0;

  resultado: string  = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.dataService.fetchData().subscribe((data: any) => {
      this.totalQuestion = data.questions.length;
      this.questions = data.questions;

      this.currentQuestion = this.questions[this.currentQuestionIndex].question;
      this.currentOptions = this.questions[this.currentQuestionIndex].options;
      console.log(this.currentOptions);

    })
  }

  respostaSelecionada(personagem: string) {
    const personagemSelecionado = personagem.toLowerCase;
    switch (personagem) {
      case 'homer':
        this.homer++;
        break;
      case 'marge':
        this.marge++;
        break;
      case 'bart':
        this.bart++;
        break;
      case 'lisa':
        this.lisa++;
        break;
    }
    
    console.log(personagem);
    this.currentQuestionIndex++;
    this.atualizarPergunta();
  }

  private atualizarPergunta(){
    if(this.currentQuestionIndex < this.totalQuestion){
      this.currentQuestion = this.questions[this.currentQuestionIndex].question;
      this.currentOptions = this.questions[this.currentQuestionIndex].options;
    }else{
      this.resuladoFinal();
    }
  }

  private resuladoFinal(){
    if (this.homer >= this.marge && this.homer >= this.lisa && this.homer >= this.bart) {
      this.resultado = 'Homer';
    } else if (this.marge >= this.homer && this.marge >= this.lisa && this.marge >= this.bart) {
      this.resultado = 'Marge';
    } else if (this.lisa >= this.homer && this.lisa >= this.marge && this.lisa >= this.bart) {
      this.resultado = 'Lisa';
    } else {
      this.resultado = 'Bart';
    }
  }

}
