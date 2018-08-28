export default class Bullet extends Phaser.Sprite {

	private moveSpeed: number;

	constructor(game: any, x: number, y: number, imageName: string) {
		super(game, x, y, imageName);
		this.game.add.existing(this);
		this.moveSpeed = 10;
		this.game.physics.arcade.enable(this);
	}

	fixedUpdate() {
		this.x += this.moveSpeed;
	}

	destroy() {
		this.kill();
	}
}