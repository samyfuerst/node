
Monster.prototype.name = null;
Monster.prototype.attack = function () { ... };


function Godzilla(name) {
    // Ruft die Monster-Funktion auf this auf
    Monster.apply(this, arguments);
}
// Erzeugt ein neues Objekt das als Prototyp Monster.prototype hat
Godzilla.prototype = Object.create(Monster.prototype);
Godzilla.prototype.attack = function () {
    ...
    // Ruft die attack-Funktion des Monsters auf diesem Objekt auf
    Monster.prototype.attack.apply(this, arguments);
};


Monster= function (attackOrder){
    this._attackOrder=attackOrder;
    this._health=5;
    this._attackCounter=0;
    
    this.getHealth=function(){
        return _health;
    }
    
    this.growl=function(){
        console.log(_sound);
    }
    
    this.attack=function(victim){
        this.growl()
        victim.defend(attackOrder[_attackCounter])
        _attackCounter++;
        
    }
    
    this.defend=function(attackPoints){
        if (_health-=attackPoints<=0)
            process.exit(0);
        else{
            _health-=attackPoints;
            //attacke auswählen?
        }
            
            
    }
        
    
}

Monster.prototype.sound=null;
Monster.prototype.attackOrder=null
