
import { Vector2 } from "../base/Mass";
export class EnemiesPudding {
	
	private spriteName:string;
	private life:number;
	private moveMode:number;

	private angle:number;

	constructor(){
		this.spriteName = `enemyB`;
		this.life = 3;
		this.moveMode = 2;

		this.angle = 0;
	}

	posUpdate(Pos:Vector2 = {x:0,y:0}){
		this.angle += 0.02;
		Pos.y = 217 + Math.sin(this.angle)*150;
		return Pos;
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