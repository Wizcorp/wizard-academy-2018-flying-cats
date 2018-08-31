import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import GameUi from "./GameUi"
import { SoundSystem } from "../soundManager";
import { multVectors } from "../base/Math";

export class EnemiesShark extends EnemiesBase {

	aTime: number = 0;
	mTime: number = 80;
	mode: number = 1;
	modeTime: number = 120;//表示されてからの待機時間
	dieTime: number = 0;
	dieSprite: Phaser.Sprite;
	beforeFlameEnable: boolean = false;
	private Music: SoundSystem;
	private gameUi: GameUi;
	constructor(game: Game, player: PlayerClass, EM: any, posX: number, posY: number, gu: GameUi, soundSystem: SoundSystem) {
		super(game, player, EM, "enemyC", posX, posY, 180, soundSystem);
		this.gameUi = gu;
		//this.game.camera.x = 8000;
		//music
		this.Music = soundSystem;
		this.Music.musicStart(3);//startに移動
	}

	update() {
		if (this.life <= 0) {
			this.dieAnimation();
		} else {
			this.bossMotion();
		}
		if (this.damageTime != 0) {
			if (this.damageTime < new Date().getTime()) {
				this.sprite.alpha = 1;
			} else {
				this.sprite.alpha = 0.7;
			}
		}
		if (this.enable){
			if (this.beforeFlameEnable == false){
				this.Music.musicStart(3);
				this.beforeFlameEnable = true;
			}
		}
		this.beforeFlameEnable = this.enable;
	}

	delete() {
		this.sprite.kill();
		this.dieSprite.kill();

		this.EnemiesManager.deleteEnemy(this.EnemiesManager.enemies.indexOf(this));
		this.game.state.start('GameOverScene', true, false, { isClear: true });
	}

	addDamage() {
		this.life--;
		this.gameUi.setSharkLifeImage(this.life);
		this.damageTime = new Date().getTime() + 200;
		this.Music.SE = 3;
		return true;
	}

	dieAnimation() {
		if (this.dieSprite == null) {
			this.dieSprite = this.game.add.sprite(this.sprite.x, this.sprite.y, "enemyCEnd");
			this.SoundSystem.SE = 4;
		}
		this.dieTime++;
		this.sprite.y += this.dieTime / 36;
		this.sprite.x -= this.dieTime / 100;
		this.dieSprite.x = this.sprite.x - 100;
		this.dieSprite.y = this.sprite.y - 75;
		if (this.sprite.y > this.game.height + 300) {
			this.delete();
		}
	}

	bossMotion() {
		this.aTime--;
		this.modeTime--;
		if (this.modeTime < 0) {
			this.modeTime = 380;//モード切替速度
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
					this.aTime = 20;
					const h = this.game.height;
					let i = this.modeTime * 1;
					while (i > h) {
						i -= h;
					}
					i -= h / 2;
					this.EnemiesManager.addEnemy(3, this.sprite.x + Math.sqrt(Math.pow(h / 2, 2) - Math.pow(i, 2)) / 3, this.sprite.y + i / 3);
				}
				this.sprite.y += this.fn_MMN(this.game.height / 2 - this.sprite.y, -2);
				this.sprite.x += this.fn_MMN(3, -1, this.game.camera.x - this.sprite.x + 700);
				break;
			case 9:
				this.sprite.y += this.fn_MMN(this.player.mySprite.y - this.sprite.y, -2);
				this.sprite.x += 0.3;
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
}