function Monster(attackOrder) {
    "use strict";
    this._attackOrder = attackOrder;
	this._attacks = [];
    this._health;
    this._currentAttack=null;
        
    
    this.getHealth=function(){
        return this._health;
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
Monster.prototype._attacks=null;

Monster.prototype.getHealth=function(){
    return this._health;
}

Monster.prototype.growl=function(){
    console.log(this._sound);
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


m=new Godzilla(['Punch'])

console.log(m.prototype.growl)
console.log(m.growl)
console.log(m.x)

