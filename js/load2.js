/**
 * @author Sam
 */
// лечить мишку так обработать момент когда мишка покидает если она нажата
// обработать
// Only executed our code once the DOM is ready.
window.onload = function() {

	// Get a reference to the canvas object
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
	Pro = {
		values : {
			paths : 5,
			minPoints : 5,
			maxPoints : 15,
			minRadius : 30,
			maxRadius : 90
		},
		hitOptions : {
			segments : true,
			stroke : true,
			fill : true,
			tolerance : 5
		},
		selectionRectangle: null,
	 selectionRectangleScale: null,
		 selectionRectangleScaleNormalized: null,
		 selectionRectangleRotation: null

	};
	Pro.events = {

		objmouseDown : function(event) {
			// this.selected = true;
			segment = path = null;
			var hitResult = paper.project.hitTest(event.point, Pro.hitOptions);
			if (!hitResult) return;
			console.log("Down: " + hitResult);
			
			if (hitResult) {
		        console.log(hitResult);
				path = hitResult.item;
				
				if (hitResult.type == 'segment') {
					if(Pro.selectionRectangle!=null && path.name == "selection rectangle")
					{
		                console.log('selectionRectangle');
		                if(hitResult.segment.index >= 2 && hitResult.segment.index <= 4)
		                {
		                    console.log('rotation');
		                   Pro.selectionRectangleRotation = 0;
		                }
		                else
		                {
		                    console.log('scale');
		                    Pro.selectionRectangleScale = event.point.subtract(Pro.selectionRectangle.bounds.center).length/path.scaling.x;
		                }
					}
		            else
		                segment = hitResult.segment;
				} else if (hitResult.type == 'stroke' && path!=Pro.selectionRectangle) {
					var location = hitResult.location;
					segment = path.insert(location.index + 1, event.point);
					path.smooth();
				}
				console.log("Down2: "+Pro.selectionRectangle);
				if((Pro.selectionRectangle==null || Pro.selectionRectangle.ppath!=path) && Pro.selectionRectangle!=path)
				{
		            Pro.fun.initSelectionRectangle(path);
				}
			}
			
			
			else
			{
		        if(Pro.selectionRectangle!=null)
		        	Pro.selectionRectangle.remove();
			}
		
		
		},
		rectmouseEnter : function(event) {
			this.selected = true;

		},
		rectmouseUp : function(event) {
			  selectionRectangleScale = null;
			    selectionRectangleRotation = null;

		},
		rectmouseLeave : function(event) {
			 this.selected = false;
		},
		rectmouseDnD : function(event) {

		
		    if (path!=Pro.selectionRectangle)
		    {
		    	this.position = new paper.Point(this.position.x + event.delta.x,
						this.position.y + event.delta.y);
		    	Pro.selectionRectangle.position=new paper.Point(Pro.selectionRectangle.position.x + event.delta.x,
						Pro.selectionRectangle.position.y + event.delta.y);
		
		    }
		    
			if (Pro.selectionRectangleScale!=null)
			{
		        ratio = event.point.subtract(Pro.selectionRectangle.bounds.center).length/Pro.selectionRectangleScale;
		        scaling = new paper.Point(ratio, ratio);
		        Pro.selectionRectangle.scaling = scaling;
		        Pro.selectionRectangle.ppath.scaling = scaling;
		        console.log('scaling: '+Pro.selectionRectangle.ppath);
		        return;
			}
			else if(Pro.selectionRectangleRotation!=null)
			{
		        console.log('rotation: '+Pro.selectionRectangle.ppath);
		        rotation = event.point.subtract(Pro.selectionRectangle.pivot).angle + 90;
		        Pro.selectionRectangle.ppath.rotation = rotation;
		        Pro.selectionRectangle.rotation = rotation;
		        return;
			}
			if (segment) {
				segment.point += event.delta;
				path.smooth();
				Pro.fun.initSelectionRectangle(path);
			} else if (path) {
			    if (path!=Pro.selectionRectangle)
			    {
			    	this.position = new paper.Point(this.position.x + event.delta.x,
							this.position.y + event.delta.y);
			    	Pro.selectionRectangle.position=new paper.Point(Pro.selectionRectangle.position.x + event.delta.x,
							Pro.selectionRectangle.position.y + event.delta.y);
			    }
			    else
			    {
			    	
			    	Pro.selectionRectangle.position=new paper.Point(Pro.selectionRectangle.position.x + event.delta.x,
							Pro.selectionRectangle.position.y + event.delta.y);
			    	
				    Pro.selectionRectangle.ppath.position = new paper.Point(Pro.selectionRectangle.ppath.position.x + event.delta.x,
							Pro.selectionRectangle.ppath.position.y + event.delta.y);
				    
					
			    	Pro.selectionRectangle.position=new paper.Point(Pro.selectionRectangle.position.x + event.delta.x,
							Pro.selectionRectangle.position.y + event.delta.y);
			    }
			}
		    
		    
				}
	

	};

	Pro.fun = {

		initSelectionRectangle : function(path) {
			if (Pro.selectionRectangle != null)
				Pro.selectionRectangle.remove();
			var reset = path.rotation == 0 && path.scaling.x == 1
					&& path.scaling.y == 1;
			var bounds;
			if (reset) {
				console.log('reset');
				bounds = path.bounds;
				path.pInitialBounds = path.bounds;
			} else {
				console.log('no reset');
				bounds = path.pInitialBounds;
			}
			console.log('bounds: ' + bounds);
			b = bounds.clone().expand(10, 10);

			Pro.selectionRectangle = new paper.Path.Rectangle(b);
			Pro.selectionRectangle.onMouseDown=Pro.events.objmouseDown;
			Pro.selectionRectangle.onMouseDown = Pro.events.objmouseDown;
			Pro.selectionRectangle.pivot = Pro.selectionRectangle.position;
			Pro.selectionRectangle.insert(2, new paper.Point(b.center.x, b.top));
			Pro.selectionRectangle.insert(2, new paper.Point(b.center.x, b.top - 35));
			Pro.selectionRectangle.insert(2, new paper.Point(b.center.x, b.top));
			if (!reset) {
				Pro.selectionRectangle.position = path.bounds.center;
				Pro.selectionRectangle.rotation = path.rotation;
				Pro.selectionRectangle.scaling = path.scaling;
			}

			Pro.selectionRectangle.strokeWidth = 1;
			Pro.selectionRectangle.strokeColor = 'blue';
			Pro.selectionRectangle.name = "selection rectangle";
			Pro.selectionRectangle.selected = true;
			Pro.selectionRectangle.ppath = path;
			Pro.selectionRectangle.ppath.pivot = Pro.selectionRectangle.pivot;
		},
		/*
		 * p - point s- size
		 */
		drawrect : function(p, s) {
			var shape = new paper.Path.Rectangle(p ? p : paper.view.center,
					s ? s : new paper.Size(200, 200));
			shape.stateDraw = true;
			// events
			shape.onMouseEnter = Pro.events.rectmouseEnter;
			shape.onMouseLeave = Pro.events.rectmouseLeave;
			shape.onMouseDrag = Pro.events.rectmouseDnD;
			shape.onMouseDown = Pro.events.objmouseDown;

			shape.strokeColor = 'black';
			shape.opacity = 0.2;
			shape.fillColor = 'grey';
			// Set the shadow color of the circle to RGB black:
			shape.shadowColor = new paper.Color(0, 0, 80);
			// Set the shadow blur radius to 12:
			shape.shadowBlur = 20;
			// Offset the shadow by { x: 5, y: 5 }
			shape.shadowOffset = new paper.Point(5, 5);

			return shape;
			// circle.onMouseDrag= Pro.pro.page.events.eventRectonMouseDrag;

		},
		drawCircle : function(arr) {
			var circle = new paper.Path.Circle(arr ? arr : {
				center : [ paper.view.center.x, paper.view.center.y ],
				radius : 35,
				fillColor : 'red'
			});
			paper.view.update();
			// events
			circle.onMouseEnter = Pro.events.rectmouseEnter;
			circle.onMouseLeave = Pro.events.rectmouseLeave;
			circle.onMouseDrag = Pro.events.rectmouseDnD;
		}

	};

	Pro.fun.drawrect();
	Pro.fun.drawCircle();
	// Pro.pro.page.func.drawrectN();
	// push mew image
	// Pro.pro.page.func.addnewObj("td1");
	// Pro.pro.page.func.drawrectN();
	// Pro.pro.page.func.addnewObj("td1");
	// Pro.pro.page.func.addnewObj("t1");
	// Pro.pro.page.func.addnewObj("gif1");
	// info info info info info info info info
	Pro.info = {
		buttons : {
			"event.modifiers" : "в собитии мыши проверка на нажатую кнопку"
		}
	};

};
