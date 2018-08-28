import { Game } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";

export default class EnemiesBase {
    public anable: Boolean = false;
    public sprite: Phaser.Sprite;
    private life: number;
    game: Game;
    player: PlayerClass;

    constructor(game: Game, player: PlayerClass, spriteName: string, posX: number, posY: number, life: number) {
        this.game = game;
        this.player = player;
        this.sprite = this.game.add.sprite(posX, posY, spriteName);
        this.game.physics.arcade.enable(this.sprite);
        this.sprite.smoothed = false;
        this.sprite.anchor.set(0.5, 0.5);
        this.sprite.scale.set(1, 1);
        this.life = life;
        this.anable  = false;
    }

    update() {
        //各enemy中のupdate読む？例：EnemiesCan.update
    }

    baceUpdate() {
        this.game.physics.arcade.overlap(this.player.mySprite, this.sprite, this.addDamage, null, this);
        if(this.game.camera.x - this.sprite.x < 0){
            this.anable = false;
        }
    }

    fixedUpdate(dt: number) {

    }

    addDamage() {
        this.life --;
        if (this.life < 0) {
            this.delete();
        }
    }

    delete() {
        this.anable = false;
        this.sprite.kill();
    }
}