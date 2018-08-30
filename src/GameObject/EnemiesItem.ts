//reinforcement item with enemiesManager system
//弾強化アイテムを敵と同じシステムで生成
import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import GameScene  from "../GameScene";
export class EnemiesItem extends EnemiesBase {

    private speed: number = 1;
    private gameScene: GameScene;
    constructor(game: Game, player: PlayerClass, EM: any, posX: number, posY: number, gameScene: GameScene) {
        super(game, player, EM, "ItemA", posX, posY, 1);
        this.gameScene = gameScene;
    }

    update() {
        this.sprite.x -= this.speed;
    }

	baseUpdate() {//todo:base
        this.game.physics.arcade.overlap(this.player.mySprite, this.sprite, this.bulletModeSet, null, this);
		if (this.game.camera.x > this.sprite.x) {
			this.delete();
		}
	}

    addDamage() {
        return false;
    }

    bulletModeSet(){
        this.gameScene.bulletModeNum = 1;
        this.delete();
    }
}