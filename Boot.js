class Boot extends Phaser.Scene{

    constructor(){
        super("Boot");
    }

    preload(){
        console.log("Boot Started");
        //load wizards spritesheets
        this.load.spritesheet("wizard_attack1", "./assets/wizard/wizard_attack1.png", { frameWidth: 231, frameHeight: 190 });
        this.load.spritesheet("wizard_attack2", "./assets/wizard/wizard_attack2.png", { frameWidth: 231, frameHeight: 190 });
        this.load.spritesheet("wizard_idle", "./assets/wizard/wizard_idle.png", { frameWidth: 231, frameHeight: 190 });
        //Load all the badies spritesheets
        this.load.spritesheet("eye_death", "./assets/badies/eye_death.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("eye_hit", "./assets/badies/eye_hit.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("eye_idle", "./assets/badies/eye_idle.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("goblin_death", "./assets/badies/goblin_death.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("goblin_hit", "./assets/badies/goblin_hit.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("goblin_idle", "./assets/badies/goblin_idle.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("mushroom_death", "./assets/badies/mushroom_death.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("mushroom_hit", "./assets/badies/mushroom_hit.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("mushroom_idle", "./assets/badies/mushroom_idle.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("skeleton_death", "./assets/badies/skeleton_death.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("skeleton_hit", "./assets/badies/skeleton_hit.png", { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet("skeleton_idle", "./assets/badies/skeleton_idle.png", { frameWidth: 150, frameHeight: 150 });
    }

    create(){

        //create all animations for all monsters
        let monsterNames = ["eye","goblin","mushroom","skeleton"];
        //create wizard animations
        this.anims.create({
            key: "wizard_attack1",
            frames: this.anims.generateFrameNumbers("wizard_attack1", { start: 0}),
            frameRate: 8,
            repeat: 1
        });
        this.anims.create({
            key: "wizard_attack2",
            frames: this.anims.generateFrameNumbers("wizard_attack2", { start: 0}),
            frameRate: 8,
            repeat: 1
        });
        this.anims.create({
            key: "wizard_idle",
            frames: this.anims.generateFrameNumbers("wizard_idle", { start: 0}),
            frameRate: 8,
            repeat: -1
        });
        //create badies animations
        for(let name of monsterNames){
            this.anims.create({
                key: name + "_death",
                frames: this.anims.generateFrameNumbers(name + "_death", { start: 0}),
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: name + "_hit",
                frames: this.anims.generateFrameNumbers(name + "_hit", { start: 0}),
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: name + "_idle",
                frames: this.anims.generateFrameNumbers(name + "_idle", { start: 0}),
                frameRate: 8,
                repeat: -1
            });
        }
        this.scene.start("TitleScene");
    }
}