import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  resultado: string = '';
  imagensPersonagens: {[personagem: string]: string} = {
    Homer: '../../assets/img/homer.webp',
    Marge: '../../assets/img/marge.webp',
    Lisa: '../../assets/img/lisa.webp',
    Bart: '../../assets/img/bart.webp',
  }
}
