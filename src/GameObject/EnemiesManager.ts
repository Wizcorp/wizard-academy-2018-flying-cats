
import {  Sprite, Game } from "phaser-ce";
import { EnemiesBase } from "./EnemiesBase";

export class EnemiesManager {
	private time:number;
	private enemies: EnemiesBase[] = [];
    //private enemiesBace: EnemiesBase;

	private game: Game;
    
	constructor(game: Game) {

        this.game = game;
	}

	init(){
        //this.enemies
	}

	preload() {
        
	}

	create() {
        this.addEnemy();
        this.addEnemy(1);
        this.addEnemy(2);
        this.addEnemy(3);
        this.addEnemy(4);
    }

	public update(/*dt: number*/) {
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            enemy.update();
        }
	}
    
    addEnemy(mode:number = 0) {
		this.enemies.push(new EnemiesBase(this.game));
		let spriteName: string = "enemyA";
        switch(mode){
            case 1:
				spriteName = "enemyA";
                break;
            case 2:
				spriteName = "enemyB";
				break;
			case 3:
				spriteName = "enemyC";
				break;
			case 4:
				spriteName = "enemyD";
				break;
			default:
				spriteName = "enemyA";
				break;
        }
        this.enemies[this.enemies.length - 1].start(spriteName,this.enemies.length*this.game.width/2);
	}

	getEnemies(){
		return this.enemies;
	}
}