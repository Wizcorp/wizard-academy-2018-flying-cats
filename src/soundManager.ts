import { Game , Sound } from "phaser-ce";

export class SoundSystem {
    game: Game;
    music: Sound;
    SEA: Sound;
    SEB: Sound;
    SEC: Sound;
    SED: Sound;
    
    constructor(game: Game) {
        this.game = game;
    }

    preload(){
        this.game.load.audio("title", ["assets/music/title.mp3"]);
        this.game.load.audio("Play", ["assets/music/playbgm.mp3"]);
        this.game.load.audio("Boss", ["assets/music/BOSS.mp3"]);
        this.game.load.audio("gameClear", ["assets/SE/BOSS.mp3"]);
        this.game.load.audio("gameOver", ["assets/SE/gameOver.mp3"]);
        this.game.load.audio("Boss", ["assets/music/BOSS.mp3"]);
        this.game.load.audio("playerAttack", ["assets/SE/playerAttack.mp3"]);
        this.game.load.audio("playerAttacked", ["assets/SE/playerAttacked.mp3"]);
        this.game.load.audio("enemyDie", ["assets/SE/enemyDie.mp3"]);
        this.game.load.audio("bossDie", ["assets/SE/bossDie.mp3"]);
    }

    update(){
        
    }

    musicStart(num: number) {
        this.game.sound.stopAll();
        switch (num) {
            case 1:
                this.music = this.game.sound.play("title");
                this.music.loopFull();
                break;
            case 2:
                this.music = this.game.sound.play("Play");
                this.music.loopFull();
                break;
            case 3:
                this.music = this.game.sound.play("Boss");
                this.music.loopFull();
                break;
            case 4:
                this.music = this.game.sound.play("gameClear");
                break;
            case 5:
                this.music = this.game.sound.play("gameOver");
                break;
            default:
                break;
        }
    }

    set SE(num: number){
        switch (num){
            default:
                this.SEA = this.game.sound.play("playerAttack");
                this.SEA.volume = 2;
                break;
            case 2:
                this.SEB = this.game.sound.play("playerAttacked");
                this.SEB.volume = 1.6;
                break;
            case 3:
                this.SEC = this.game.sound.play("enemyDie");
                break;
            case 4:
                this.SED = this.game.sound.play("bossDie");
                this.music.loopFull();
                this.SED.volume = 60;
                break;
        }
    }
}