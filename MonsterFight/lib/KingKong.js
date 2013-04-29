var monsters=require('../node_modules/monsters/lib');

function KingKong(attackOrder) {
    monsters.Monster.apply(this, arguments);
	
    this.name='king';
	this._sound='aaaaaaaaaaaarrrrrrrrrgghhhh "boom boom boom boom"';
	
}

KingKong.prototype = Object.create(monsters.Monster.prototype);

exports.KingKong= KingKong;