/*
 * Simplex - class
 * o Used to initiate a Simplex program (<code>)
 * o Purpose is that multiple programs can be
 *   run at once
 */
function Simplex(code){
	this.Macros       = [];	// to hold the macros
	this.StripField   = [new Strip()];	// to hold the strips
	this.StripPointer = 0;
	this.index = 0;
	this.step = 0;
	this.commands = {
		"A": function(s){
			s.
		}
	}
}

Simplex.prototype.getCommand = function(f){
	if(+f==f) return function(s){
		s.StripField[s.StripPointer].write(+f);
	}
	if(this.commands[f]) return this.commands[f];
	throw new Error("Unrecognized symbol: "+f);
}

Simplex.prototype.step = function(){
	
}

// to hold the cells
function Strip(){
	this.strip = [new Cell()];
	this.poiner = 0;
}

Strip.prototype.activeCells = function(){
	return this.strip.reduce(function(p,c){
		return +c.written;
	},0);
}

Strip.prototype.get = function(index){
	return this.strip[index];
}

Strip.prototype.write = function(value){
	this.strip[index]
}

Strip.prototype.getVal = function(index,getImag){
	getImag = getImag || false;
	if(!getImag) return this.strip[index].real;
	return [this.strip[index].real,this.strip[index].imag];
}

function BigNumber(num){
	this.integer = Math.floor(num);
	this.decimal = (num - this.integer).toString().split("");
	this.integer = this.integer.toString().split("").reverse();
	this.decimal.shift();
}

BigNumber.prototype.valueOf = function(){
	return +(this.integer.reverse().concat(["."].concat(this.decimal))).join("");
}

BigNumber.prototype.checkFlow = function(){
	for(var i=0;i<this.integer.length;i++){
		if(this.integer[i]>10){
			this.integer[i] -= 10;
			this.integer[i+1] = (this.integer[i+1]||0)+1;
		} else if(this.integer[i]<0){
			this.integer[i]+=10;
			this.integer[i+1]-=1;
		}
	}
}

BigNumber.prototype.add = function(num){
	var minLen = Math.min(num.int.length,this.integer.length);
	for(i=0;i<minLen;i++){
		this.integer[i] += num.int[i];
	}
	this.checkFlow();
}

var a = new BigNumber(345.76);

function Cell(real,imag){
	this.real    = real || 0;
	this.imag    = imag || 0;
	this.base    = base || 10;
	this.written = !!(real||imag);
}

Cell.prototype.toString = function(){
	var sgnImag = this.imag == 0 ? 0 : this.imag < 0 ? "" : "+";
	return "("+this.real+(sgnImag!==0?sgnImag+this.imag+"i":"")+")_"+this.base;
}

Cell.prototype.valueOf = function(){
	return this.real;
}

Cell.prototype.write = function(real,imag){
	this.real = real || this.real;
	this.imag = imag || this.imag;
}

/*
 * tokenize - function
 * o Given a code, split it up into array of tokens
 */
function tokenize(code){
	// split
	code = code.match(/\^.|./g);
	// depth
	var depth = [0,0];
	var open  = "[{";
	var close = "]}";
	for(var i=0;i<code.length;i++){
		var ind1 = open.indexOf(code[i]);
		var ind2 = close.indexOf(code[i]);
		if(ind1+1){
			code[i]+=depth[ind1]++;
		} else if(ind2+1){
			code[i]+=--depth[ind2];
		}
	}
	return code;
}

