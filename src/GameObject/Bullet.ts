import EffectObjectManager from "./EffectObjectManager";

export default class Bullet extends Phaser.Sprite {

	private moveSpeed: number;

	constructor(game: any, x: number, y: number, imageName: string, effectObjectMnager: EffectObjectManager) {
		super(game, x, y, imageName);
		this.anchor.set(0.5, 0.5);
		this.game.add.existing(this);
		this.moveSpeed = 10;
		this.game.physics.arcade.enable(this);
		this.effectObjectMnager = effectObjectMnager;
	}

	fixedUpdate() {
		this.x += this.moveSpeed;
	}

	destroy() {
		this.kill();
	}
}