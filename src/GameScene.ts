import TimesteppedScene from "./base/TimesteppedScene";
import { EnemiesManager } from "./GameObject/EnemiesManager";
import { PlayerClass } from "./GameObject/PlayerClass";
import { BgClass } from "./GameObject/BgClass";
import Bullet from "./GameObject/bullet"
import GameUi from "./GameObject/GameUi"
import EffectObjectManager from "./GameObject/EffectObjectManager"
import { EffectObjectType } from "./base/Enum";
import { SoundSystem } from "./soundManager";
export default class GameScene extends TimesteppedScene {

	private gameUi: GameUi;
	private scrollSpeed: number;

	private enemiesManager: EnemiesManager;

	private effectObjectManager: EffectObjectManager;

	private playerObject: PlayerClass;
	private tilesetObject: BgClass;

	private bullets: Bullet[] = [];
	private lastShotTime: number;

	private bulletMode: number = 0;
	private bulletRate: number = 200;

	private music: SoundSystem;

	init() {
		this.lastShotTime = 0;

		this.scrollSpeed = 3;

		this.playerObject = new PlayerClass(this.game);
		this.tilesetObject = new BgClass(this.game);

		this.effectObjectManager = new EffectObjectManager(this.game);

		this.music = new SoundSystem(this.game);
		this.enemiesManager = new EnemiesManager(this.game, this.playerObject, this, this.music);
		this.enemiesManager.init();//敵
	}

	preload() {
		this.game.load.image('background', 'assets/stageBackground.png');

		this.game.load.tilemap('map', 'assets/json/mapTest001B.json', null, Phaser.Tilemap.TILED_JSON); // タイルマップのjsonファイル
		this.game.load.image('tiles', 'assets/exptest01.png');  // タイルセット画像ファイル

		this.game.load.image('enemyA', 'assets/nyan.png');//敵画像
		this.game.load.image('enemyB', 'assets/purin.png');
		this.game.load.image('enemyD', 'assets/omurise.png');
		this.game.load.image('enemyC', 'assets/bossenemy.png');
		this.game.load.image('enemyCEnd', 'assets/sharkDie.png');
		this.game.load.image('enemyE', 'assets/ebihurai.png');
		this.game.load.image('enemyAS', 'assets/sharkCan.png');
		this.game.load.image('ItemA', 'assets/item_sunGlass.png');

		this.game.load.image('effectHit', 'assets/lingSoft.png');
		this.game.load.spritesheet('bomb', 'assets/bomb.png', 50, 50);

		this.game.load.image('bullet', 'assets/fork.png');
		this.enemiesManager.preload();//敵

		this.game.load.image('life', 'assets/life.png');
		this.game.load.image('mapGauge', 'assets/timeIcon.png');

		this.game.load.spritesheet('playerSprite', 'assets/catPlayer.png', 35, 40);

		this.music.preload();
	}

	create() {
		this.tilesetObject.createTileset();

		this.gameUi = new GameUi(this.game);
		this.enemiesManager.create(this.gameUi);//敵
		this.playerObject.createPlayer(this.gameUi, this.music);

		this.game.physics.arcade.enable([this.playerObject.mySprite]);//todo:Player.tsに移す

		this.bulletRate = 200;
		//music
		this.music.musicStart(2);
	}

	fixedUpdate(dt: number) {

		this.game.camera.x += this.scrollSpeed;

		this.tilesetObject.update();
		this.playerObject.update();
		this.enemiesManager.update();//敵の更新
		this.effectObjectManager.update();

		//bulletの生成
		if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && new Date().getTime() - this.lastShotTime >= this.bulletRate) {

			const bullet = new Bullet(this.game, this.playerObject.mySprite.x, this.playerObject.mySprite.y, "bullet", this.effectObjectManager);
			this.bullets.push(bullet);
			this.lastShotTime = new Date().getTime();

			this.music.SE = 1;

			//testでエフェクトを発生
			//this.effectObjectManager.addEffect(Math.random() * this.game.width,Math.random() * this.game.height,EffectObjectType.hitEffect);
		}

		//bulletの処理と当たり判定
		for (const bullet of this.bullets) {
			bullet.fixedUpdate();

			for (const enemy of this.enemiesManager.enemies) {
				if (this.game.physics.arcade.overlap(bullet, enemy.sprite) && enemy.enable) {
					if (enemy.addDamage()) {
						this.effectObjectManager.addEffect(bullet.x, bullet.y, EffectObjectType.hitEffect);
						bullet.destroy();
						this.gameUi.addScore(1000);
					}
				}
			}

			if (bullet.x - this.game.camera.x > this.game.width) {
				bullet.destroy();
			}
		}
	}

	set bulletModeNum(mode: number) {
		this.bulletMode = mode;
		if (this.bulletMode = 1) {
			this.bulletRate = 50;
		}
		this.playerObject.changeAnimation("waitPower");
	}
}

