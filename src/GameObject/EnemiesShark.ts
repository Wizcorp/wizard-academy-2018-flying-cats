import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import GameUi from "./GameUi"
export class EnemiesShark extends EnemiesBase {

	aTime: number = 0;
	mTime: number = 280;
	mode: number = 1;
	modeTime: number = 0;
	private gameUi: GameUi;
	constructor(game: Game, player: PlayerClass, EM: any, posX: number, posY: number, gu: GameUi) {
		super(game, player, EM, "enemyC", posX, posY, 80);
		this.gameUi = gu;
	}

	update() {
		this.aTime--;
		this.modeTime--;
		if (this.modeTime < 0) {
			this.modeTime = 350;
			this.mode++;
			if (this.mode > 11) {
				this.mode = 0;
			}
		}
		switch (this.mode) {
			case 0:
				if (this.aTime < 0) {
					this.aTime = this.mTime;
					this.EnemiesManager.addEnemy(3, this.sprite.x, this.sprite.y + 160);
					this.EnemiesManager.addEnemy(3, this.sprite.x, this.sprite.y - 160);
					this.EnemiesManager.addEnemy(3, this.sprite.x, this.sprite.y);
				}
				this.sprite.y += this.fn_MMN(this.game.height / 2 - this.sprite.y, -2);
				this.sprite.x += 0.2;
				break;
			case 2:
				if (this.aTime < 0) {
					this.aTime = 20;
					this.EnemiesManager.addEnemy(5, this.sprite.x, this.sprite.y, -5, 0);
				}
				this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -2);
				this.sprite.x += this.fn_MMN(3, -1, this.game.camera.x - this.sprite.x + 700);
				break;
			case 3:
				this.sprite.y -= 3;
				if (this.sprite.y < 0) {
					this.mode++;
				}
				break;
			case 4:
				this.sprite.y += 5;
				if (this.sprite.y > this.game.height) {
					this.mode++;
				}
				break;
			case 5:
				this.mode++;
				break;
			case 6:
				this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -2);
				this.sprite.x += this.fn_MMN(3, -1, this.game.camera.x - this.sprite.x + 700);
				if (this.aTime < 0) {
					this.aTime = 60;
					this.EnemiesManager.addEnemy(5, this.sprite.x, this.sprite.y, -2, -1);
					this.EnemiesManager.addEnemy(5, this.sprite.x, this.sprite.y, -2.4, -0.5);
					this.EnemiesManager.addEnemy(5, this.sprite.x, this.sprite.y, -3, 0);
					this.EnemiesManager.addEnemy(5, this.sprite.x, this.sprite.y, -2.4, 0.5);
					this.EnemiesManager.addEnemy(5, this.sprite.x, this.sprite.y, -2, 1);
				}
				break;
			case 8:
				if (this.aTime < 0) {
					this.aTime = 23;
					const h = this.game.height;
					let i = this.modeTime * 5;
					while (i > h) {
						i -= h;
					}
					i -= h / 2;
					this.EnemiesManager.addEnemy(3, this.sprite.x - Math.sqrt(Math.pow(h, 2) - Math.pow(i, 2)) / 3, this.sprite.y + i);
				}
				this.sprite.y += this.fn_MMN(this.game.height / 2 - this.sprite.y, -2);
				this.sprite.x += this.fn_MMN(3, -1, this.game.camera.x - this.sprite.x + 700);
				break;
			case 9:
				this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -2);
				this.sprite.x += this.fn_MMN(3, -1, this.game.camera.x - this.sprite.x + 700);
				break;
			case 10:
				this.sprite.x -= 10;
				if (this.player.mySprite.x > this.sprite.x) {
					this.mode++;
				}
				break;
			case 11:
				this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -0.3);
				this.sprite.x += this.fn_MMN(3, -1, this.game.camera.x - this.sprite.x + 700);
				break;
			default:
				break;
		}
	}

	fn_MMN(x: number, y: number, z: number = - y) {//ｘを最小ｙ、最大ｚにする
		x = Math.max(Math.min(x, z), y);
		return x;
	}

	delete() {
		this.game.state.start('GameOverScene');
	}

	addDamage() {
		this.life--;
		this.gameUi.setSharkLifeImage(this.life);
		if (this.life <= 0) {
			this.delete();
		}
	}
}