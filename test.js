function calculateAttacks(a,d,attacks){
    var kum_a=a;
    var kum_d=d;
    var results=[];
    
    for (var i in attacks){
        
        if (i<attacks.length-1){
            delta_a=kum_a;
            delta_d=kum_d;
            
            if (i<(attacks.length)/2){
                delta_a/=2;
                delta_d/=2;
            }
            ap=Math.floor(Math.random() * (delta_a - 1 + 1)) + 1;
            dp=Math.floor(Math.random() * (delta_d - 1 + 1)) + 1;
            kum_a-=ap;
            kum_d-=dp;
            
            results[attacks[i]]=new Array(ap,dp);
        }else
            results[attacks[i]]=new Array(kum_a,kum_d);
  
    }
    
    return results;
    
}

calculateAttacks(20,12,["Punch", "Tackle", "BattleCry", "RoundHouseKick",'enes']);