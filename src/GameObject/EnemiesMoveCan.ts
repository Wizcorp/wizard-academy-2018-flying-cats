import EnemiesBase from "./EnemiesBase";
import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import { Vector2 } from "../base/Math";
export class EnemiesMoveCan extends EnemiesBase {

    private speed: Vector2;
	constructor(game: Game, player: PlayerClass, posX: number, posY: number, speedX: number, speedY: number) {
        super(game, player, "enemyA", posX, posY, 1);
        this.speed = {x:speedX,y:speedY};
	}

	update() {
        this.sprite.x += this.speed.x;
        this.sprite.y += this.speed.y;
	}
}