var lienzo = document.getElementById("lienzo");
var pluma = lienzo.getContext("2d");
function ut_f(){}
var imTablero = new Image();
imTablero.src = "Arimaa_big_board.jpg";
var tablero = [];
var p_val = [-13, -8, -5, -3, -2, -1, 0, 1, 2, 3, 5, 8, 13];
function valor(piece){
	return p_val[piece.valor + 6];
}
var P = {
	RAG : {valor: 1,  name: "gold_rabb.jpg", code: "R"},
	CAG : {valor: 2,  name: "gold_cat.jpg",  code: "C"},
	DOG : {valor: 3,  name: "gold_dog.jpg",  code: "D"},
	HOG : {valor: 4,  name: "gold_hors.jpg", code: "H"},
	CMG : {valor: 5,  name: "gold_came.jpg", code: "M"},
	ELG : {valor: 6,  name: "gold_elef.jpg", code: "E"},
	RAS : {valor: -1, name: "silver_rabb.jpg", code: "r"},
	CAS : {valor: -2, name: "silver_cat.jpg",  code: "c"},
	DOS : {valor: -3, name: "silver_dog.jpg",  code: "d"},
	HOS : {valor: -4, name: "silver_hors.jpg", code: "h"},
	CMS : {valor: -5, name: "silver_came.jpg", code: "m"},
	ELS : {valor: -6, name: "silver_elef.jpg", code: "e"},
	EMP : {valor: 0,  name: "", code: "O"},
};
var piezas = [P.RAG, P.CAG, P.DOG, P.HOG, P.CMG, P.ELG, P.RAS, P.CAS, P.DOS, P.HOS, P.CMS, P.ELS, P.EMP];
for (var ww=0; ww<piezas.length; ww++){
	piezas[ww].im = new Image;
	piezas[ww].im.src = piezas[ww].name;
}
for (var iii=0; iii<8; iii++){
	tablero [iii] = [];
	for (var jjj=0; jjj<8; jjj++){
		tablero[iii][jjj] = P.EMP;
	}
}
function begin_game(){
	for (var tt=0; tt<8; tt++){
		tablero[tt][0]=P.RAG;
		tablero[tt][7]=P.RAS;
	}
	tablero[3][7]=P.DOS;
	tablero[4][7]=P.DOS;
	tablero[3][0]=P.DOG;
	tablero[4][0]=P.DOG;
	tablero[1][1]=P.HOG;
	tablero[2][1]=P.CAG;
	tablero[3][1]=P.CMG;
	tablero[4][1]=P.ELG;
	tablero[5][1]=P.CAG;
	tablero[6][1]=P.HOG;
	tablero[7][1]=P.RAG;
	tablero[0][1]=P.RAG;
	tablero[1][6]=P.HOS;
	tablero[2][6]=P.CAS;
	tablero[3][6]=P.CMS;
	tablero[4][6]=P.ELS;
	tablero[5][6]=P.CAS;
	tablero[6][6]=P.HOS;
	tablero[7][6]=P.RAS;
	tablero[0][6]=P.RAS;
}
function pinTablero(){
	pluma.fillStyle = "white";
	pluma.fillRect(0, 0, 1200, 600);
	pluma.drawImage(imTablero, 74, 0);
	for (var ii=0; ii<8; ii++){
		for (var jj=0; jj<8; jj++){
			if (tablero[ii][jj].valor!=0){
				pluma.drawImage(tablero[ii][jj].im, 98.89 + 50*ii, 24.39 + 50*jj);
			}
		}
	}
}
function loc(number, board){
	for (var ii=0; ii<8; ii++){
		for (var jj=0; jj<8; jj++){
			if (board[ii][jj].valor==number){
				return [ii, jj];
			}
		}
	}
	return -1;
}
window.onload = function(){
	begin_game();
	pinTablero();
}
