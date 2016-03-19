/**
 * @author Sam
 */
// лечить мишку так обработать момент когда мишка покидает если она нажата
// обработать
// Only executed our code once the DOM is ready.
window.onload = function() {
Pro = {};
Pro.events = {
		
		rectmouseEnter: function(event) {
		    this.selected = true;
		},
		rectmouseLeave: function(event) {
		    this.selected = false;
		},
		rectmouseDnD: function(event) {
		
			   this.position=	new paper.Point(this.position.x+event.delta.x,this.position.y+event.delta.y);
		}
};


Pro.fun = {
		/*
		 * p - point s- size
		 */
		drawrect: function(p,s) {
			var shape = new paper.Shape.Rectangle(p?p:paper.view.center,s?s:new paper.Size(200,200));
			shape.stateDraw = true;
			// events
		  shape.onMouseEnter=Pro.events.rectmouseEnter;
		  shape.onMouseLeave=Pro.events.rectmouseLeave;
		shape.onMouseDrag = Pro.events.rectmouseDnD;
			
			shape.strokeColor = 'black';
			shape.opacity = 0.2;
			shape.fillColor = 'grey';
			// Set the shadow color of the circle to RGB black:
			shape.shadowColor = new paper.Color(0, 0, 80);
			// Set the shadow blur radius to 12:
			shape.shadowBlur = 20;
			// Offset the shadow by { x: 5, y: 5 }
			shape.shadowOffset = new paper.Point(5, 5);
			
		
		
	
		//	circle.onMouseDrag= Pro.pro.page.events.eventRectonMouseDrag;
		
		},
		drawCircle: function(arr) {
			var circle = new paper.Path.Circle(arr?arr: {
			    center: [paper.view.center.x,paper.view.center.y],
			    radius: 35,
			    fillColor: 'red'
			});
			paper.view.update();
			// events
			  circle.onMouseEnter=Pro.events.rectmouseEnter;
			  circle.onMouseLeave=Pro.events.rectmouseLeave;
			  circle.onMouseDrag = Pro.events.rectmouseDnD;
		}
		
};






// Get a reference to the canvas object
var canvas = document.getElementById('myCanvas');
paper.setup(canvas);


Pro.fun.drawrect();
Pro.fun.drawCircle();
	//Pro.pro.page.func.drawrectN();
	// push mew image
	//Pro.pro.page.func.addnewObj("td1");
	//Pro.pro.page.func.drawrectN();
	//Pro.pro.page.func.addnewObj("td1");
	// Pro.pro.page.func.addnewObj("t1");
	//Pro.pro.page.func.addnewObj("gif1");

};