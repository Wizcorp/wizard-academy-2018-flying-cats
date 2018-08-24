import TimesteppedScene from "../base/TimesteppedScene";
import { Game, Keyboard } from "phaser-ce";
import { Vector2 } from "../base/Mass";

export class PlayerClass {

	public playerSprite: Phaser.Sprite;
	private cursors: Phaser.CursorKeys;

	private game: Game;
	private mySprite: Phaser.Sprite;

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

	createPlayer() {

		this.mySprite = this.game.add.sprite(this.playerPosition.x, this.playerPosition.y, 'playerSprite');
		this.mySprite.smoothed = false;
		this.mySprite.anchor.set(0.5, 0.5);
		this.mySprite.scale.set(2, 2);

		this.cursors = this.game.input.keyboard.createCursorKeys();

		this.playerPosition = { x: this.game.width / 2, y: this.game.height / 2 + 30 };

		//console.log("createPlayer DONE");
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
		const moveSpeed = 20;

		if (this.cursors.left.isDown) {
			//console.log("左に移動");
			this.playerPosition.x -= moveSpeed;
		}
		else if (this.cursors.right.isDown) {
			//console.log("右に移動");
			this.playerPosition.x += moveSpeed;
		}

		if (this.cursors.up.isDown) {
			//console.log("上に移動");
			this.playerPosition.y -= moveSpeed;
		}
		else if (this.cursors.down.isDown) {
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
}

