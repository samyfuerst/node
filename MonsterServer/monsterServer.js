var Fight=require('MonsterFight');
var express=require('express');
var socketio = require('socket.io');
var fs=require('fs');
var http = require('http');

var fights=[];

var app = express();

//handler für GET requests
app.get('/', function(req, res){
   
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    
    var path = "./index.html";
    
    fs.readFile(path, 'utf8', function (err, data) {
            if (err) 
                throw err;
        
            res.end(data);
    });
        
});


app.get('/stats', function(req, res, next){
    if (fights.length>0){
        res.write("<h1>Fight Results:</h1><ul>");
        for (var fight in fights)
            res.write("<li><a href='/stats/"+(parseInt(fight,10)+1)+"'/>"+fights[fight]+"</li>");
        res.end('</ul>');
    }else
        res.send('<h1>no fights have been fought<h1>');
});


app.get('/stats/:id', function(req, res, next){
    if (typeof fights[req.params.id-1]!=='undefined')
        res.send("<h1>"+fights[req.params.id-1]+"</h1>");
    else
        res.send("<h1>invalid fight id: "+req.params.id+"</h1>");
});



var server = http.createServer(app);
server.listen(3000);

socketio.listen(server,{ log: false }).on('connection', function (socket) {
    
    var fight=new Fight();
    
    fight.referee.addListener('moderation',function(text){
         socket.emit('fight', '<h2>'+text+'</h2>');
    });
    
    fight.referee.addListener('round',function(counter){
        socket.emit('fight','<h3>'+ 'Round '+counter+'</h3>');

    });
    fight.referee.addListener('end',function(result){
        fights.push('Fight '+(fights.length+1)+': '+result)
        socket.emit('fight', '<h3>'+result+'</h3>');

        fight=null;
    });
    
    var onAttack=function(n,ap){
        socket.emit('fight','<p class="attack">'+n+' attacks '+this.name+' with '+ap+'</p>');
    };
    
    var onHit=function(ap){
        socket.emit('fight','<p class="hit">'+this.name+ ' was hit and lost' +ap+' health points; '+this._health+' hp left'+'</p>');
    };
    
    var onDefend=function(){
       socket.emit('fight','<p class="defend">'+this.name+' averted an attack'+'</p>');
    };
    
    var onDie=function(){
       socket.emit('fight','<p class="die">'+this.name+' unfortunately died'+'</p>');
    };
    
    var onGrowl=function(sound){
        socket.emit('fight','<p class="growl">'+this.name+' says: '+sound+'</p>');
    };
    
    
    for (m in fight.monsters){
        fight.monsters[m].addListener('attack',onAttack);
        fight.monsters[m].addListener('hit',onHit);
        fight.monsters[m].addListener('defend',onDefend);
        fight.monsters[m].addListener('die',onDie);
        fight.monsters[m].addListener('growl',onGrowl);
    };
    
    
    fight.letsFight();
    
});
