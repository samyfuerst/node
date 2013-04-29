var monsters=require('../node_modules/monsters/lib');

function Godzilla(attackOrder) {
    monsters.Monster.apply(this, arguments);
	
    this.name='god';
	this._sound='rooooooaaaaaaarrr';
 
};

Godzilla.prototype = Object.create(monsters.Monster.prototype);

exports.Godzilla=Godzilla;