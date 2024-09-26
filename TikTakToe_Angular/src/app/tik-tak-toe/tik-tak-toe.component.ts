import { style } from '@angular/animations';
import { Component, NgModule, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-tik-tak-toe',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tik-tak-toe.component.html',
  styleUrl: './tik-tak-toe.component.css',
})
export class TikTakToeComponent {
  SIZE: number = 3;
  currentPlayer: number = 1;
  board: State[][] = Array(this.SIZE).fill(Array(this.SIZE).fill(State.EMPTY));
  Player_X: string = '❌';
  Player_O: string = '⭕';

  @ViewChild('board', { static: false }) container!: ElementRef;
  @ViewChild('content', { static: false }) content!: ElementRef;

  board_html!: HTMLElement;
  content_html!: HTMLElement;

  constructor() {}
  ngAfterViewInit() {
    this.board_html = this.container.nativeElement;
    this.content_html = this.content.nativeElement;
    this.initBoard();
  }

  // Hier soll für jedes Feld im Spielfeld ein Div erstellt werden

  initBoard() {
    console.log('initBoard');

    this.board.forEach((row: State[], rowIndex: number) => {
      row.forEach((cell: State, cell_index: number) => {
        const cellDiv = document.createElement('div');
        cellDiv.id = rowIndex + '|' + cell_index;
        cellDiv.className = 'cell';

        this.styleCells(cellDiv);

        cellDiv.addEventListener('click', () =>
          this.handleClick(rowIndex, cell_index, cellDiv)
        );

        this.board_html.appendChild(cellDiv);
        console.log(cellDiv);
      });
    });

    this.board_html.style.display = 'grid';
    this.board_html.style.gridTemplateColumns = 'repeat(3, auto)';
    this.content_html.style.display = 'inline-block';
  }

  handleClick(
    rowIndex: number,
    cellIndex: number,
    cellDiv: HTMLDivElement
  ): void {
    if (this.board[rowIndex][cellIndex] != State.EMPTY) {
      return;
    }
    cellDiv.innerText = this.currentPlayer == 1 ? this.Player_X : this.Player_O;
    this.board[rowIndex][cellIndex] =
      this.currentPlayer == 1 ? State.PLAYER_1 : State.PLAYER_2;

    this.checkForWin();
    this.currentPlayer = this.currentPlayer == 1 ? 2 : 1;
  }

  styleCells(cellDiv: HTMLDivElement) {
    cellDiv.style.width = '50px';
    cellDiv.style.height = '50px';
    cellDiv.style.border = '1px solid black';
    cellDiv.style.fontSize = 'small';
    cellDiv.style.backgroundColor = 'grey';
    cellDiv.style.alignItems = 'center';
    cellDiv.style.justifyContent = 'center';
  }

  checkForWin(): void {
    console.log('checkForWin');
    console.log(this.board);

    let currentPlayerState =
      this.currentPlayer == 1 ? State.PLAYER_1 : State.PLAYER_2;

    // Check rows
    for (let i = 0; i < this.SIZE; i++) {
      if (this.board[i].every((cell) => cell === currentPlayerState)) {
        this.printWinner();
        return;
      }
    }

    // Check columns
    for (let i = 0; i < this.SIZE; i++) {
      if (this.board.every((row) => row[i] === currentPlayerState)) {
        this.printWinner();
        return;
      }
    }

    // Check diagonal (top-left to bottom-right)
    if (this.board.every((row, index) => row[index] === currentPlayerState)) {
      this.printWinner();
      return;
    }

    // Check diagonal (top-right to bottom-left)
    if (
      this.board.every(
        (row, index) => row[this.SIZE - 1 - index] === currentPlayerState
      )
    ) {
      this.printWinner();
      return;
    }
  }

  printWinner() {
    console.log('Player ' + this.currentPlayer + ' has won!');
  }
}

enum State {
  PLAYER_1 = 'X',
  PLAYER_2 = 'O',
  EMPTY = '',
}
