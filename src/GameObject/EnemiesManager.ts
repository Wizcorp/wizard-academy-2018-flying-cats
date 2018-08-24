
import {  Sprite, Game } from "phaser-ce";
import { EnemiesBase } from "./EnemiesBase";

import { EnemiesCan } from "./EnemiesCan";
import { EnemiesPudding } from "./EnemiesPudding";
import { EnemiesShark } from "./EnemiesShark";

export class EnemiesManager {
	private enemies: EnemiesBase[] = [];
	
	private Can: EnemiesCan;
	private Pudding: EnemiesPudding;
	private Shark: EnemiesShark;

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
		this.Can = new EnemiesCan();
		this.Pudding = new EnemiesPudding();
		this.Shark = new EnemiesShark();
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
			switch(enemy.getMoveMode()){
				case 1:
					enemy.setPos(this.Can.posUpdate(enemy.getPos()));
					break;
				case 2:
					enemy.setPos(this.Pudding.posUpdate(enemy.getPos()));
					break;
				case 3:
					enemy.setPos(this.Shark.posUpdate(enemy.getPos()));
					break;
			}
        }
	}
    
    addEnemy(mode:number = 1) {
		this.enemies.push(new EnemiesBase(this.game));
		let spriteName: string = "enemyA";
        switch(mode){
			case 1:
				spriteName = this.Can.getSprite();
				this.enemies[this.enemies.length - 1].setLife(this.Can.getLife())
				this.enemies[this.enemies.length - 1].setMoveMode(this.Can.getMoveMode())
                break;
            case 2:
				spriteName = this.Pudding.getSprite();
				this.enemies[this.enemies.length - 1].setLife(this.Pudding.getLife())
				this.enemies[this.enemies.length - 1].setMoveMode(this.Pudding.getMoveMode())
				break;
			case 3:
				spriteName = this.Shark.getSprite();
				this.enemies[this.enemies.length - 1].setLife(this.Shark.getLife())
				this.enemies[this.enemies.length - 1].setMoveMode(this.Shark.getMoveMode())
				break;
		}
        this.enemies[this.enemies.length - 1].start(spriteName,this.enemies.length*this.game.width/2);
	}

	getEnemies(){
		return this.enemies;
	}
}