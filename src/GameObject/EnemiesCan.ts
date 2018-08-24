
import { Vector2 } from "../base/Mass";
export class EnemiesCan {
	
	private spriteName:string;
	private life:number;
	private moveMode:number;
	constructor(){
		this.spriteName = `enemyA`;
		this.life = 3;
		this.moveMode = 1;
	}

	posUpdate(Pos:Vector2 = {x:0,y:0}){
		let T: Vector2 = Pos;
		return T;
	}

	getSprite(){
		return this.spriteName;
	}

	getLife(){
		return this.life;
	}

	getMoveMode(){
		return this.moveMode;
	}
}