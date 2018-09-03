import EffectObject from "./EffectObject";
import EffectObjectHit from "./EffectObjectHit";
import { Game } from "phaser-ce";
import { EffectObjectType } from "../base/Enum";

export default class EffectObjectManager {

	private effectObjects: EffectObject[] = [];//自分が管理する物を開示しない。自分で管理するためprivateにする）
	//今後は外部に管理した結果を開示する関数やプロパティを作って拡張していく。

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

	destroyEffectObject(effect: EffectObject) {
		effect.destoryMyObjects();
		const index = this.effectObjects.indexOf(effect);
		console.assert(index !== -1);
		this.effectObjects.splice(index, 1);
	}

}

