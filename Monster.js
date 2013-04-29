
    






//HELPER
function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


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
            ap=random(1,delta_a);
            dp=random(1,delta_d);
            kum_a-=ap;
            kum_d-=dp;
            
            results[attacks[i]]=new Array(ap,dp);
        }else
            results[attacks[i]]=new Array(kum_a,kum_d);
  
    }
    
    return results;
    
}



