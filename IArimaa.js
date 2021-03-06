var lienzo = document.getElementById("lienzo");
var pluma = lienzo.getContext("2d");
var message = document.getElementById("messages");
message.innerHTML = "Juega oro";
function ut_f(){}
var imTablero = new Image();
var playing_gold = true;
imTablero.src = "Arimaa_big_board.jpg";
var tablero = [];
var tabsim = [];
var p_val = [-13, -8, -5, -3, -2, -1, 0, 1, 2, 3, 5, 8, 13];
function valor(piece){
	return p_val[piece.valor + 6];
}
var alf="abcdefgh";
var dirs="nsew";
var cod = "emhdcrORCDHME";
var P = {
	RAG : {valor: 1,  name: "gold_rabb.jpg",   code: "R"},
	CAG : {valor: 2,  name: "gold_cat.jpg",    code: "C"},
	DOG : {valor: 3,  name: "gold_dog.jpg",    code: "D"},
	HOG : {valor: 4,  name: "gold_hors.jpg",   code: "H"},
	CMG : {valor: 5,  name: "gold_came.jpg",   code: "M"},
	ELG : {valor: 6,  name: "gold_elef.jpg",   code: "E"},
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
	tabsim [iii] = [];
	for (var jjj=0; jjj<8; jjj++){
		tablero[iii][jjj] = P.EMP;
		tabsim[iii][jjj] = P.EMP;
	}
}
function xor(p, q){
	if (p && q || (!p) && (!q)){
		return true;
	}
	return false;
}
function inv(let, lis){
	for (var ii=0; ii<8; ii++){
		if (lis[ii]==let){
			return ii;
		}
	}
	return -1;
}
function copiar(){
	for (var ii=0; ii<8; ii++){
		for (var jj=0; jj<8; jj++){
			tabsim[ii][jj] = tablero[ii][jj];
		}
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
	pluma.drawImage(imTablero, 0, 0);
	for (var ii=0; ii<8; ii++){
		for (var jj=0; jj<8; jj++){
			if (tablero[ii][jj].valor!=0){
				pluma.drawImage(tablero[ii][jj].im, 24.39 + 50*ii, 24.39 + 50*(7 - jj));
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
function simpos(a, b, m){
	if (a<0 || a>7 || b>7 || b<0){
		return -1;
	}
	if (m=="s"){
		if (b==0){
			return -1;
		}
		return tabsim[a][b - 1];
	}
	if (m=="n"){
		if (b==7){
			return -1;
		}
		return tabsim[a][b + 1];
	}
	if (m=="w"){
		if (a==0){
			return -1;
		}
		return tabsim[a - 1][b];
	}
	if (m=="e"){
		if (a==7){
			return -1;
		}
		return tabsim[a + 1][b];
	}
	return -1;
}
function pos(a, b, m){
	if (a<0 || a>7 || b>7 || b<0){
		return -1;
	}
	if (m=="s"){
		if (b==0){
			return -1;
		}
		return tablero[a][b - 1];
	}
	if (m=="n"){
		if (b==7){
			return -1;
		}
		return tablero[a][b + 1];
	}
	if (m=="w"){
		if (a==0){
			return -1;
		}
		return tablero[a - 1][b];
	}
	if (m=="e"){
		if (a==7){
			return -1;
		}
		return tablero[a + 1][b];
	}
	return -1;
}
function simula(wor){
	var a=inv(wor[1], alf);
	var b=parseInt(wor[2]) - 1;
	if (wor[3]=="n"){
		tabsim[a][b + 1] = tabsim[a][b];
	}
	if (wor[3]=="e"){
		tabsim[a + 1][b] = tabsim[a][b];
	}
	if (wor[3]=="s"){
		tabsim[a][b - 1] = tabsim[a][b];
	}
	if (wor[3]=="w"){
		tabsim[a - 1][b] = tabsim[a][b];
	}
	tabsim[a][b]=P.EMP;
	if (a<4){
		a=2;
	} else {
		a=5;
	}
	if (b<4){
		b=2;
	} else {
		b=5;
	}
	if (tabsim[a][b]!=P.EMP){
		bool1 = true;
		color = tabsim[a][b].valor;
		if (tabsim[a + 1][b].valor*color > 0){
			bool1 = false;
		}
		if (tabsim[a][b - 1].valor*color > 0){
			bool1 = false;
		}
		if (tabsim[a][b + 1].valor*color > 0){
			bool1 = false;
		}
		if (tabsim[a - 1][b].valor*color > 0){
			bool1 = false;
		}
		if (bool1){
			tabsim[a][b] = P.EMP;
		}
	}
}
function mover(wor){
	var a=inv(wor[1], alf);
	var b=parseInt(wor[2]) - 1;
	if (tablero[a][b].code != wor[0]){
		console.log("mistake");
	}
	if (wor[3]=="n"){
		tablero[a][b + 1] = tablero[a][b];
	}
	if (wor[3]=="e"){
		tablero[a + 1][b] = tablero[a][b];
	}
	if (wor[3]=="s"){
		tablero[a][b - 1] = tablero[a][b];
	}
	if (wor[3]=="w"){
		tablero[a - 1][b] = tablero[a][b];
	}
	tablero[a][b]=P.EMP;
	if (a<4){
		a=2;
	} else {
		a=5;
	}
	if (b<4){
		b=2;
	} else {
		b=5;
	}
	if (tablero[a][b]!=P.EMP){
		bool1 = true;
		color = tablero[a][b].valor;
		if (tablero[a + 1][b].valor*color > 0){
			bool1 = false;
		}
		if (tablero[a][b - 1].valor*color > 0){
			bool1 = false;
		}
		if (tablero[a][b + 1].valor*color > 0){
			bool1 = false;
		}
		if (tablero[a - 1][b].valor*color > 0){
			bool1 = false;
		}
		if (bool1){
			tablero[a][b] = P.EMP;
		}
	}
}
function do_move(wor){
	var lis = wor.split(" ");
	for (var ii=0; ii<4; ii++){
		mover(lis[ii]);
	}
}
function movable(p, q){
	var k;
	if (playing_gold){
		k = 1;
	} else {
		k = -1;
	}
	var ppp = [];
	for (var ii=0; ii<4; ii++){
		ppp[ii] = simpos(p, q, dirs[ii]);
		if (ppp[ii] != -1){
			if (ppp[ii].valor * k > 0) {
				return true;
			}
		}
	}
	var pp = tabsim[p][q].valor;
	for (var ii=0; ii<4; ii++){
		if (ppp[ii] != -1){
			if ((ppp[ii].valor + pp) * k < 0) {
				console.log("congelada");
				return false;
			}
		}
	}
	return true;
}
function is_good(wor){
	if (wor.length!=4){
		return false;
	}
	var a = inv(wor[1], alf);
	if (a == -1){
		return false;
	}
	var b = parseInt(wor[2]) - 1;
	if (b > 7 || b < 0){
		return false;
	}
	if (tabsim[a][b]==P.EMP){
		return false;
	}
	for (var ii=0; ii<4; ii++){
		if (simpos(a, b, wor[3])!=P.EMP){
			console.log("casilla ocupada");
			return false;
		}
	}
	return true;
}
function is_correct(wor){
	if (is_good(wor)){
		return movable(inv(wor[1], alf), parseInt(wor[2]) - 1);
	}
	return false;
}
function is_legal(str){
	var lis = str.split(" ");
	var col = [];
	for (var ii=0; ii<4; ii++){
		col[ii] = xor(inv(lis[ii][3], cod)>6, playing_gold);
	}
	if (lis.length!=4){
		return false;
	}
	for (var ii=0; ii<4; ii++){
		if (!(is_correct(lis[ii])) ){
			console.log("move: ", ii);
			return false;
		}
		simula(lis[ii]);
	}
	return true;
}
window.onload = function(){
	begin_game();
	pinTablero();
}
function magia(){
	var str = document.getElementById("moveinput").value;
	copiar();
	var bool2 = is_legal(str);
	if (bool2){
		message.innerHTML = "";
		playing_gold = !playing_gold;
		if (playing_gold){
			message.innerHTML = "Juega oro";
		} else {
			message.innerHTML = "Juega plata";
		}
		do_move(str);
		pinTablero();
	} else {
		message.innerHTML = "Movimiento ilegal";
		console.log("syntax mistake");
	}
}
