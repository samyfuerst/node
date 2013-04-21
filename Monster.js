function Monster(attackOrder) {
    "use strict";
    this._attackOrder = attackOrder;
	this._attacks = [];
    this._health = 5;
    this._attackCounter = 0;
    this._currentAttack;
    

    
    this.growl=function(){
        console.log(this._sound);
    }
    
    this.attack=function(victim){
        this.growl();
        var ap=0;
        if (this._attackOrder.length>0){
            this._currentAttack=this._attacks[this._attackOrder[0]];
            if (typeof this._currentAttack != 'undefined'){
                ap=this._currentAttack[0];
                this._health+=this._currentAttack[1];
				console.log('health',this._health)
            }
            this._attackOrder.shift();
        }
        
        victim.defend(ap)        
    }
    
    this.defend=function(attackPoints){
		console.log(this._health-attackPoints)
        if (this._health-=attackPoints<=0)
            process.exit(0);
    }
        
    
}

Monster.prototype._sound=null;
Monster.prototype._attackOrder=null;
Monster.prototype.attacks=null;

Monster.prototype.getHealth=function(){
    return this._health;
}



function Godzilla(attackOrder) {
    Monster.apply(this, arguments);
	
	this._sound='rooooooaaaaaaarrr';
    this._attacks={
        "Punch":[4,2], 
        "Tackle":[5,4], 
        "BattleCry":[6,5],
        "RoundHouseKick":[5,1]
    }
}

Godzilla.prototype = Object.create(Monster);
Godzilla.prototype.attack = function () {
    Monster.prototype.attack.apply(this, arguments);
};



function KingKong(attackOrder) {
    Monster.apply(this, arguments);
	
	this._sound='aaaaaaaaaaaarrrrrrrrrgghhhh "boom boom boom boom"';
	   this._attacks={
        "Punch":[4,2], 
        "Tackle":[5,4], 
        "BattleCry":[6,5],
        "RoundHouseKick":[5,1]
    }
	
}

KingKong.prototype = Object.create(Monster);
KingKong.prototype.attack = function () {
    Monster.prototype.attack.apply(this, arguments);
};



//HELPER
function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//REFEREE
function Referee() {
    this._fighters = null;
}
Referee.prototype.maxAttacks = 4;
Referee.prototype.rounds = 4;
Referee.prototype.maxAttackPoints = 20;
Referee.prototype.maxDefensePoints = 12;

Referee.prototype.greetMonsters = function (monster1, monster2) {

    console.log("Welcome to the spectacular fight between %s and %s", monster1.name, monster2.name);

    this._fighters = {
        monster1 : monster1,
        monster2 : monster2
    };
};

Referee.prototype._isCheater = function(monster) {
    var currentAttack,
        attackName,
        usedAttacks = [],
        totalAttacksSum = 0,
        defenseSum = 0,
        attackSum = 0;

    for (attackName in monster.attacks) {
        if (monster.attacks.hasOwnProperty(attackName)) {
            totalAttacksSum++;
            currentAttack = monster.attacks[attackName];
            attackSum += currentAttack.attack;
            defenseSum += currentAttack.defense;
        }
    }

    if (monster.getHealth() !== Monster.prototype.getHealth()) {
        throw new Error("Found '" + monster.getHealth() + "'. Health has to be exactly " + Monster.prototype.getHealth());
    }

    if (totalAttacksSum > this.maxAttacks ) {
        throw new Error("Found '" +totalAttacksSum+ "' different attacks. '" + this.maxAttacks + "' different attacks are allowed.");
    }

    if (defenseSum > this.maxDefensePoints) {
        throw new Error("Found '" + defenseSum + "' defense-points. '" + this.maxDefensePoints + "' defense-points are allowed.");
    }

    if (attackSum > this.maxAttackPoints) {
        throw new Error("Found '" + attackSum + "' attack-points. '" + this.maxAttackPoints + "'  attacks-points are allowed.");
    }

    monster._attackOrder.forEach(function forEachAttack(attackName) {
        if (usedAttacks.indexOf(attackName) !== -1) {
            throw new Error("You can use attack '" + attackName + "' only once");
        }

        usedAttacks.push(attackName);
    });
};

Referee.prototype.checkForCheaters = function() {

    console.log("Are there any cheaters among us? Let me check that...");

    console.log("checking " + this._fighters.monster1.name);
    this._isCheater(this._fighters.monster1);
    console.log("checking " + this._fighters.monster2.name);
    this._isCheater(this._fighters.monster2);

    console.log("Everything fine! Let the fight begin");
};

Referee.prototype.startFight = function() {
    var self = this,
        cnt = 0,
        attacking = "monster" + random(1,2),
        defending = "";

    setInterval(fightRound, 1000);

    function fightRound() {
        // not very elegant, but obvious to everyone what's going on
        if (attacking === "monster1") {
            defending = "monster1";
            attacking = "monster2";
        }
        else {
            defending = "monster2";
            attacking = "monster1";
        }

        cnt++;
        console.log("\n");

        if (cnt > self.rounds) {
            console.log("DRAW! Both monsters seem to be very strong...");
            process.exit(0);
        } else {
            console.log("Round " + cnt);
        }

        self._fighters[attacking].attack(self._fighters[defending]);
    }
};

//EXECUTION
var godzilla = new Godzilla(["Punch", "Tackle", "BattleCry", "RoundHouseKick"]);
var kingKong = new KingKong(["Stamp", "Punch", "Tackle", "DrumOnChest"]);

var referee = new Referee();
referee.greetMonsters(kingKong, godzilla);
referee.checkForCheaters();
referee.startFight();