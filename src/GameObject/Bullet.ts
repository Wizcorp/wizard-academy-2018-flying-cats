import EffectObjectManager from "./EffectObjectManager";

export default class Bullet extends Phaser.Sprite {

	private moveSpeed: number;
	private effectObjectMnager:EffectObjectManager;

	constructor(game: any, x: number, y: number, imageName: string, effectObjectMnager:EffectObjectManager) {
		super(game, x, y, imageName);
		this.game.add.existing(this);
		this.moveSpeed = 10;
		this.game.physics.arcade.enable(this);
		this.effectObjectMnager = effectObjectMnager;
	}

	fixedUpdate() {
		this.x += this.moveSpeed;
	}

	makeHitEffect(){
		
	}

	destroy() {
		this.kill();
	}
}