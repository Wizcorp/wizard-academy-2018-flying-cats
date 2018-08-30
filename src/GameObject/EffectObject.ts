import { Game } from "phaser-ce";
import EffectObjectManager from "./EffectObjectManager"

export default class EffectObject {

	protected game: Game;
	protected mainSprite: Phaser.Sprite;

	protected effectObjectManager:EffectObjectManager;

	protected createTime: number;
	protected lifespan: number;
	protected elapsedTime: number;

	constructor(game: Game,x:number,y:number,effectObjectManager:EffectObjectManager) {
		this.game = game;
		this.effectObjectManager = effectObjectManager;
		this.createTime = new Date().getTime();
		this.lifespan = 1000;
	}

	create() {

	}

	update(){
//		console.log("いきてます！",this.elapsedTime);
		this.elapsedTime = new Date().getTime() - this.createTime;
		if (this.elapsedTime > this.lifespan){
			this.destroyOeder();
		}
	}

	destroyOeder(){
		this.effectObjectManager.destroy(this.effectObjectManager.effectObjects.indexOf(this));
	}
}