import TimesteppedScene from "./base/TimesteppedScene";
import PhaserTextStyle = Phaser.PhaserTextStyle;

export default class GameOverScene extends TimesteppedScene {
	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.spritesheet('startButton', 'assets/startButton.png', 200, 40);
		this.game.load.spritesheet('startBg', 'assets/background.png', 768, 432);
	}

	/**
	 * Ran once at initialization.
	 */
	create() {
		/*
		const title = this.game.add.text(this.game.width / 2, 200, 'Wizard Academy Space Shooter');
		title.anchor.set(0.5, 0.5);
		title.align = 'center';
		title.font = 'Arial';
		title.fontSize = 45;
		title.fill = '#ffffff';
		*/

		const Bg = this.add.image(0,0,"startBg");

		const button = this.game.add.button(this.game.width / 2, 300, 'startButton', this.buttonOnClick, this, 2, 1, 0);
		button.anchor.set(0.5, 0.5);
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.buttonOnClick();
	}

}

	/**
	 * Callback for button.
	 */
	buttonOnClick() {
		this.game.state.start('GameScene');
	}
}
