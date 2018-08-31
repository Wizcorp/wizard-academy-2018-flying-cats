import EffectObject from "./EffectObject";
import EffectObjectManager from "./EffectObjectManager";

import { Game } from "phaser-ce";


export default class EffectObjectHit extends EffectObject {

	private randomArea: number;

	constructor(game: Game, x: number, y: number, effectObjectManager: EffectObjectManager) {
		super(game, x, y, effectObjectManager);
		this.game = game;

		this.randomArea = 5;

		this.mainSprite = this.game.add.sprite(x + (Math.random() * this.randomArea), y + (Math.random() * this.randomArea), "bomb");
		this.mainSprite.smoothed = false;

		this.mainSprite.anchor.set(0, 0.5);
		//this.mainSprite.scale.set(0.2, 0.2);
		this.mainSprite.alpha = 0.8;

		const animationSpeed: number = 18;
		this.mainSprite.animations.add('normal', [0, 1, 2, 3, 4], animationSpeed, true);
		this.mainSprite.animations.play('normal');

	}

	update(){
		this.mainSprite.x += 3.5;
		super.update();
	}
	destroyOeder() {
		//配列を消しただけだとPhaserのオブジェクトは消えないので、自分のPhaserオブジェクトはすべて消すこと。
		// TODO Florian -- そういえば、基本は作ったオブジェックとに消える機能の責任も渡します。
		this.mainSprite.destroy();
		super.destroyOeder();
	}
}