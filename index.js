var paper_number = 1;
var paper_number_max = 1;
var tar,si,nge,zan;
var POX,POY,PoX,PoY,PL,PH;
var si = 0;
var pH = "";

function tic() {
	
	si++;
	if (si > tar.length) {
		si = 0;
		zan = 0;
		setTimeout("RC();", 0);
	}
	else {
		nge = tar.charAt(si-1);
		if (nge == " ") {
			pap.innerHTML = pH + "<span class='cursor'>|</span>";
			pH += "&nbsp;";
			setTimeout("P5();", 0);
		}
		else if (nge == "|") {
			zan = 0;
			setTimeout("RC();", 0);
		} 
		else if (nge == "<") {
			h = tar.substring(si-1,99999);
			h = h.substring(0,h.indexOf(">")+1);
			pap.innerHTML = pH + "<span class='cursor'>|</span>" + h;
			pH += h;
			si += h.length-1;
			setTimeout("P5();", 0);
		}
		else setTimeout("P3();", 0);
	}
}

function retic() {
	pH = "";
	pap.innerHTML = "";
	PoX = POX;
	PoY = POY;
	/*pap.style.left = POX;
	pap.style.top  = POY;*/
	
	paper_number++;
	
	if (paper_number > paper_number_max)
		paper_number = 1;
	
	tar = $("#txt-" + paper_number).html();
	tar = tar.replace(new RegExp("\n", "g"), "|");	
	tar = tar.replace(new RegExp("\r", "g"), "");
	setTimeout("tic()", 0);
}

function P3() {
	pH += nge;
	pap.innerHTML = pH + "<span class='cursor'>|</span>";
	setTimeout("P5();", 16);
}

function P5() {
	PoX -= PL;
	pap.style.left = PoX;
	pap.innerHTML  = pH;
	setTimeout("tic();", 0);
}

function RC2() {
	zan += 2;
	if (zan <= PH) {
		PoY -=2;
		pap.style.top = PoY;
		setTimeout("RC2();", 0);
	}
	else {
		if (si == 0) setTimeout("retic();", 5000); 
		else {
			x = 600;
			if (tar.charAt(si) == "|") x=0;
			
			setTimeout("tic();", x);
		}
	}
}

function RC() {
	if (PoX < POX) {
		PoX += PL*2;
		pap.style.left = PoX;
		setTimeout("RC()", 0);
	}
	else {
		pH += "<br>";
		pap.innerHTML = pH;
		setTimeout("RC2()", 32);
	}
}

$(function(){
	pap = document.getElementById("paper");
	paper_number_max = $("#paper_number_max").val();
	POY = Math.round(document.body.offsetHeight/3);
	POX = Math.round(document.body.offsetWidth/3);
	PoX = POX;
	PoY = POY;
	pap.style.left = POX;
	pap.style.top  = POY;
	PL = 8;
	PH = 13.5;
	tar = $("#txt-" + paper_number).html();
    tar = tar.replace(new RegExp("\n", "g"), "|");	
    tar = tar.replace(new RegExp("\r", "g"), "");
	tic();	
});
	