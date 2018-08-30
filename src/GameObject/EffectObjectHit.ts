import EffectObject from "./EffectObject";
import EffectObjectManager from "./EffectObjectManager";

import { Game } from "phaser-ce";

export default class EffectObjectHit extends EffectObject {

	constructor(game: Game, x: number, y: number,effectObjectManager:EffectObjectManager) {
		super(game, x, y , effectObjectManager);
		this.game = game;
		this.mainSprite = this.game.add.sprite(x, y, "effectHit");
		this.mainSprite.smoothed = false;
		this.mainSprite.anchor.set(0.5, 0.5);
		this.mainSprite.scale.set(1, 1);
	}


	destroyOeder(){
		//配列を消しただけだとPhaserのオブジェクトは消えない。
		this.mainSprite.destroy();
	}

}