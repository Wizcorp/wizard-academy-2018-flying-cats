import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export class EnemiesPudding extends EnemiesBase {

	private angle: number;

	constructor(game: Game, player: PlayerClass, EM: any, posX: number, posY: number) {
		super(game, player, EM, "enemyB", posX, posY, 1);
		this.angle = Math.random() * 100;
	}

	update() {
		this.angle += 0.02;
		this.sprite.y -= Math.sin(this.angle) * 0.5;
	}
}