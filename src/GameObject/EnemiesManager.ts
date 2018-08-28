
import {  Sprite, Game } from "phaser-ce";
import { EnemiesBase } from "./EnemiesBase";

import { EnemiesCan } from "./EnemiesCan";
import { EnemiesPudding } from "./EnemiesPudding";
import { EnemiesEbihurai } from "./EnemiesEbihurai";
import { EnemiesOmurise } from "./EnemiesOmurise";
import { EnemiesShark } from "./EnemiesShark";
import { PlayerClass } from "./PlayerClass";

import ITiledObject from "./ITiledObject";
export class EnemiesManager {
	public enemies: EnemiesBase[] = [];
	
	private Can: EnemiesCan;
	private Pudding: EnemiesPudding;
	private Ebihurai: EnemiesEbihurai;
	private Omurise: EnemiesOmurise;
	private Shark: EnemiesShark;

	private game: Game;
	private player: PlayerClass;
    
	constructor(game: Game,player: PlayerClass) {
		this.player = player;
        this.game = game;
	}

	init(){
        //this.enemies
	}

	preload() {
		//this.game.load.tilemap('ObjectMap', 'assets/maptest001Bb.json', null, Phaser.Tilemap.TILED_JSON);
	}

	create() {
		this.Can = new EnemiesCan();
		this.Pudding = new EnemiesPudding();
		this.Ebihurai = new EnemiesEbihurai();
		this.Omurise = new EnemiesOmurise();
		this.Shark = new EnemiesShark();
		//load the map
		const map = this.game.add.tilemap('map');
		//Read the objects
		const objectList = this.getObjectLayer(map,'enemy ');
		for(const object of objectList){
			let mode = 0;
			switch(object.name){
				case "can":
					mode = 0;
					break;
				case "purin":
					mode = 1;
					break
				case "omurice":
					mode = 2;
					break
				case "ebihurai":
					mode = 3;
					break
				case "shark":
					mode = 4;
					break
			}
			this.addEnemy(mode,object.x,object.y);
		}
    }

	public update(/*dt: number*/) {
        for (let i = 0; i < this.enemies.length; i++) {
			this.enemies[i].update();
			/*
            let enemy = this.enemies[i];
			enemy.update();
			switch(enemy.getMoveMode()){
				case 0:
					enemy.setPos(this.Can.posUpdate(enemy.getPos()));
					break;
				case 1:
					enemy.setPos(this.Pudding.posUpdate(enemy.getPos()));
					break;
				case 2:
					enemy.setPos(this.Can.posUpdate(enemy.getPos()));
					break;
				case 3:
					enemy.setPos(this.Can.posUpdate(enemy.getPos()));
					break;
				case 4:
					enemy.setPos(this.Shark.posUpdate(enemy.getPos(),this.player.getPlayerPosition(),this.game));
					break;
			}*/
		}
	}
    
    addEnemy(mode:number = 0,x:number,y:number) {
		this.enemies.push(new EnemiesBase(this.game,this.player));
		let spriteName: string = "enemyA";
        switch(mode){
			case 0:
				spriteName = this.Can.getSprite();
				this.enemies[this.enemies.length - 1].setLife(this.Can.getLife())
				this.enemies[this.enemies.length - 1].setMoveMode(this.Can.getMoveMode())
                break;
            case 1:
				spriteName = this.Pudding.getSprite();
				this.enemies[this.enemies.length - 1].setLife(this.Pudding.getLife())
				this.enemies[this.enemies.length - 1].setMoveMode(this.Pudding.getMoveMode())
				break;
			case 2:
				spriteName = this.Omurise.getSprite();
				this.enemies[this.enemies.length - 1].setLife(this.Omurise.getLife())
				this.enemies[this.enemies.length - 1].setMoveMode(this.Omurise.getMoveMode())
				break;
			case 3:
				spriteName = this.Ebihurai.getSprite();
				this.enemies[this.enemies.length - 1].setLife(this.Ebihurai.getLife())
				this.enemies[this.enemies.length - 1].setMoveMode(this.Ebihurai.getMoveMode())
				break;
			case 4:
				spriteName = this.Shark.getSprite();
				this.enemies[this.enemies.length - 1].setLife(this.Shark.getLife())
				this.enemies[this.enemies.length - 1].setMoveMode(this.Shark.getMoveMode())
				break;
		}
		this.enemies[this.enemies.length - 1].start(spriteName,x,y);
	}

	getEnemies(){
		return this.enemies;
	}

	getObjectLayer(map: Phaser.Tilemap,layerName: string):ITiledObject[]{
		return (map.objects as any)[layerName] as ITiledObject[];
	}
}