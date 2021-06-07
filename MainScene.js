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
    }

    // Runs when we first enter this scene
    create() {

        // Set the starting monster
        this.setMonster();
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
            console.log("You killed the monster!");
            // Set monster to no longer be alive
            this.alive = false;
            // Play a death animation
            console.log("here");
            this.monsterImage.play("eye_death")
            this.monsterImage.on('animationcomplete', ()=>{
                console.log("stopped");
            });
        }
    }

    setMonster() {
        // Reset hp of the monster
        this.hp = 5;
        this.alive = true;

        // Create a image of monster at position x:225,y:400
        this.monsterImage = this.add.sprite(350, 400, "eye_idle");
        this.monsterImage.setFlipX(true);
        this.monsterImage.play("eye_idle")
        // Set the size of the monster
        this.monsterImage.setScale(4);
        // Make the monster clickable
        this.monsterImage.setInteractive();

        // Handler/callback for the 'pointer down' event
        this.monsterImage.on('pointerdown', ()=> {
            this.damage(1);
        })
    }
}