import { Game } from "phaser-ce";
import { Vector2 } from "../base/Mass";
import { PlayerClass } from "./PlayerClass";
export class EnemiesShark {
	
	private spriteName:string;
	private life:number;
	private moveMode:number;
	private player:PlayerClass;
	constructor(){
		this.spriteName = `enemyC`;
		this.life = 30;
		this.moveMode = 3;
	}

	posUpdate(Pos:Vector2 = {x:0,y:0},TarPos:Vector2 =  {x:0,y:0},game:Game){
		Pos.y += this.fn_MMN(TarPos.y - Pos.y,-2)
		Pos.x += this.fn_MMN(3,0,game.camera.x - Pos.x+600);
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

	fn_MMN(x:number,y:number,z:number = - y){//ｘを最小ｙ、最大ｚにする
		x = Math.max(Math.min(x,z),y);
		return x;
	}
}