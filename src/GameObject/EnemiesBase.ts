import {  Sprite, Game } from "phaser-ce";
import { Vector2 } from "../base/Mass";
import { PlayerClass } from "./PlayerClass";

export class EnemiesBase{
    private sprite:Phaser.Sprite;
    private life:number;
    private Pos:Vector2;
    private MoveMode:number;
    private game: Game;
	private player:PlayerClass;

    constructor(game: Game,player: PlayerClass){
        this.game = game;
        this.player = player;
    }

    update(){
        /*
        if(this.game.physics.arcade.overlap(this.player.mySprite, this.sprite,this.addDamage,null,this )){
            this.addDamage();
        }*/
        this.game.physics.arcade.overlap(this.player.mySprite, this.sprite,this.addDamage,null,this )
    }

    start(spriteName: string , PositionX: number = this.game.width, PositionY: number = this.game.height / 2){
        this.Pos = {x:PositionX,y:PositionY}
        this.sprite = this.game.add.sprite(this.Pos.x, this.Pos.y, spriteName);
        
        
        this.sprite.smoothed = false;
		this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.set(2, 2);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.physics.arcade.enable(this.player);

        this.game.physics.arcade.enable(this.sprite);
        
        this.sprite.scale.set(1, 1);


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

    getMoveMode(){
        return this.MoveMode;
    }

    setLife(LIFE: number){
        this.life = LIFE;
    }

    setMoveMode(MODE: number){
        this.MoveMode = MODE;
    }

    setPos(position:Vector2){
        this.Pos = position;
        this.sprite.x = this.Pos.x;
        this.sprite.y = this.Pos.y;
    }

    addDamage(/*player: Phaser.Sprite, sprite: Phaser.Sprite*/){
        //this.game.state.start('GameOverScene');
        console.log("DamageHit/EnemiesBace")
    }
}