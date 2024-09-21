import { Component } from '@angular/core';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-tik-tak-toe',
  standalone: true,
  imports: [],
  templateUrl: './tik-tak-toe.component.html',
  styleUrl: './tik-tak-toe.component.css'
})

export class TikTakToeComponent {
  SIZE : number = 3;
  board : State[][];


}

function initBoard(){

}

enum State{
  PLAYER_1 = 'X',
  PLAYER_2 = 'O',
  EMPTY = ''
};
