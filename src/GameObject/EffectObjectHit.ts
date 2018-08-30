import EffectObject from "./EffectObject";
import EffectObjectManager from "./EffectObjectManager";

import { Game } from "phaser-ce";
export default class EffectObjectHit extends EffectObject {

	constructor(game: Game, x: number, y: number, effectObjectManager: EffectObjectManager) {
		super(game, x, y, effectObjectManager);
		this.game = game;
		this.mainSprite = this.game.add.sprite(x, y, "effectHit");
		this.mainSprite.smoothed = false;

		this.mainSprite.anchor.set(0, 0.5);
		this.mainSprite.scale.set(0.2, 0.2);
		this.mainSprite.alpha = 0.4;
	}

	destroyOeder() {
		//配列を消しただけだとPhaserのオブジェクトは消えないので、自分のPhaserオブジェクトはすべて消すこと。
		this.mainSprite.destroy();
		super.destroyOeder();
	}
}