//EXECUTION
var Godzilla=require('./lib/Godzilla')
var KingKong=require('./lib/KingKong')

var Ref=require('./node_modules/monsters/lib/')

console.log(Godzilla)

var godzilla = new Godzilla.Godzilla(["Punch", "Tackle", "BattleCry", "RoundHouseKick"]);
var kingKong = new KingKong.KingKong(["Stamp", "Punch", "Tackle", "DrumOnChest"]);

var referee = new Ref.Referee();
referee.greetMonsters(kingKong, godzilla);
referee.checkForCheaters();
referee.startFight();