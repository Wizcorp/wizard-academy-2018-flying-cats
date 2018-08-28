import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export class EnemiesEbihurai extends EnemiesBase {

	private moveSpeed: number = 0.001;
	constructor(game: Game, player: PlayerClass, posX: number, posY: number) {
		super(game, player, "enemyE", posX, posY, 3);
	}

	update() {
		let x = this.player.mySprite.x - this.sprite.x;
		let y = this.player.mySprite.y - this.sprite.y;
		let s = this.moveSpeed / Math.sqrt(x^2 + y^2);
		this.sprite.x += x * s;
		this.sprite.y += y * s;
		this.sprite.angle = 45;
		//console.log(x,y,s);
	}

	fn_MMN(x: number, y: number, z: number = - y) {//ｘを最小ｙ、最大ｚにする
		x = Math.max(Math.min(x, z), y);
		return x;
	}
}