import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game = new Game();
  currentCard = '';

  constructor(private firestore: AngularFirestore, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.firestore
      .collection('games')
      .valueChanges()
      .subscribe((game) => {
        console.log('Game update', game);
      });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.players.length < 2) {
      alert('Bitte mindestens 2 Spieler einstellen!');
      return;
    }

    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {});

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) this.game.players.push(name);
    });
  }
}
