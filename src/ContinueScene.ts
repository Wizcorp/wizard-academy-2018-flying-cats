import TimesteppedScene from "./base/TimesteppedScene";
import PhaserTextStyle = Phaser.PhaserTextStyle;

export default class ContinueScene extends TimesteppedScene {
	/**
	 * Load sprites and various assets here.
	 */
	preload() {
		this.game.load.spritesheet('continueButton', 'assets/continueButton.png', 200, 40);
		this.game.load.spritesheet('quitButton', 'assets/quitButton.png', 200, 40);
		this.game.load.spritesheet('continueBg', 'assets/continueBackground.png', 768, 432);
	}

	/**
	 * Ran once at initialization.
	 */
	create() {

		const Bg = this.add.image(0, 0, "continueBg");

		const continueButton = this.game.add.button(200, 320, 'continueButton', this.continueOnClick, this, 2, 1, 0);
		const quitButton = this.game.add.button(200, 360, 'quitButton', this.quitOnClick, this, 2, 1, 0);
	}

	/**
	 * Ran every frame (this.fixedDt).
	 */
	fixedUpdate(dt: number) {
		// Skip to next scene with space or return
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) || this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.continueOnClick();
		}
	}

	/**
	 * Callback for button.
	 */
	continueOnClick() {
		this.game.state.start('GameScene');
	}

	quitOnClick() {
		this.game.state.start('TitleScene');
	}
}

