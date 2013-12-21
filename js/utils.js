// событие вызывается через обращение к примеру: utils.event.trigger в файле index.js
var utils = {	// выбор фунций
	
	removeClass: function(node, className) {		// очистка класса
		var removedClass = node.className;
		var pattern = new RegExp("(^| )" + className + "( |$)");
		removedClass = removedClass.replace(pattern, "$1");
		removedClass = removedClass.replace(/ $/, "");
		node.className = removedClass;
		return (true);
	},
	addClass: function(node, className) {	// убирает выходящие сообщения при нажатии на x
		if(!utils.hasClass(node, className)) {
			if(node.className == "") {
				node.className = className;
			} else {
				node.className += " " + className;
			}
		}
		return (true);
	},
	toggleClass: function(node, className) {	// выбор действия (переключение действия)
		return (utils[utils.hasClass(node, className) ? "removeClass" : "addClass"](node, className));
	},
	hasClass: function(node, className) {
		var pattern = new RegExp("(^| )" + className + "( |$)");
		return (!!node.className.match(pattern));
	},
	addEvent: function(el, eventName, callback, useCapture) {
		if(el.addEventListener) {	// addEventListener - это событие без префикса "on" ("click", "mousemove")
			el.addEventListener(eventName, callback, useCapture);
		} else if(el.attachEvent) {	//  attachEvent (on + событие, обработчик события)
			el.attachEvent('on' + eventName, callback);
		}
	},
	
	"event": {		// выбор событий
		"events": [],
		"getEvent": function(id) {
			for (var i = 0, l = this.events.length; i < l; i++) if(this.events[i].id == id) return i;
			return false;
		},
		"addEvent": function(id) {
			this.events.push({ "id": id, "handlers": [] });
		},
		"listen": function(eventName, callback) {
			if(!this.getEvent(eventName)) this.addEvent(eventName);
			var index = this.getEvent(eventName);
			if(index || index === 0) this.events[index].handlers.push(callback);
		},
		"trigger": function(eventName, data) {
			var index = this.getEvent(eventName);
			if(index || index === 0) for (var i = 0, m = this.events[index], l = m.handlers.length; i < l; i++) {
				var callback = (function(index, data) {
					return function() {
						try {
							m.handlers[index](data);
						} catch (e) {
						}
					}
				})(i, data)
				setTimeout(callback, 5);
			}
		}
	}
};

function resizeBoard() {		// выбор масштаба доски
	var w = getwindowWidth() * 0.7; // коэффициент выбора 
	var h = getwindowHeight() * 0.7;	// коэффициент выбора 
	var node = document.getElementById("board");
	if(w > h) {
		w = h;
	} else {
		h = w;
	}
	node.style.width = w + "px";
	node.style.height = h + "px";
}

function getwindowWidth() {		// получение размеща экрана в пикселях (широта)
	if(window.innerWidth) {
		windowWidth = window.innerWidth;
	} else if(document.documentElement && document.documentElement.clientWidth) {
		windowWidth = document.documentElement.clientWidth;
	} else if(document.body.clientWidth) {
		windowWidth = document.body.clientWidth;
	}
	return windowWidth;
}
function getwindowHeight() {	// получение размеща экрана в пикселях (высота)
	if(window.innerHeight) {
		windowHeight = window.innerHeight;
	} else if(document.documentElement && document.documentElement.clientHeight) {
		windowHeight = document.documentElement.clientHeight;
	} else if(document.body.clientHeight) {
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}