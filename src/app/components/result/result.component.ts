import { Component, OnInit } from '@angular/core';
import { ResultadoService } from 'src/app/services/resultado.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  resultadoFinal: string = '';
  imagemPersonagem: string = '';

  constructor(private resultadoService: ResultadoService) { }

  ngOnInit(): void {
    this.resultadoFinal = this.resultadoService.resultado;
    this.imagemPersonagem = this.resultadoService.imagensPersonagens[this.resultadoFinal];
  }

}
