z=function(r){return isNaN(r)||!isFinite(r)||r%1||2>r?!1:r==l(r)?!0:!1},l=function(r){if(isNaN(r)||!isFinite(r))return 0/0;if(0==r)return 0;if(r%1||2>r*r)return 1;if(r%2==0)return 2;if(r%3==0)return 3;if(r%5==0)return 5;for(var q=Math.sqrt(r),t=7;q>=t;t+=30){if(r%t==0)return t;if(r%(t+4)==0)return t+4;if(r%(t+6)==0)return t+6;if(r%(t+10)==0)return t+10;if(r%(t+12)==0)return t+12;if(r%(t+16)==0)return t+16;if(r%(t+22)==0)return t+22;if(r%(t+24)==0)return t+24}return r};

var msgs = true;
//window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){console.log(Array.prototype.slice.call(arguments))}};

bf = "~~ BF INTERPRETER\n\
~~ Conor O'Brien\n\
br{j\">\"=?[v\"R\";Ru]\"<\"=?[v\"L\";Ru]\"+\"=?[v\"I\";Ru]\"-\"=?[v\"M\";Ru]\".\"=?[v\"s\";Ru]\",\"=?[v\"G\";Ru]\"[\"=?[v\"{\";Ru]\"]\"=?[v\"}\";Ru]LL}\n\
# # # # #\n\
br{j\n\
    \">\" =? [v\"R\";Ru]\n\
    \"<\" =? [v\"L\";Ru]\n\
    \"+\" =? [v\"I\";Ru]\n\
    \"-\" =? [v\"M\";Ru]\n\
    \".\" =? [v\"s\";Ru]\n\
    \",\" =? [v\"G\";Ru]\n\
    \"[\" =? [v\"{\";Ru]\n\
    \"]\" =? [v\"}\";Ru]\n\
LL}";

function check(str,c1,c2){
	depth = 0;
	str = str.split("");
	for(var z=0;z<str.length;z++){
		if(str[z]==c1) str[z]+=depth++;
		if(str[z]==c2) str[z]+=--depth;
		if(depth<0) throw new Error("Unmatched "+c1+" at position "+z);
	}
	if(depth) throw new Error("EOF met whilst scanning for matching "+c2);
	return str;
}

function load(str){
	document.getElementById("input").value = str;
}

var codes = 0;

funcDict = ["*","^","+","-","/"];
funcs    = [(x,y)=>x*y,(x,y)=>Math.pow(x,y),(x,y)=>x+y,(x,y)=>x-y,(x,y)=>x/y];

function getFunc(term){
	ret = funcs[funcDict.indexOf(term)];
	if(ret) return ret;
	console.console.log(term);
	throw new Error("Unrecognized term: "+term);
}

function STDOUT(a){
	alert(a);
}

function save(){
	var textToWrite = document.getElementById("input").value.replace(/\n/g,"\\n");
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "code_"+codes+++".txt";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null){
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	} else {
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = function(e){document.body.removeChild(e.target)};
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

Array.prototype.max = function(){
	return Math.max.apply(null, this);
}

Array.prototype.min = function(){
	return Math.min.apply(null, this);
}

m=(s,x,a=s)=>x-1>0?m(s+a,x-1,a):s;

function minify(code){
	code = code.replace(/~~.+$/mg,"").replace(/\n/g,"");
	r    = true;
	while(r){
		r    = /\((.+?)\)(\d+)/g.exec(code);
		if(r) code = code.replace(r[0],m(r[1],+r[2]));
	}
	return code;
}

function w(a){
	try {
		interpret(a);
	} catch(e){
		console.log(e);
		STDOUT(e);
	}
}

keywords = {
	"A": function(a,b,c,d,i,o){
		a[b-1]=a[b-1]||0;
		a[b-1]+=a[b];
		a[b]=0;
		b--;
		return [a,b,c,d,i,o];
	},
	"B": function(a,b,c,d,i,o){
		a[b]=+Number(a[b]).toString(2);
		return [a,b,c,d,i,o];
	},
	"C": function(a,b,c,d,i,o){
		
		return [a,b,c,d,i,o];
	},
	"D": function(a,b,c,d,i,o){
		a[b]*=2;
		return [a,b,c,d,i,o];
	},
	"E": function(a,b,c,d,i,o){
		a[b-1]=a[b-1]||0;
		a[b-1]=Math.pow(a[b-1],a[b]);
		a[b]=0;
		b--;
		return [a,b,c,d,i,o];
	},
	"F": function(a,b,c,d,i,o){
		
		
		tem=+a[b];
		a[b]=0;
		i-=tem;
		return [a,b,c,d,i,o];
	},
	"G": function(a,b,c,d,i,o){
		a[b]*=10;
		a[b]+=String.chardAt(prompt()[0]);
		return [a,b,c,d,i,o];
	},
	/*"H": function(a,b,c,d,i,o){
		switch(a[b]){
			case 0: a="Hello, world!"; break;
			case 1: a="Hello, World!"; break;
			case 2: a="hello, world!"; break;
			case 3: a="hello world!"; break;
			case 4: a="hello world"; break;
			case 5: a="Hello world"; break;
			default:a="Hello, "+prompt()+"!"; break;
		}
		STDOUT(a);
		return [a,b,c,d,i,o];
	},*/
	"H": function(a,b,c,d,i,o){
		a = a.sort();
		return [a,0,c];
	},
	"I": function(a,b,c,d,i,o){
		a[b]++;
		return [a,b,c,d,i,o];
	},
	"J": function(a,b,c,d,i,o){
		a[b]<<=1;
		return [a,b,c,d,i,o];
	},
	"K": function(a,b,c,d,i,o){
		a[b]>>=1;
		return [a,b,c,d,i,o];
	},
	"L": function(a,b,c,d,i,o){
		b--;
		a[b]=a[b]||0;
		return [a,b,c,d,i,o];
	},
	"M": function(a,b,c,d,i,o){
		a[b]--;
		return [a,b,c,d,i,o];
	},
	"N": function(a,b,c,d,i,o){
		tem=+a[b];
		a[b]=0;
		b-=tem;
		console.log(b,"!");
		return [a,b,c,d,i,o];
	},
	"O": function(a,b,c,d,i,o){
		i=a[b];
		inc=false;
		return [a,b,c,d,i,o];
	},
	"P": function(a,b,c,d,i,o){
		k = z(a[b]);
		STDOUT(k?"prime":"composite");
		a[b]=+k;
		return [a,b,c,d,i,o];
	},
	"Q": function(a,b,c,d,i,o){
		marker = (a[b]==0?i:i-a[b]);
		o+=d.slice(0,marker+1);
		return [a,b,c,d,i,o];
	},
	"R": function(a,b,c,d,i,o){
		b++;
		a[b]=a[b]||0;
		return [a,b,c,d,i,o];
	},
	"S": function(a,b,c,d,i,o){
		a[b-1]=a[b-1]||0;
		a[b-1]-=a[b];
		a[b]=0;
		b--;
		return [a,b,c,d,i,o];
	},
	"T": function(a,b,c,d,i,o){
		a[b-1]=a[b-1];
		a[b-1]*=a[b];
		a[b]=0;
		b--;
		return [a,b,c,d,i,o];
	},
	"U": function(a,b,c,d,i,o){
		a[b]/=2;
		return [a,b,c,d,i,o];
	},
	"V": function(a,b,c,d,i,o){
		a[b-1]=a[b-1]||0;
		a[b-1]/=a[b];
		a[b]=0;
		b--;
		return [a,b,c,d,i,o];
	},
	"W": function(a,b,c,d,i,o){
		a[b]=Math.round(a[b]);
		return [a,b,c,d,i,o];
	},
	"X": function(a,b,c,d,i,o){
		if(Math.random()<.5){
			a=1;
		} else {
			a=-1;
		}
		i+=a;
		inc=false;
		return [a,b,c,d,i,o];
	},
	"Y": function(a,b,c,d,i,o){
		a[b]=Math.floor(a[b]);
		return [a,b,c,d,i,o];
	},
	"Z": function(a,b,c,d,i,o){
		a[b]=Math.ceil(a[b]);
		return [a,b,c,d,i,o];
	},
	"a": function(a,b,c,d,i,o){
		a[b]=-a[b];
		return [a,b,c,d,i,o];
	},
	"b": function(a,b,c,d,i,o){
		p=prompt().split("");
		console.log(p,p.length);
		for(var k=0;k<p.length;k++){
			a[b]=p[k].chardAt();
			b++;
		}
		a[b]=a[b]||0;
		console.log("arret");
		return [a,b,c,d,i,o];
	},
	"c": function(a,b,c,d,i,o){
		a[b+1]=a[b];
		return [a,b,c,d,i,o];
	},
	"d": function(a,b,c,d,i,o){
		keys=Array.from(Object.keys(a).map(Number));
		for(var i=keys.min();i<=keys.max();i++){
			key1 = a[keys[i]];
			key2 = a[keys[keys.max()-i]];
			console.log(key1,key2);
		}
		return [a,b,c,d,i,o];
	},
	"e": function(a,b,c,d,i,o){
		STDOUT(a[b]%2==0?"even":"odd");
		return [a,b,c,d,i,o];
	},
	"f": function(a,b,c,d,i,o){
		if(!safetyMode){
			STDOUT("SAFETY IS OFF!!!");
			STDOUT("...");
			STDOUT("You don't really d, do you?");
			STDOUT("Here, have a number.");
			STDOUT("...");
			STDOUT("42");
			throw new Error("Division by zero encountered: MDExMTEwMDEgMDExMDExMTEgMDExMTAxMDEgMDAxMDAwMDAgMDExMTAxMTEgMDExMDEwMDEgMDExMDExMDAgMDExMDExMDAgMDAxMDAwMDAgMDExMDAxMTAgMDExMDEwMDEgMDExMDExMTAgMDExMDAxMDAgMDAxMDAwMDAgMDExMDExMTAgMDExMDExMTEgMDAxMDAwMDAgMDExMDEwMDAgMDExMDExMTEgMDExMTAwMDAgMDExMDAxMDEgMDAxMDAwMDAgMDExMDEwMDAgMDExMDAxMDEgMDExMTAwMTAgMDExMDAxMDEg")
		} else {
			safetyMode = false;
			console.log("Safety's off. You're on your own, now.");
		}
		return [a,b,c,d,i,o];
	},
	"g": function(a,b,c,d,i,o){
		keys=Array.from(Object.keys(a).map(Number));
		st="";
		for(var i=keys.min();i<=keys.max();i++){
			st+=String.fromChard(a[keys[i]]);
		}
		STDOUT(st);
		a   = {0:0};
		b = 0;
		return [a,b,c,d,i,o];
	},
	"i": function(a,b,c,d,i,o){
		a[b]=parseInt(prompt(),10);
		return [a,b,c,d,i,o];
	},
	"j": function(a,b,c,d,i,o){
		keys=Array.from(Object.keys(a).map(Number));
		console.log(keys,keys.max(),b);
		sp=0+keys.max();
		for(var ki=sp;ki>b;ki--){
			a[ki+1]=a[ki];
		}
		b++;
		a[b] = 0;
		return [a,b,c,d,i,o];
	},
	"l": function(a,b,c,d,i,o){
		count=0;
		keys=Array.from(Object.keys(a).map(Number));
		for(var i=keys.min();i<=keys.max();i++){
			if(a[keys[i]]) count++;
		}
		a[b]=count;
		return [a,b,c,d,i,o];
	},
	"m": function(a,b,c,d,i,o){
		a[b]=b;
		return [a,b,c,d,i,o];
	},
	"n": function(a,b,c,d,i,o){
		a[b]=+!a[b];
		return [a,b,c,d,i,o];
	},
	"o": function(a,b,c,d,i,o){
		STDOUT(a[b]);
		return [a,b,c,d,i,o];
	},
	"p": function(a,b,c,d,i,o){
		a[b]=+z(a[b]);
		return [a,b,c,d,i,o];
	},
	"q": function(a,b,c,d,i,o){
		M = a[b];
		if(!Array.isArray(a[b-1])) throw new Error(a[b-1]+" is not a tuple!");
		a[b] = +(a[b-1].indexOf(M)>-1);
		return [a,b,c,d,i,o];
	},
	"r": function(a,b,c,d,i,o){
		a[b]=+((a[b]+"").split("").reverse().join(""));
		return [a,b,c,d,i,o];
	},
	"s": function(a,b,c,d,i,o){
		STDOUT(String.fromCharCode(a[b]));
		return [a,b,c,d,i,o];
	},
	"t": function(a,b,c,d,i,o){
		chrNxt = d[i+increment];
		i+=increment;
		keys=Array.from(Object.keys(a).map(Number));
		rb = +b;
		for(var k=keys.min();k<=keys.max();k++){
			b=k;
			getCommand[chrNxt];
		}
		return [a,b,c,d,i,o];
	},
	"x": function(a,b,c,d,i,o){
		a[b]=0;
		var thd = prompt("Continue?");
		a[b]=+!!+thd||(thd||"").search(/y(es)?/gi)+1;
		return [a,b,c,d,i,o];
	},
	"y": function(a,b,c,d,i,o){
		switch(typeof a[b]){
			case "number":
				n = a[b];
				arr = [];
				for(var q=0;q<n;q++){
					arr.push(a[b-q-1]);
					a[b-q-1] = 0;
				}
				a[b] = 0;
				a[b-n] = arr.reverse();
				b-=n;
			default:
				n = a[b].length;
				ar = a[b].concat([]);
				for(var q=0;q<n;q++){
					a[b+q]=ar[q];
				}
				b+=n;
			break;
		}
		return [a,b,c,d,i,o];
	},
	"z": function(a,b,c,d,i,o){
		a[b]=0;
		return [a,b,c,d,i,o];
	},
	"|": function(a,b,c,d,i,o){
		increment = -increment;
		return [a,b,c,d,i,o];
	},
	"~": function(a,b,c,d,i,o){
		STDOUT(2014+a[b]);
		return [a,b,c,d,i,o];
	},
	"?": function(a,b,c,d,i,o){
		tI=i;
		if(increment>0){
			if(d[i+1]=="["){
				tI=d.indexOf("]",i+1);
				
			}
			console.log(tI);
			i+=a[b]?0:(tI||1);
		} else {
			if(d[i-1]=="]"){
				tI=d.lastIndexOf("]",i-1);
				
			}
			console.log(tI);
			i-=a[b]?0:(tI||1);
		}
		return [a,b,c,d,i,o];
	},
	String.fromCharCode(8253): function(a,b,c,d,i,o){
		STDOUT("Working");
	},
	"#": function(a,b,c,d,i,o){
		terminate();
	},
	"\"":function(a,b,c,d,i,o){
		stringMode = !stringMode;
		return [a,b,c,d,i,o];
	},
	" ": function(a,b,c,d,i,o){
		
		return [a,b,c,d,i,o];
	},
	"[": function(a,b,c,d,i,o){
		
		return [a,b,c,d,i,o];
	},
	"]": function(a,b,c,d,i,o){
		
		return [a,b,c,d,i,o];
	},
	";": function(a,b,c,d,i,o){
		outerProgram+=String.fromChard(a[b]);
		return [a,b,c,d,i,o];
	},
	"%": function(a,b,c,d,i,o){
		a[b-1]=new Byte(a[b-1])
		a[b-1]=a[b-1] % a[b];
		a[b]=new Byte(new Byte());
		b--;
		return [a,b,c,d,i,o];
	},
	/*"@": function(a,b,c,d,i,o){
		STDOUT(atob("V2UncmUgbm8gc3RyYW5nZXJzIHRvIGxvdmUKWW9\
					1IGtub3cgdGhlIHJ1bGVzIGFuZCBzbyBkbyBJCkE\
					gZnVsbCBjb21taXRtZW50J3Mgd2hhdCBJJ20gdGhp\
					bmtpbmcgb2YKWW91IHdvdWxkbid0IGdldCB0aGlzIG\
					Zyb20gYW55IG90aGVyIGd1eQpJIGp1c3Qgd2FubmEgd\
					GVsbCB5b3UgaG93IEknbSBmZWVsaW5nCkdvdHRhIG1ha\
					2UgeW91IHVuZGVyc3RhbmQKCk5ldmVyIGdvbm5hIGdpdm\
					UgeW91IHVwCk5ldmVyIGdvbm5hIGxldCB5b3UgZG93bgpO\
					ZXZlciBnb25uYSBydW4gYXJvdW5kIGFuZCBkZXNlcnQgeW9\
					1Ck5ldmVyIGdvbm5hIG1ha2UgeW91IGNyeQpOZXZlciBnb2\
					5uYSBzYXkgZ29vZGJ5ZQpOZXZlciBnb25uYSB0ZWxsIGEgb\
					GllIGFuZCBodXJ0IHlvdQoKV2UndmUga25vd24gZWFjaCBv\
					dGhlciBmb3Igc28gbG9uZwpZb3VyIGhlYXJ0J3MgYmVlbiB\
					hY2hpbmcgYnV0CllvdSdyZSB0b28gc2h5IHRvIHNheSBpdA\
					pJbnNpZGUgd2UgYm90aCBrbm93IHdoYXQncyBiZWVuIGdva\
					W5nIG9uCldlIGtub3cgdGhlIGdhbWUgYW5kIHdlJ3JlIGdv\
					bm5hIHBsYXkgaXQKQW5kIGlmIHlvdSBhc2sgbWUgaG93IEk\
					nbSBmZWVsaW5nCkRvbid0IHRlbGwgbWUgeW91J3JlIHRvby\
					BibGluZCB0byBzZWUKCk5ldmVyIGdvbm5hIGdpdmUgeW91I\
					HVwCk5ldmVyIGdvbm5hIGxldCB5b3UgZG93bgpOZXZlciBn\
					b25uYSBydW4gYXJvdW5kIGFuZCBkZXNlcnQgeW91Ck5ldmV\
					yIGdvbm5hIG1ha2UgeW91IGNyeQpOZXZlciBnb25uYSBzYX\
					kgZ29vZGJ5ZQpOZXZlciBnb25uYSB0ZWxsIGEgbGllIGFuZ\
					CBodXJ0IHlvdQoKTmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXAK\
					TmV2ZXIgZ29ubmEgbGV0IHlvdSBkb3duCk5ldmVyIGdvbm5\
					hIHJ1biBhcm91bmQgYW5kIGRlc2VydCB5b3UKTmV2ZXIgZ2\
					9ubmEgbWFrZSB5b3UgY3J5Ck5ldmVyIGdvbm5hIHNheSBnb\
					29kYnllCk5ldmVyIGdvbm5hIHRlbGwgYSBsaWUgYW5kIGh1\
					cnQgeW91CgooT29oLCBnaXZlIHlvdSB1cCkKKE9vaCwgZ2l\
					2ZSB5b3UgdXApCihPb2gpCk5ldmVyIGdvbm5hIGdpdmUsIG\
					5ldmVyIGdvbm5hIGdpdmUKKEdpdmUgeW91IHVwKQooT29oK\
					QpOZXZlciBnb25uYSBnaXZlLCBuZXZlciBnb25uYSBnaXZl\
					CihHaXZlIHlvdSB1cCkKCldlJ3ZlIGtub3cgZWFjaCBvdGh\
					lciBmb3Igc28gbG9uZwpZb3VyIGhlYXJ0J3MgYmVlbiBhY2\
					hpbmcgYnV0CllvdSdyZSB0b28gc2h5IHRvIHNheSBpdApJb\
					nNpZGUgd2UgYm90aCBrbm93IHdoYXQncyBiZWVuIGdvaW5n\
					IG9uCldlIGtub3cgdGhlIGdhbWUgYW5kIHdlJ3JlIGdvbm5\
					hIHBsYXkgaXQKCkkganVzdCB3YW5uYSB0ZWxsIHlvdSBob3\
					cgSSdtIGZlZWxpbmcKR290dGEgbWFrZSB5b3UgdW5kZXJzd\
					GFuZAoKTmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXAKTmV2ZXIg\
					Z29ubmEgbGV0IHlvdSBkb3duCk5ldmVyIGdvbm5hIHJ1biB\
					hcm91bmQgYW5kIGRlc2VydCB5b3UKTmV2ZXIgZ29ubmEgbW\
					FrZSB5b3UgY3J5Ck5ldmVyIGdvbm5hIHNheSBnb29kYnllC\
					k5ldmVyIGdvbm5hIHRlbGwgYSBsaWUgYW5kIGh1cnQgeW91\
					CgpOZXZlciBnb25uYSBnaXZlIHlvdSB1cApOZXZlciBnb25\
					uYSBsZXQgeW91IGRvd24KTmV2ZXIgZ29ubmEgcnVuIGFyb3\
					VuZCBhbmQgZGVzZXJ0IHlvdQpOZXZlciBnb25uYSBtYWtlI\
					HlvdSBjcnkKTmV2ZXIgZ29ubmEgc2F5IGdvb2RieWUKTmV2\
					ZXIgZ29ubmEgdGVsbCBhIGxpZSBhbmQgaHVydCB5b3UKCk5\
					ldmVyIGdvbm5hIGdpdmUgeW91IHVwCk5ldmVyIGdvbm5hIG\
					xldCB5b3UgZG93bgpOZXZlciBnb25uYSBydW4gYXJvdW5kI\
					GFuZCBkZXNlcnQgeW91Ck5ldmVyIGdvbm5hIG1ha2UgeW91\
					IGNyeQpOZXZlciBnb25uYSBzYXkgZ29vZGJ5ZQpOZXZlciB\
					nb25uYSB0ZWxsIGEgbGllIGFuZCBodXJ0IHlvdQ=="));
		return [a,b,c,d,i,o];
	},*/
	"!": function(a,b,c,d,i,o){
		return [a,b,c,d,i,o];
	},
	"`": function(a,b,c,d,i,o){
		STDOUT(o);
		o = "";
		window.grave = true;
		return [a,b,c,d,i,o];
	},
	"'": function(a,b,c,d,i,o){
		a[b]=d[i+1].charCodeAt();
		return [a,b,c,d,i+1,o];
	},
	"": function(a,b,c,d,i,o){
		// ...
		return [a,b,c,d,i,o];
	}
}

function getCommand(keyword){
	if(+keyword) return (function(a,b,c,d,e){
		//a[b]=a[b]||0;//uncomment if something goes wrong.
		a[b]*=10;
		a[b]+=+keyword;
		return [a,b,c,d,e];
	});
	ret = keywords[keyword];
	if(!ret) throw new Error("Invalid keyword: "+keyword);
	return ret;
}

function interpret(code){
	if(code.search("OPTION EXPLICIT\n")==0){
		code=code.split("\n");
		code.shift();
		for(var i=0;i<code.length;i++){
			r=/say|speak|echo|print|shout|croon|out(put)*/gi;
			say = !code[i].search(r);
			code[i]=code[i].replace(r,"");
			if(i) code[i]=code[i].replace(/ans/gi,code[i-1]);
			var r=/([-*0123456789.]+)\s*([+-/^%*])\s*(-*[0123456789.]+)/g;
			var n1=+code[i].replace(r,"$1");
			var o=code[i].replace(r,"$2");
			var n2=+code[i].replace(r,"$3");
			n2++;
			code[i]=eval((n1+o+n2).replace(/(.+)\^(.+)/g,"Math.pow($1,$2)"));
			if(say) STDOUT(code[i]);
		}
		return;
	}
	code = minify(code);
	stripCo      = {};
	stripCo[0]   = {strip:[0],pointer:0};
	stripPointer = 0;
	increment=1;
	window.grave=false;
	commentMode=false;
	safetyMode=true;
	stringMode=false;
	outerProgram="";
	console.log(code);
	for(var i=0;i<code.length;){
		strip   = stripCo[stripPointer].strip;
		pointer = stripCo[stripPointer].pointer;
		inc=true;
		var chr = code[i];
		console.log(strip,pointer,chr,i);
		if(chr=="!") commentMode = !commentMode;
		console.log(commentMode,"!",i);
		if(!(commentMode||stringMode)){
			tbR = +stripPointer;
			A = getCommand(chr);
			A = A(strip,pointer,stripPointer,code,i,outerProgram);
			stripCo[tbR].strip   = A[0];
			stripCo[tbR].pointer = A[1];
			stripPointer         = A[2];
			code                 = A[3] || code;
			i                    = A[4] || i;
			outerProgram         = A[5] || "";
			console.log(outerProgram);
			if(A[0]<0) throw new RangeError("Invalid index");
			if(i<0) i = Infinity;
			if(inc) i+=increment;
		} else if(stringMode){
			if(chr=="^"){	// escape character
				strip[pointer]=code[i+increment].charCodeAt();
				i+=increment;
			} else if(chr=="\""){
				stringMode = !stringMode;
			} else {
				strip[pointer]=chr.charCodeAt();
			}
			pointer++;
			if(inc) i+=increment;
		} else if(commentMode){
			i+=increment;
		}
	}
	console.log(strip,pointer,chr,i);
	if(outerProgram&&!grave) setTimeout(w,20,outerProgram,"Evaluating outer program");
	else STDOUT("Program terminated.")
}
locinc = 0;
window.addEventListener("load",function(){
	setInterval(function(){
		input=document.getElementById("input");
		input.value = input.value.replace(/\\n/g,"\n").replace(/\\t/g,"\t").replace(/!?|?!/g,String.fromCharCode(8253));
	},20);
});
