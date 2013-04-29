//EXECUTION
var Godzilla=require('./lib/Godzilla');
var KingKong=require('./lib/KingKong');

var Ref=require('./node_modules/monsters/lib/');

var colors=require('ansicolors');

var godzilla = new Godzilla.Godzilla(["Punch", "Tackle", "BattleCry", "RoundHouseKick"]);
var kingKong = new KingKong.KingKong(["Stamp", "Punch", "Tackle", "DrumOnChest"]);

var monsters=[godzilla,kingKong];

var referee = new Ref.Referee();
referee.greetMonsters(kingKong, godzilla);
referee.checkForCheaters();
referee.startFight();



var onAttack=function(n,ap){
    console.log(colors.brightRed('%s attacks %s with %s'),this.name,n,ap);
};

var onHit=function(ap){
    console.log(colors.brightCyan('%s was hit and lost %s health points; %s hp left'),this.name,ap,this._health);
};

var onDefend=function(){
    console.log(colors.brightGreen('%s averted an attack'),this.name);
};

var onDie=function(){
    console.log(colors.brightBlack('%s unfortunately died'),this.name);
    process.exit();
};

var onGrowl=function(sound){
    console.log(colors.brightBlue('%s says: %s'),this.name,sound);
};


for (m in monsters){
    monsters[m].addListener('attack',onAttack);
    monsters[m].addListener('hit',onHit);
    monsters[m].addListener('defend',onDefend);
    monsters[m].addListener('die',onDie);
    monsters[m].addListener('growl',onGrowl)
};
    

