
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
    }

	public update(/*dt: number*/) {
        for (let i = 0; i < this.enemies.length; i++) {
            let enemy = this.enemies[i];
            enemy.update();
        }
	}
    
    addEnemy() {
        this.enemies.push(new EnemiesBase(this.game));
        this.enemies[this.enemies.length - 1].start('enemyA');
	}
}