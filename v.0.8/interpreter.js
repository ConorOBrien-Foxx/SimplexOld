// version.0.8 commands
const v0_8 = {
	"A": function(s){
		
	},
	"B": function(s){
		
	},
	"C": function(s){
		
	},
	"D": function(s){
		
	},
	"E": function(s){
		
	},
	"F": function(s){
		
	},
	"G": function(s){
		
	},
	"H": function(s){
		
	},
	"I": function(s){
		s.StripField[s.StripPointer].exec("+1");
	},
	"J": function(s){
		
	},
	"K": function(s){
		
	},
	"L": function(s){
		
	},
	"M": function(s){
		
	},
	"N": function(s){
		
	},
	"O": function(s){
		
	},
	"P": function(s){
		
	},
	"Q": function(s){
		
	},
	"R": function(s){
		
	},
	"S": function(s){
		
	},
	"T": function(s){
		
	},
	"U": function(s){
		
	},
	"V": function(s){
		
	},
	"W": function(s){
		
	},
	"X": function(s){
		
	},
	"Y": function(s){
		
	},
	"Z": function(s){
		
	},
	"[": function(s){
		
	},
	"\\": function(s){
		
	},
	"]": function(s){
		
	},
	"^": function(s){
		
	},
	"_": function(s){
		
	},
	"`": function(s){
		
	},
	"a": function(s){
		
	},
	"b": function(s){
		
	},
	"c": function(s){
		
	},
	"d": function(s){
		
	},
	"e": function(s){
		
	},
	"f": function(s){
		this.safetyMode++;
		if(this.safetyMode>2) this.safetyMode = 0;
	},
	"g": function(s){
		
	},
	"h": function(s){
		
	},
	"i": function(s){
		
	},
	"j": function(s){
		
	},
	"k": function(s){
		
	},
	"l": function(s){
		
	},
	"m": function(s){
		
	},
	"n": function(s){
		this.STDOUT(s.StripField[s.StripPointer].toString());
	},
	"o": function(s){
		
	},
	"p": function(s){
		
	},
	"q": function(s){
		
	},
	"r": function(s){
		
	},
	"s": function(s){
		
	},
	"t": function(s){
		
	},
	"u": function(s){
		
	},
	"v": function(s){
		
	},
	"w": function(s){
		
	},
	"x": function(s){
		
	},
	"y": function(s){
		
	},
	"z": function(s){
		
	},
	"{": function(s){
		
	},
	"|": function(s){
		
	},
	"}": function(s){
		
	},
	"~": function(s){
		
	}
}

/*
 * Simplex - class
 * o Used to initiate a Simplex program (<code>)
 * o Purpose is that multiple programs can be
 *   run at once
 */
function Simplex(code){
	this.code = code;
	this.Macros       = [];	// to hold the macros
	this.StripField   = [new Strip()];	// to hold the strips
	this.inputStack   = [];
	this.lambdaStack  = [];
	this.StripPointer = 0;
	this.index        = 0;
	this.stepNum      = 0;
	this.safetyMode   = true;
	this.commands     = v0_8;
}

Simplex.prototype.STDERR = function(error){
	
}

Simplex.prototype.STDOUT = function(msg){
	alert(msg);
}

Simplex.prototype.STDIN = function(feed){
	
}

Simplex.prototype.disp = function(){
	return JSON.stringify(this.curStrip().strip.map(x=>x.toString()));
}

Simplex.prototype.curStrip = function(){
	return this.StripField[this.StripPointer];
}

function complex(v){
	if(v==parseInt(v)) return {real:+v,imag:0};
	try {
		var pm = /\+|-/;
		var r=v.replace(/i/,"").split(pm);
		if(r.length==2)
			return {real:+r[0],imag:parseInt(v.match(pm)[0]+r[1],10)};
		else if(r.length==1)
			return {real:v.search(/i/)+1?0:+r[0],imag:v.search(/i/)+1?+r[0]:0};
	} catch(e){
		throw new Error("Invalid complex number: "+v);
	}
}

Simplex.prototype.getCommand = function(f){
	if(f==parseInt(f)) return function(s){
		s.StripField[s.StripPointer].write(+f);
	}
	if(this.commands[f]) return this.commands[f];
	throw new Error("Unrecognized symbol: "+f);
}

Simplex.prototype.step = function(){
	try {
	var chr = this.code[this.index];
	var f = this.getCommand(chr);
	if(f) f(this);
	this.index++;
	} catch(e){
		console.log(e);
	}
}

// to hold the cells
function Strip(){
	this.strip = [new Cell()];
	this.pointer = 0;
}

Strip.prototype.activeCells = function(){
	return this.strip.reduce(function(p,c){
		return +c.written;
	},0);
}

Strip.prototype.get = function(index){
	index = index||this.pointer;
	return this.strip[index];
}

Strip.prototype.write = function(value,ind){
	this.strip[(ind||this.pointer)].write(complex(value));
}

Strip.prototype.getVal = function(index,getImag){
	getImag = getImag || false;
	if(!getImag) return this.strip[index].real;
	return [this.strip[index].real,this.strip[index].imag];
}

Strip.prototype.exec = function(str,index){
	eval("this.write((this.get("+index+").real"+str+")+\"+\"+(this.get("+index+").real+\"i\"));");
}

{ // wip
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
}

function Cell(real,imag,base){
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

