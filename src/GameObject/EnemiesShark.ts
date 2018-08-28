import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export class EnemiesShark extends EnemiesBase {
	constructor(game: Game, player: PlayerClass, posX: number, posY: number) {
		super(game, player, "enemyC", posX, posY, 20);
	}

	update() {
		this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -2)
		this.sprite.x += this.fn_MMN(3, 0, this.game.camera.x - this.sprite.x + 700);
	}

	fn_MMN(x: number, y: number, z: number = - y) {//ｘを最小ｙ、最大ｚにする
		x = Math.max(Math.min(x, z), y);
		return x;
	}
}