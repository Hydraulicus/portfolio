var rhythm = 50 //ms,
,firsttiming = 200
,tubeColor = 'rgba(180,205,250,0.85)'
,intermidColor = 'rgba(120,155,170,0.85)'
,darckTube = 'rgba(10, 10, 10,0.15)'
;
 
var tubes = []
  , animSvg
  , glow
  , filterChild;



function initAnimation (obj) {
    animSvg = Snap(obj.blck); 
    rhythm = obj.rhythm * 1000;
    firsttiming = obj.firsttiming * 1000;

    glow = animSvg.filter(Snap.filter.shadow(0, 4, 4, '#99f', 1));

var deskpattern = animSvg.line(0, 10, 0, 0).attr({
        fill: "none",
        stroke: "#333",
        strokeWidth: 2
    }).pattern(0, 0, 10, 10);

drawObjects();
Snap.select('#signdesk').attr({fill : deskpattern})


};//end of init function



function blincing(obj, N, timing){
  // console.log(N,timing);
  if ( N == 0 ) return;
  N--;
  obj.animate({ 'opacity' : 0.33 }, 50, function ()
       {
          obj.animate({ 'opacity' : 1 }, timing, function() 
            { 

              blincing(obj, N, timing)
            }) 
       })
  // obj.attr({filter : ''}).animate({ 'stroke' : darckTube }, 50, function ()
  //      {
  //         obj.animate({ 'stroke' : intermidColor }, timing, function() 
  //           { 
  //             setTimeout(
  //              function() {  obj.attr({filter : glow,  'stroke' : tubeColor});  }
  //             , timing) ;
  //             blincing(obj, N, timing)
  //           }) 
  //      })


}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function newlightTube(idtubeN) {
 if (idtubeN > (tubesPath.length-1)) { return }
 
  // console.log(idtubeN,tubesPath.length);
  var contour =  Snap.select("#tube"+idtubeN);
    contour
    .removeClass("neontubes whiteflag")
     .attr({
            "fill" : 'rgba(250, 250, 255, 1)',
       "fill-rule" : "nonzero",
       'stroke-width' : 5,
       "stroke-linejoin" : "round",
       "stroke-linecap" : "round",
       "stroke-dashoffset": 0,
        stroke : tubeColor, 
        filter : '',
        filter : glow,
        opacity : 0.95
        });
     

     if ( getRandomInt(1,5) == 1 )
          { 
            blincing(contour, getRandomInt(2,10), getRandomInt(50,2000)); 
          }
      else 
        { 
          contour.animate({ 'stroke' : tubeColor }, rhythm*10, function(){
            // contour.attr({filter : glow,})
          }); 


            animSvg.select("#wc"+idtubeN).removeClass('whiteflag') 
        }
            idtubeN++; newlightTube(idtubeN);
}
 


function drawObjects()
    {
      for (var j in objects)
        { animSvg.add(Snap.parse(objects[j]))
        };

      for (var i in tubesPath)
        {
           animSvg.add(Snap.parse(tubesPath[i]));
           animSvg.add(Snap.parse(whitecore[i]));
        }
     

        setTimeout(function()
          {
            newlightTube(0); 
          }, firsttiming)
        
       }



