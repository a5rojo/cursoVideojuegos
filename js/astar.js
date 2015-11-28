var astar = {
init: function(matrizDesierto, matrizCactus, grid){
	      for(var x =0 ; x < 20;x++){
		      for(var y =0 ; y < 20;y++){
			      grid[x][y].f = 0;
			      grid[x][y].g = 0;
			      grid[x][y].h = 0;
			      grid[x][y].debug = "";
			      grid[x][y].parent = null;
			      grid[x][y].pos = {};

			      grid[x][y].pos.x = x;
			      grid[x][y].pos.y = y;
		      }
	      }




      },
buscar: function(matrizDesierto, matrizCactus, grid, inicio, fin){
		astar.init(matrizDesierto, matrizCactus, grid);

		var listaAbierta = [];
		var listaCerrada = [];
		listaAbierta.push(inicio);
				



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
						ret.push(1);
					else if (act.pos.y - act.parent.pos.y == -1 && act.pos.x - act.parent.pos.x == 0)
						ret.push(3);
					else if (act.pos.y - act.parent.pos.y == 0 && act.pos.x - act.parent.pos.x == 1)
						ret.push(2);
					else if (act.pos.y - act.parent.pos.y == 0 && act.pos.x - act.parent.pos.x == -1)
						ret.push(0);



					act = act.parent;
				}

				return ret.reverse();	

			}
			listaAbierta.splice(indMasBajo,1);
			listaCerrada.push(nodoActual);

			var vecinos = astar.vecinos(grid,nodoActual, matrizDesierto, matrizCactus);

			for(var i = 0; i<vecinos.length;i++){
				var vecino = vecinos[i];
				if(listaCerrada.indexOf(vecino) != -1){
					continue;
				}



				var gScore = nodoActual.g + 1;
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

					vecino.parent = nodoActual;
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

vecinos: function(grid,nodo, matrizDesierto, matrizCactus){
		 var ret = [];
		 var x = nodo.pos.x;
		 var y = nodo.pos.y;

		 switch(matrizDesierto[x*20+y]){
			 case 0:
				 if( x<19 &&matrizCactus[x+1][y] !=2 )
					 ret.push(grid[x+1][y]);
				 
				 if(x>0&&matrizCactus[x-1][y] !=2)
					 ret.push(grid[x-1][y]);
				 



				 if(matrizCactus[x][y-1]!=2)
					 ret.push(grid[x][y-1]);
				 if(matrizCactus[x][y+1]!=2)
					 ret.push(grid[x][y+1]);

				 break;
			 case 1:
				 if(matrizCactus[x+1][y]!=2)
					 ret.push(grid[x+1][y]);
				 if(matrizCactus[x-1][y]!=2)
					 ret.push(grid[x-1][y]);
				 break;
			 case 2:
				 if(matrizCactus[x][y+1]!=2)
					 ret.push(grid[x][y+1]);
				 if(matrizCactus[x][y-1]!=2)
					 ret.push(grid[x][y-1]);
				 break;
			 case 3:
				 if(matrizCactus[x+1][y]!=2)
					 ret.push(grid[x+1][y]);
				 if(matrizCactus[x-1][y]!=2)
					 ret.push(grid[x-1][y]);
				 if(matrizCactus[x][y+1]!=2)
					 ret.push(grid[x][y+1]);
				 break;
			 case 4:
				 if(matrizCactus[x+1][y]!=2)
					 ret.push(grid[x+1][y]);
				 if(matrizCactus[x][y-1]!=2)
					 ret.push(grid[x][y-1]);
				 if(matrizCactus[x][y+1]!=2)
					 ret.push(grid[x][y+1]);

				 break;
			 case 5:
				 if(matrizCactus[x+1][y]!=2)
					 ret.push(grid[x+1][y]);
				 if(matrizCactus[x-1][y]!=2)
					 ret.push(grid[x-1][y]);
				 if(matrizCactus[x][y-1]!=2)
					 ret.push(grid[x][y-1]);
				 break;
			 case 6:

				 if(matrizCactus[x-1][y]!=2)
					 ret.push(grid[x-1][y]);
				 if(matrizCactus[x][y-1]!=2)
					 ret.push(grid[x][y-1]);
				 if(matrizCactus[x][y+1]!=2)
					 ret.push(grid[x][y+1]);


				 break;
			 case 7:
				 if(matrizCactus[x+1][y]!=2)
					 ret.push(grid[x+1][y]);
				 if(matrizCactus[x][y+1]!=2)
					 ret.push(grid[x][y+1]);

				 break;
			 case 8:
				 if(matrizCactus[x+1][y]!=2)
					 ret.push(grid[x+1][y]);
				 if(matrizCactus[x][y-1]!=2)
					 ret.push(grid[x][y-1]);

				 break;
			 case 9:
				 if(matrizCactus[x-1][y]!=2)
					 ret.push(grid[x-1][y]);
				 if(matrizCactus[x][y-1]!=2)
					 ret.push(grid[x][y-1]);

				 break;
			 case 10:
				 if(matrizCactus[x-1][y]!=2)
					 ret.push(grid[x-1][y]);
				 if(matrizCactus[x][y+1]!=2)
					 ret.push(grid[x][y+1]);

				 break;
			 case 11:
				 if(matrizCactus[x][y+1]!=2)
					 ret.push(grid[x][y+1]);

				 break;
			 case 12:
				 if(matrizCactus[x][y-1]!=2)
					 ret.push(grid[x][y-1]);
				 break;
			 case 13:
				 if(matrizCactus[x-1][y]!=2)
					 ret.push(grid[x-1][y]);

				 break;
			 case 14:
				 if(matrizCactus[x+1][y]!=2)
					 ret.push(grid[x+1][y]);

				 break;




		 }

return ret;

	 }


};
