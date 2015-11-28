var astar = {
init: function(matrizDesierto, matrizCactus, grid){
	      for(var x =0 ; x < 20;x++){
		      for(var y =0 ; y < 20;y++){
			      grid[x][y].f = 0;
			      grid[x][y].g = 0;
			      grid[x][y].h = 0;
			      grid[x][y].debug = "";
			      grid[x][y].parent = null;
			      grid[x][y].pos.x = x;
			      grid[x][y].pos.y = y;
		      }
	      }




      },
search: function(matrizDesierto, matrizCactus, grid, inicio, fin){
		astar.init(matrizDesierto, matrizCactus, grid);

		var listaAbierta = [];
		var listaCerrada = [];
		listaAbierta.push(start);

		while(listaAbierta.length > 0){
			var indMasBajo = 0;

			for (var i=0;i<listaAbierta.length;i++){
				if(listaAbierta[i].f<listaAbierta[indMasBajo].f)
					indMasBajo = i;

			}
			var nodoActual = listaAbierta[indMasBajo];
			if (nodoActual.pos.x == fin.pos.x && nodoActual.pos.y == fin.pos.y){
				var act = nodoActual;
				var ret = [];
				while(act.parent){
					if( act.pos.y - act.parent.pos.y == 1 && act.pos.x - act.parent.pos.x == 0)
						ret.push(2);
					else if (act.pos.y - act.parent.pos.y == -1 && act.pos.x - act.parent.pos.x == 0)
						ret.push(0);
					else if (act.pos.y - act.parent.pos.y == 0 && act.pos.x - act.parent.pos.x == 1)
						ret.push(1);
					else if (act.pos.y - act.parent.pos.y == 0 && act.pos.x - act.parent.pos.x == -1)
						ret.push(3);



					act = act.parent;
				}
				return ret.reverse();	

			}

			listaAbierta.splice(indMasBajo,1);
			listaCerrada.push(act);
			var vecinos = astar.vecinos(act, matrizDesierto, matrizCactus);

			for(var i = 0; i<vecinos.length;i++){
				var vecino = vecinos[i];
				if(listaCerrada.indexOf(vecino) != -1){
					continue;
				}
			


				var gScore = act.g + 1;
				var gMejor = false;

				
				if(listaAbierta.indexOf(vecino)== -1 ){
					gMejor = true;
					vecino.h = astar.heuristica(vecino.pos, fin.pos);
					listaAbierta.push(vecino);


				}
else if (gScore < vecino.g){
gMejor = true;
}


if(gMejor){

vecino.parent = act;
vecino.g = gScore;
vecino.f = vecino.g + vecino.h;
vecino.debug = "F: " + vecino.f + "<br />G: " + vecino.g + "<br />H: " + vecino.h;


}
}








}

return [];




},





heuristica: function(pos0, pos1){
var d1 = Math.abs(pos1.x - pos0.x);
var d2 = Math.abs(pos1.y - pos0.y);
return d1+d2;
},


}