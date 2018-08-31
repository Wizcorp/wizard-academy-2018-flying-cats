import EffectObject from "./EffectObject";
import EffectObjectHit from "./EffectObjectHit";
import { Game } from "phaser-ce";
import { EffectObjectType } from "../base/Enum";

export default class EffectObjectManager {

	public effectObjects: EffectObject[] = [];
	private game: Game;

	constructor(game: Game) {
		this.game = game;
	}

	update() {
		for (const effectObject of this.effectObjects) {
			effectObject.update();
		}
	}

	addEffect(x: number, y: number, type: EffectObjectType) {
		switch (type) {
			case EffectObjectType.hitEffect:
				this.effectObjects.push(new EffectObjectHit(this.game, x, y, this));
				break;
			case EffectObjectType.deathEffect:
				//未実装。勉強のために増やせる設計をイメージして作りました。
				//this.effectObjects.push(new EffectObject(this.game,x,y));
				break;
			case EffectObjectType.itemGetEffect:
				//未実装。勉強のために増やせる設計をイメージして作りました。
				//this.effectObjects.push(new EffectObject(this.game,x,y));
				break;
		}
	}

	//オブジェクトの参照が無くても番号で殺せるようにした
	destroy(index: number) {
		this.effectObjects.splice(index, 1);
	}
}

