import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export class EnemiesCan extends EnemiesBase {

	constructor(game: Game, player: PlayerClass, EM: any, posX: number, posY: number, soundManager: any) {
		super(game, player,EM , "enemyA", posX, posY, 1, soundManager);
	}

	update() {

	}
}