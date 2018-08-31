import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export class EnemiesOmurise extends EnemiesBase {

	private spriteName: string;
	constructor(game: Game, player: PlayerClass, EM: any, posX: number, posY: number, soundManager: any) {
		super(game, player, EM, "enemyD", posX, posY, 1, soundManager);
	}

	update() {
		this.sprite.x -= 0.5;
	}
}