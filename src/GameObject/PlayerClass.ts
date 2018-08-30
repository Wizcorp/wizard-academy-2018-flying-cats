import TimesteppedScene from "../base/TimesteppedScene";
import { Game, Keyboard } from "phaser-ce";
import { Vector2 } from "../base/Math";
import GameUi from "../GameObject/GameUi";

export class PlayerClass {

	private gameUi: GameUi;

	private _life: number;

	private damageReceivedTime: number;
	keyA: any;//key 移動WSADに対応。
	keyD: any;
	keyW: any;
	keyS: any;
	keyEsc: any;

	set life(life: number) {
		this._life = life;
	}

	get life(): number {
		return this._life;
	}

	private cursors: Phaser.CursorKeys;
	private keyboard: Phaser.Keyboard;

	private game: Game;
	public mySprite: Phaser.Sprite;

	private playerPosition: Vector2;

	get width(): number {
		return this.mySprite.width;
	}

	get height(): number {
		return this.mySprite.width;
	}

	constructor(game: Game) {
		this.game = game;
		this.playerPosition = { x: this.game.width / 2, y: this.game.height / 2 + 30 };
	}

	createPlayer(gameUi: GameUi) {

		this.gameUi = gameUi;

		this.mySprite = this.game.add.sprite(this.playerPosition.x, this.playerPosition.y, 'playerSprite');
		this.mySprite.smoothed = false;
		this.mySprite.anchor.set(0.5, 0.5);
		this.mySprite.scale.set(2, 2);

		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.playerPosition = { x: 100, y: this.game.height / 2 + 30 };

		const catAnimationSpeed: number = 6;
		this.mySprite.animations.add('wait', [0, 1, 2, 3], catAnimationSpeed, true);
		this.mySprite.animations.play('wait');

		this.life = 5;
		this.gameUi.setLifeImage(this.life);


		this.damageReceivedTime = new Date().getTime();//初期化

		//当たり判定		
		this.game.physics.arcade.enable(this.mySprite);

		this.keyA = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
		this.keyD = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
		this.keyW = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
		this.keyS = this.game.input.keyboard.addKey(Phaser.Keyboard.S);


	}

	update() {
		this.playerOperation();
		this.limitedPlayerMoveArea();

		//キャラ座標とカメラ座標からキャラの描画先を決める
		this.mySprite.x = this.playerPosition.x + this.game.camera.x;
		this.mySprite.y = this.playerPosition.y;
	}

	/**
 * プレイヤーの移動操作
 * キーの入力による座標移動や、攻撃など遊び手がplayerに対して介入する物を書く
 */
	playerOperation() {
		const moveSpeed: number = 7;

		if (this.cursors.left.isDown || this.keyA.isDown) {
			//console.log("左に移動");
			this.playerPosition.x -= moveSpeed;
		}
		else if (this.cursors.right.isDown || this.keyD.isDown) {
			//console.log("右に移動");
			this.playerPosition.x += moveSpeed;
		}

		if (this.cursors.up.isDown || this.keyW.isDown) {
			//console.log("上に移動");
			this.playerPosition.y -= moveSpeed;
		}
		else if (this.cursors.down.isDown || this.keyS.isDown) {
			//console.log("下に移動");
			this.playerPosition.y += moveSpeed;
		}
	}


	limitedPlayerMoveArea() {

		const { playerPosition, game } = this;

		const leftBoundary = this.width / 2;
		const rightBoundary = game.width - leftBoundary;
		const topBoundary = this.height / 2;
		const bottomBoundary = game.height - topBoundary;

		if (this.playerPosition.x < leftBoundary) {
			this.playerPosition.x = leftBoundary;
		}

		if (this.playerPosition.y < topBoundary) {
			this.playerPosition.y = topBoundary;
		}

		if (this.playerPosition.x > rightBoundary) {
			this.playerPosition.x = rightBoundary;
		}

		if (this.playerPosition.y > bottomBoundary) {
			this.playerPosition.y = bottomBoundary;
		}
	}

	changeLife() {
		const invincibleTime: number = 3000;
		const damageReceivedTimeDiff: number = new Date().getTime() - this.damageReceivedTime;

		if (damageReceivedTimeDiff > invincibleTime) {

			this.damageReceivedTime = new Date().getTime();

			this.life -= 1;
			this.gameUi.setLifeImage(this.life);

			if (this.life < 1) {
				this.game.state.start('GameOverScene');
			}

		} else {
			this.mySprite.alpha = 0.2;
			setTimeout(() => {
				this.mySprite.alpha = 1;
			}, invincibleTime);
		}
	}

}

