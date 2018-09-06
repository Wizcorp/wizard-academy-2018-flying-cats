import { Game, SoundManager } from "phaser-ce";
import { PlayerClass } from "./PlayerClass";
import { EnemiesManager } from "./EnemiesManager";
import { SoundSystem } from "../soundManager";

export default class EnemiesBase {
	public enable: boolean = false;
	public sprite: Phaser.Sprite;
	public life: number;
	public damageTime: number = 0;
	game: Game;
	player: PlayerClass;
	EnemiesManager: EnemiesManager;
	SoundSystem: SoundSystem;

	constructor(game: Game, player: PlayerClass, EM: EnemiesManager, spriteName: string, posX: number, posY: number, life: number, SoundSystem: SoundSystem) {
		this.game = game;
		this.player = player;
		this.sprite = this.game.add.sprite(posX, posY, spriteName);
		this.game.physics.arcade.enable(this.sprite);
		this.sprite.smoothed = false;
		this.sprite.anchor.set(0.5, 0.5);
		this.sprite.scale.set(1, 1);
		this.life = life;
		this.enable = false;
		this.EnemiesManager = EM;
		this.SoundSystem = SoundSystem;
	}

	// TODO Florian -- nice. You want to create an abstract class, and an abstract method here.
	// https://medium.com/@pagalvin/looking-at-abstract-classes-and-methods-in-typescript-9769de98f65b
	update() {
	}

	baseUpdate() {//todo:base
		//各enemy中のupdateがあればそちらを読む。例：EnemiesCan.update()
		this.game.physics.arcade.overlap(this.player.mySprite, this.sprite, this.player.changeLife.bind(this.player), null, this);
		if (this.game.camera.x > this.sprite.x) {
			this.delete();
			//this.player.changeAnimation("miss");
		}
		if (this.damageTime != 0) {
			if (this.damageTime < new Date().getTime()) {
				this.sprite.alpha = 1;
			} else {
				this.sprite.alpha = 0.7;
			}
		}
	}

	fixedUpdate(dt: number) {

	}

	addDamage() {//return score. if(return:-1){no }
		this.life--;
		if (this.life <= 0) {
			this.delete();
		}
		this.damageTime = new Date().getTime() + 200;
		this.SoundSystem.SE = 3;

		return true;
	}

	delete() {
		this.sprite.kill();
		// TODO Florian -- same as told previously in EffectObject. Else, very nice use of inheritance and OOP!
		this.EnemiesManager.deleteEnemy(this.EnemiesManager.enemies.indexOf(this));
	}
}