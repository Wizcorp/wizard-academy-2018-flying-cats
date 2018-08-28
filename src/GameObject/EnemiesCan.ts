import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export class EnemiesCan extends EnemiesBase {

	private spriteName: string;
	constructor(game: Game, player: PlayerClass, posX: number, posY: number) {
		super(game, player, "enemyA", posX, posY, 3);
	}

	update() {
		
	}
}