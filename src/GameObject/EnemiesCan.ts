import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export class EnemiesCan extends EnemiesBase {

	constructor(game: Game, player: PlayerClass, posX: number, posY: number) {
		super(game, player, "enemyA", posX, posY, 1);
	}

	update() {

	}
}