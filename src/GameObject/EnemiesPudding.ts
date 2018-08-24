
import { Vector2 } from "../base/Mass";
export class EnemiesPudding {
	
	private spriteName:string;
	private life:number;
	private moveMode:number;
	constructor(){
		this.spriteName = `enemyB`;
		this.life = 3;
		this.moveMode = 2;
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