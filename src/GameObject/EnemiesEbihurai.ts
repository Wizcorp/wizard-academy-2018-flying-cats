import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import { Vector2, multVectors } from "../base/Math";
export class EnemiesEbihurai extends EnemiesBase {

	private moveSpeed: number = 1;
	constructor(game: Game, player: PlayerClass, EM: any, posX: number, posY: number, soundManager: any) {
		super(game, player, EM, "enemyE", posX, posY, 1, soundManager);
	}

	update() {
		let dir: Vector2 = {
			x: this.player.mySprite.x - this.sprite.x,
			y: this.player.mySprite.y - this.sprite.y
		}
		let l: number = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(-dir.y, 2));
		dir = multVectors(dir, this.moveSpeed / l);

		this.sprite.x += dir.x;
		this.sprite.y += dir.y;
		//console.log(Math.sin(dir.x / l)*2000);
		this.sprite.rotation = this.game.physics.arcade.angleBetween(this.sprite, this.player.mySprite) - 90;

		// console.log("rotation " + this.sprite.rotation);
		// console.log("angle " + this.sprite.angle);
	}

	// TODO Florian -- not used. Also, since you also have it in the Shark, you could create another module, or put it in EnemiesBase so that everyone has access.
	fn_MMN(x: number, y: number, z: number = - y) {//ｘを最小ｙ、最大ｚにする
		x = Math.max(Math.min(x, z), y);
		return x;
	}
}