import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  constructor(private router: Router, private firestore: AngularFirestore) {}

  ngOnInit(): void {}

  async newGame() {
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJson())
      .then((gameInfo) => {
        // console.log(gameInfo);
        this.router.navigateByUrl('game/' + gameInfo.id);
      });
  }
}
