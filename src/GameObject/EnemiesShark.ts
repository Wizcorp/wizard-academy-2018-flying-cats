import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import { EnemiesManager } from "./EnemiesManager";

export class EnemiesShark extends EnemiesBase {

	enemiesManager: EnemiesManager;
	aTime: number = 0;
	mTime: number = 8;
	mode: number = 0;
	modeTime: number = 0;
	constructor(game: Game, player: PlayerClass, posX: number, posY: number, EM: any) {
		super(game, player, "enemyC", posX, posY, 50);
		this.enemiesManager = EM;
	}

	update() {
		this.aTime--;
		this.modeTime--;
		if (this.modeTime < 0) {
			this.modeTime = 300;
			this.mode ++;
			if (this.mode >4){
				this.mode = 0;
			}
		}
		switch (this.mode){
			default:
				if (this.aTime < 0) {
					this.aTime = this.mTime;
					this.enemiesManager.addEnemy(3, this.sprite.x, this.sprite.y);
				}
				break;
			case 1:
				if (this.aTime < 0) {
					this.aTime = 30;
					this.enemiesManager.addEnemy(5, this.sprite.x, this.sprite.y);
				}
				this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -2)
				this.sprite.x += this.fn_MMN(3, 0, this.game.camera.x - this.sprite.x + 700);
				break;
			case 2:
					this.sprite.y -= 3;
					if (this.sprite.y < 0){
						this.mode ++;
					}
				break;
			case 3:
					this.sprite.y += 5;
					if (this.sprite.y > this.game.height){
						this.mode ++;
					}
				break;
			case 4:
				this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -2)
				this.sprite.x += this.fn_MMN(3, 0, this.game.camera.x - this.sprite.x + 700);
					break;
		}
	}

	fn_MMN(x: number, y: number, z: number = - y) {//ｘを最小ｙ、最大ｚにする
		x = Math.max(Math.min(x, z), y);
		return x;
	}

	delete() {
		this.game.state.start('GameScene');
	}
}