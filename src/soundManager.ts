import { Game , Sound } from "phaser-ce";

export class SoundSystem {
    game: Game;
    music: Sound;
    SEA: Sound;
    
    constructor(game: Game) {
        this.game = game;
    }

    preload(){
        this.game.load.audio("title", ["assets/music/title.mp3"]);
        this.game.load.audio("Play", ["assets/music/playbgm.mp3"]);
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
            default:
                this.music = this.game.sound.play("title");
                break;
            case 2:
                this.music = this.game.sound.play("Play");
                break;
            case 3:
                this.music = this.game.sound.play("Boss");
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
                this.SEA = this.game.sound.play("playerAttacked");
                this.SEA.volume = 3;
                break;
            case 3:
                this.SEA = this.game.sound.play("enemyDie");
                this.SEA.volume = 2;
                break;
            case 4:
                this.SEA = this.game.sound.play("bossDie");
                this.SEA.volume = 6;
                break;
        }
    }
}