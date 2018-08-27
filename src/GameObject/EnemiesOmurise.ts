import { Vector2 } from "../base/Mass";
export class EnemiesOmurise {
	
	private spriteName:string;
	private life:number;
	private moveMode:number;
	constructor(){
		this.spriteName = `enemyD`;
		this.life = 3;
		this.moveMode = 1;
	}

	posUpdate(Pos:Vector2 = {x:0,y:0}){
		Pos.x += 0.5;
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