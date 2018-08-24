import {  Sprite, Game } from "phaser-ce";
import { Vector2 } from "../base/Mass";

export class EnemiesBase{
    private sprite:Phaser.Sprite;
    private life:number;
    private Pos:Vector2;
    private EnemieMode:number;
    private game: Game;

    constructor(game: Game,){
        this.game = game;
    }

    update(){
        console.log("update");
    }

    start(spriteName: string = `enemyA` , PosX: number = this.game.width, PosY: number = this.game.height / 2){
        /*
        switch(EM){
            case 1:
                this.spriteName = `enemyA`;
                break;
            case 2:
                this.spriteName = `enemyB`;
                break;
        }*/
        this.sprite = this.game.add.sprite(PosX, PosY, spriteName);
        
        
        this.sprite.smoothed = false;
		this.sprite.anchor.set(0.5, 0.5);
		this.sprite.scale.set(2, 2);

        //this.EnemieMode = EM;
        //this.life = life;
    }
}