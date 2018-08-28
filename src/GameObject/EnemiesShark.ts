import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import { EnemiesManager } from "./EnemiesManager";

export class EnemiesShark extends EnemiesBase {

	enemiesManager: EnemiesManager;
	aTime: number = 0;
	mTime: number = 60;
	constructor(game: Game, player: PlayerClass, posX: number, posY: number, EM: any) {
		super(game, player, "enemyC", posX, posY, 50);
		this.enemiesManager = EM;
	}

	update() {
		this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -2)
		this.sprite.x += this.fn_MMN(3, 0, this.game.camera.x - this.sprite.x + 700);
		this.aTime -= 1;
		if (this.aTime < 0){
			this.aTime = this.mTime;
			this.enemiesManager.addEnemy(Math.random()*4,this.sprite.x,this.sprite.y);
		}
	}

	fn_MMN(x: number, y: number, z: number = - y) {//ｘを最小ｙ、最大ｚにする
		x = Math.max(Math.min(x, z), y);
		return x;
	}

    delete() {
		
    }
}