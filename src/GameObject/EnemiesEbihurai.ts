import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export class EnemiesEbihurai extends EnemiesBase {

	private spriteName: string;
	constructor(game: Game, player: PlayerClass, posX: number, posY: number) {
		super(game, player, "enemyE", posX, posY, 3);
	}

	update() {
		this.sprite.x += 0.2;
	}
}