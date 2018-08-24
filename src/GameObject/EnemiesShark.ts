
import { Vector2 } from "../base/Mass";
export class EnemiesShark {
	
	private spriteName:string;
	private life:number;
	private moveMode:number;
	constructor(){
		this.spriteName = `enemyC`;
		this.life = 30;
		this.moveMode = 3;
	}

	posUpdate(Pos:Vector2 = {x:0,y:0}){
        Pos.x += 1;
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