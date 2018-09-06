import { Game } from "phaser-ce";
import EffectObjectManager from "./EffectObjectManager"

// Florian -- Good use of inheritance!
export default class EffectObject {

	protected game: Game;
	protected mainSprite: Phaser.Sprite;

	protected effectObjectManager: EffectObjectManager;

	protected createTime: number;
	protected lifespan: number;
	protected elapsedTime: number;

	constructor(game: Game, x: number, y: number, effectObjectManager: EffectObjectManager) {
		this.game = game;
		this.effectObjectManager = effectObjectManager;
		this.createTime = new Date().getTime();
		this.lifespan = 1000;
	}

	update() {
		this.elapsedTime = new Date().getTime() - this.createTime;
		if (this.elapsedTime > this.lifespan) {
			this.destroyOeder();
		}
	}

	destroyOeder() {
		// TODO Florian -- As we talked before, I'd rather pass `this`.
		this.effectObjectManager.destroyEffectObject(this);
	}

	destoryMyObjects(){

	}	
}