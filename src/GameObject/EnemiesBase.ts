import {  Sprite, Game } from "phaser-ce";
import { Vector2 } from "../base/Mass";

export class EnemiesBase{
    private sprite:Phaser.Sprite;
    private life:number;
    private Pos:Vector2;
    private mode:number;
    private game: Game;

    constructor(game: Game,){
        this.game = game;
    }

    update(){
        console.log("update");
    }

    start(spriteName: string = `enemyA` , PosX: number = this.game.width, PosY: number = this.game.height / 2){
        this.sprite = this.game.add.sprite(PosX, PosY, spriteName);
        
        
        this.sprite.smoothed = false;
		this.sprite.anchor.set(0.5, 0.5);
		this.sprite.scale.set(2, 2);

        //this.EnemieMode = EM;
        //this.life = life;
    }

    getLife(){
        return this.life;
    }

    getPos(){
        return this.Pos;
    }

    getSprite(){
        return this.sprite;
    }

    getMode(){
        return this.mode;
    }
}