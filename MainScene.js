class MainScene extends Phaser.Scene {

    // This is where we define data members
    constructor() {
        super("MainScene");
        // Monster variables
        this.monsterImage = null;
        this.hp = 5;
        this.hpText = null;
        this.soulsText = null;
        // Levels in upgrades
        this.levels = {
            bolt: 0
        }
        // Status of monster
        this.alive = false;
        //list of monster names
        this.monsterName = "";
        this.monsterNameList = ["eye","goblin","mushroom","skeleton"];
    }

    // Runs when we first enter this scene
    create() {
        let monsterIsland = this.add.image(350,570,"island");
        monsterIsland.setScale(.35);
        monsterIsland.setFlipX(true);
        let wizardIsland = this.add.image(90,570,"island");
        wizardIsland.setScale(.35);
        // Set the starting monster
        this.newMonster();
        // Create hp text
        this.hpText = this.add.text(225, 700, "");
        // Create the souls text
        this.soulsText = this.add.text(50, 50, "Souls: 0", {
            fontSize: '24px',
            color: 'red'
        });

        // Create an upgrade icon for the bolt upgrade
        let bolt = this.add.image(400, 50, 'bolt');
        bolt.setScale(3);
        bolt.setInteractive();
        bolt.on('pointerdown', () => {
            // If we have enough money
            if (this.souls >= 5) {
                // pay the money
                this.souls -= 5;
                // gain a level
                this.levels.bolt++;
            }
        });

        // Save button
        let door = this.add.image(50, 750, 'door');
        door.setScale(3);
        door.setInteractive();
        door.on('pointerdown', () => {
            this.saveGame();
            this.scene.start("TitleScene");
        });
    }

    // Runs every frame
    update() {
        if (this.hp > 0) {
            this.hpText.setText(`${this.hp}`);
        } else {
            this.hpText.setText("0");
        }
        //this.soulsText.setText(`Souls: ${this.souls}`);
    }

    damage(amount) {
        // Lower the hp of the current monster
        this.hp -= amount;
        // Check if monster is dead
        if (this.hp <= 0 && this.alive) {
            // Set monster to no longer be alive
            this.alive = false;
            // Play a death animation
            this.monsterImage.play(this.monsterName + "_death");
            //so this is an odd chain but it plays the death animation, fades them out, and spawns a new one.
            this.monsterImage.once('animationcomplete', ()=>{
                this.monsterImage.anims.stop();
                this.tweens.add({
                    targets: [this.monsterImage],
                    duration: 400,
                    alpha: 0,
                    onComplete:
                        () => {
                            //we wait a small amount of time after he has faded
                            setTimeout(() => {
                                this.newMonster();
                                this.souls++;
                                //this.saveGame();
                            }, 500)
                        }
                });
            });
        } else if(this.alive) {
            console.log("alive");
            this.monsterImage.play(this.monsterName + "_hit");
            this.monsterImage.once('animationcomplete', ()=>{
                this.monsterImage.play(this.monsterName + "_idle");
            });
        }
    }

    newMonster() {
        if(this.monsterImage){
            this.monsterImage.destroy();
        }
        this.monsterName = this.monsterNameList[Math.floor(Math.random() * this.monsterNameList.length)];
        // Reset hp of the monster
        this.hp = 5;
        this.alive = true;

        // Create a image of monster at position x:225,y:400
        this.monsterImage = this.add.sprite(360, 400, this.monsterName + "_death", 3);
        this.monsterImage.setFlipX(true);
        this.monsterImage.play(this.monsterName + "_idle")
        // Set the size of the monster
        this.monsterImage.setScale(4);
        // Make the monster clickable
        this.monsterImage.setInteractive();

        // Handler/callback for the 'pointer down' event
        this.monsterImage.on('pointerdown', ()=> {
            if(this.alive){
                this.damage(1);
            }
        })
    }
}