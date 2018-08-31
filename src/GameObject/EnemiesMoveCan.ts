import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import { Vector2 } from "../base/Math";
export class EnemiesMoveCan extends EnemiesBase {

	private speed: Vector2;
	constructor(game: Game, player: PlayerClass, EM: any, posX: number, posY: number, speedX: number, speedY: number, soundManager: any) {
		super(game, player, EM , "enemyAS", posX, posY, 2, soundManager);
		this.speed = { x: speedX, y: speedY };
	}

	update() {
		this.sprite.x += this.speed.x;
		this.sprite.y += this.speed.y;
	}
}