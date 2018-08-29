import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import { EnemiesManager } from "./EnemiesManager";
export default class EnemiesBase {
	public anable: Boolean = false;
	public sprite: Phaser.Sprite;
	public life: number;
	game: Game;
	player: PlayerClass;
	EnemiesManager: EnemiesManager;

	constructor(game: Game, player: PlayerClass, EM: EnemiesManager, spriteName: string, posX: number, posY: number, life: number) {
		this.game = game;
		this.player = player;
		this.sprite = this.game.add.sprite(posX, posY, spriteName);
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.smoothed = false;
		this.sprite.anchor.set(0.5, 0.5);
		this.sprite.scale.set(1, 1);
		this.life = life;
		this.anable = false;
		this.EnemiesManager = EM;
	}

	update() {
		//各enemy中のupdateがあればそちらを読む。例：EnemiesCan.update()
	}

	baseUpdate() {//todo:base
		this.game.physics.arcade.overlap(this.player.mySprite, this.sprite, this.player.changeLife.bind(this.player), null, this);
		if (this.game.camera.x > this.sprite.x) {
			this.addDamage();
		}
	}

	fixedUpdate(dt: number) {

	}

	addDamage() {//return score. if(return:-1){no }
		this.life--;
		if (this.life <= 0) {
			this.delete();
		}
		return true;
	}

	delete() {
		this.sprite.kill();
		//処理軽減のために倒した敵を配列から削除。
		//自分の番号がわからないのでライフからすべて検索。
		this.life = 0;
		for (let i = 0; i < this.EnemiesManager.enemies.length - 1 ; i++){
			if (this.EnemiesManager.enemies[i].life <= 0){
				this.EnemiesManager.enemies.splice(i , 1);
			}
		}
	}
}