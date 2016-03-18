/**
 * @author Sam
 */
// лечить мишку так обработать момент когда мишка покидает если она нажата
// обработать
// Only executed our code once the DOM is ready.
window.onload = function() {
Pro = {};
Pro.pro = {
		
};
// Get a reference to the canvas object
var canvas = document.getElementById('myCanvas');
 // canvas.syncDimension= true;
// Create an empty project and a view for the canvas:
paper.setup(canvas);
	/*
	 * global value
	 */
	Pro.pro.page = {
		curentrect : null, // curent rectangle
		alfarect : null, // mainrect
		stateofmouseDow : false, // state of mouse
		objectsArray : new Array(),
		lastPoint : null,
		lastPointCircle: null,
		curentImageIndex: null,
		curentGroup: null

	};
	Pro.pro.page.func = {
			
			drawrectN: function() {
				var shape = new paper.Shape.Rectangle(new paper.Point(100,100), new paper.Size(200,200));
				shape.stateDraw = true;
			
			//	shape.arrCircles=Pro.pro.page.func.drawcirclesOnRect(point, size);
				//shape.arrCircles.push(Pro.pro.page.func.drawcircle(point));
				shape.onMouseDrag = Pro.pro.page.events.eventRectonMouseDrag;
				
				shape.onMouseUp = Pro.pro.page.events.eventRectMouseUp;
				//shape.onMouseMove = Pro.pro.page.events.eventRectMouseMove;
			//	shape.onMouseDown = Pro.pro.page.events.eventRectMouseDown;
			
				
				shape.strokeColor = 'black';
				shape.opacity = 0.2;
				shape.fillColor = 'grey';
				// Set the shadow color of the circle to RGB black:
				shape.shadowColor = new paper.Color(0, 0, 80);
				// Set the shadow blur radius to 12:
				shape.shadowBlur = 20;
				// Offset the shadow by { x: 5, y: 5 }
				shape.shadowOffset = new paper.Point(5, 5);
				
				var shape = new paper.Shape.Rectangle(new paper.Point(400,250), new paper.Size(100,100));
				shape.stateDraw = true;
				shape.rotate(42);
			
			//	shape.arrCircles=Pro.pro.page.func.drawcirclesOnRect(point, size);
				//shape.arrCircles.push(Pro.pro.page.func.drawcircle(point));
				shape.onMouseDrag = Pro.pro.page.events.eventRectonMouseDrag;
				
				shape.onMouseUp = Pro.pro.page.events.eventRectMouseUp;
				//shape.onMouseMove = Pro.pro.page.events.eventRectMouseMove;
				shape.onMouseDown = Pro.pro.page.events.eventRectMouseDown;
			
				
				shape.strokeColor = 'black';
				shape.opacity = 0.2;
				shape.fillColor = 'red';
				// Set the shadow color of the circle to RGB black:
				shape.shadowColor = new paper.Color(0, 0, 80);
				// Set the shadow blur radius to 12:
				shape.shadowBlur = 20;
				// Offset the shadow by { x: 5, y: 5 }
				shape.shadowOffset = new paper.Point(5, 5);
				//ar rectangle2 = new paper.Rectangle(new Point(50, 40), size);
				//rectangle1.center=new paper.Point(rectangle1.center.x+200,rectangle1.center.y);
				var circle = new paper.Path.Circle({
				    center: [180, 150],
				    radius: 35,
				   
				});
			//	circle.onMouseDrag = function(event) {
				   // circle.position = new paper.Point(circle.position.x+circle.delta.x,circle.position.y+circle.delta.y);
				    
				//}
				// Set the fill color of the circle to RGB red:
				circle.fillColor = new paper.Color(1, 0, 0);
				circle.onMouseDrag= Pro.pro.page.events.eventRectonMouseDrag;
			
			},
		/*
		 * draw one image
		 */
		drawimageOnCanvas : function(imageId, pointState, imageSize) {

			var rastertGif = new paper.Raster(imageId);
			rastertGif.position = paper.view.center;
			//rastertGif.onMouseDrag=eventRastonMouseDrag;
			return rastertGif;
		},
		/*
		 * draw border around image. return border
		 * 
		 */
		drawrect : function(point, size) {
			var shape = new paper.Shape.Rectangle(point, size);
			shape.stateDraw = true;
		
		//	shape.arrCircles=Pro.pro.page.func.drawcirclesOnRect(point, size);
			//shape.arrCircles.push(Pro.pro.page.func.drawcircle(point));
			shape.onMouseDrag = Pro.pro.page.events.eventRectonMouseDrag;
			
			shape.onMouseUp = Pro.pro.page.events.eventRectMouseUp;
			//shape.onMouseMove = Pro.pro.page.events.eventRectMouseMove;
			shape.onMouseDown = Pro.pro.page.events.eventRectMouseDown;
		
			
			shape.strokeColor = 'black';
			shape.opacity = 0.2;
			shape.fillColor = 'grey';
			// Set the shadow color of the circle to RGB black:
			shape.shadowColor = new paper.Color(0, 0, 80);
			// Set the shadow blur radius to 12:
			shape.shadowBlur = 20;
			// Offset the shadow by { x: 5, y: 5 }
			shape.shadowOffset = new paper.Point(5, 5);
			// shape.selected=true;

			return shape;

		},
		newPosition : function(pointFigure, pointMouse) {
			if (Pro.pro.page.lastPoint) {
				// console.log("newPos x"+Pro.pro.page.lastPoint.x);
				console.log("newPos x" + pointMouse);
				var x = Pro.pro.page.lastPoint.x - pointMouse.x;
				var y = Pro.pro.page.lastPoint.y - pointMouse.y;
				Pro.pro.page.lastPoint = pointMouse;
				x = pointFigure.x - x;
				y = pointFigure.y - y;
				return new paper.Point(x, y);
			} else
				return null;
		},
		newPositionCircle : function(pointFigure, pointMouse) {
			if (Pro.pro.page.lastPointCircle) {
				// console.log("newPos x"+Pro.pro.page.lastPoint.x);
				console.log("newPos x" + pointMouse);
				var x = Pro.pro.page.lastPointCircle.x - pointMouse.x;
				var y = Pro.pro.page.lastPointCircle.y - pointMouse.y;
				Pro.pro.page.lastPointCircle = pointMouse;
				x = pointFigure.x - x;
				y = pointFigure.y - y;
				return new paper.Point(x, y);
			} else
				return null;
		},
		addnewObj : function(idObj) {

			var obj = Pro.pro.page.func.drawimageOnCanvas(idObj);
			obj.stateDraw = false;

			obj.position = new paper.Point(obj.position.x - 150, obj.position.y);
			obj.onMouseEnter = Pro.pro.page.events.eventMouseEnter;
			obj.onClick = Pro.pro.page.events.eventMouseClick;
			obj.onMouseDown = Pro.pro.page.events.eventMouseDown;
			// add to arrayList
			// Pro.pro.page.objectsArray.push(obj.img);
			// obj.img.onMouseMove = Pro.pro.page.events.eventMouseMove;
			obj.onMouseUp = Pro.pro.page.events.eventMouseUp;
			Pro.pro.page.objectsArray.push(obj);
		},
		/*
		 * what image is selected return index
		 */
		whoisimagestate : function() {

			// search img where stateDraw+ move image to new destination
			var res = null;
			Pro.pro.page.objectsArray.forEach(function(item,i) {
				if (item.stateDraw == true) {
					console.log("OKy search" + i);
					// arr[i].position=Pro.pro.page.curentrect.position;
					// arr[i].stateDraw=false;
					res = i;
					// break;
					// return nor work ((
				}
			});
			return res;
		},
		drawcirclesOnRect: function(point, size) {
			
			var arr=new Array();
			var x=point.x,y=point.y,wi=size.width,he=size.height;
			var obj=Pro.pro.page.func.drawcircle(x,y);   // 1 top left Rotate
			obj.onMouseEnter=Pro.pro.page.events.eventCircleRotateMouseEnter;
			obj.onMouseDown=Pro.pro.page.events.eventCircleRotateMouseDown;
			obj.onMouseUp=Pro.pro.page.events.eventCircleRotateMouseUp;
			obj.onMouseDrag=Pro.pro.page.events.eventCircleRotateonMouseDrag;
			obj.stateDraw=false;
			obj.data={
					index: 1
			};
			
			arr[1]=obj;
			
			//    просто разкоментировать
		//	arr.push(Pro.pro.page.func.drawcircle(x+wi,y));//2 top rigth
			obj=null;
			obj=Pro.pro.page.func.drawcircle(x+wi,y+he);
			obj.onMouseEnter=Pro.pro.page.events.eventCircleScaleMouseEnter;
			obj.onMouseDown=Pro.pro.page.events.eventCircleScaleMouseDown;
			obj.onMouseUp=Pro.pro.page.events.eventCircleScaleMouseUp;
			obj.onMouseMove=Pro.pro.page.events.eventCircleScaleMouseMove;
			obj.onMouseDrag=Pro.pro.page.events.eventCircleScaleonMouseDrag;
			obj.stateDraw=false;
			
			obj.data={
					index: 3
			};
			arr[3]=obj;//3 rigth bottom 
			
			//arr.push(Pro.pro.page.func.drawcircle(x,y+he));//4 down left
			
			return arr;
			
			
		},
		drawcircle: function(x,y) {
			var shape = new paper.Shape.Circle({
			    center: [x,y],
			    radius: 20,
			    strokeColor: 'black',
			    fillColor : 'blue'
			});
			return shape;
		}
	};

	Pro.pro.page.events = {
			
		      // rectangle
			eventRectonMouseDrag: function(event) {
				//Pro.pro.page.curentrect.position += event.delta;
				console.log("Rect  Drag "+this.position);
			   // this.position += event.delta;
			   var p= new paper.Point(this.position.x+event.delta.x,this.position.y+event.delta.y);
			   this.position=p;
			
				
			},
			
			eventRastonMouseDrag: function() {
				
				
			},
			eventCircleScaleMouseMove: function(e){
				//console.log("Cirkle2 move");	
			},
			eventCircleScaleMouseUp: function(e) {
				//console.log("mouseRotateDown");
				Pro.pro.page.lastPointCircle=null;
				this.fillColor="blue";
				this.stateDraw=false;
				// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
				Pro.pro.page.curentImageIndex=null;
				//console.log("Cirkle2 up");	
			},
			eventCircleScaleMouseDown: function(e) {
				//console.log("mouseRotateDown "+e.point);
				Pro.pro.page.lastPointCircle=e.point;
				this.fillColor="green";
				this.stateDraw=true;
				// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
				Pro.pro.page.objectsArray.forEach(function(element, index, array) {
					if(element.stateDraw==true){Pro.pro.page.curentImageIndex=index;
					};
				});
				var obj=Pro.pro.page.objectsArray[Pro.pro.page.curentImageIndex];
				obj.rotate(30);
				////////
				 var path;

				  path = new paper.Path();
				  path.strokeColor = 'black';
				  path.strokeWidth = 7;

				  var point1 = new paper.Point(150, 150);
				  var point2 = new paper.Point(250, 150);
				  path.add(point1);
				  path.add(point2);

				  var handle1 = new paper.Path.Circle({
				    center    : point1,
				    radius    : 7,
				    fillColor : 'green'
				  });

				  var handle2 = new paper.Path.Circle({
				    center    : point2,
				    radius    : 7,
				    fillColor : 'blue'
				  });

				  var group = new paper.Group(path, handle1, handle2);
				  group.pivot = point1;

				  handle1.onMouseDrag = function(event) {
				    group.position = group.position.subtract(handle1.position).add(event.point);
				      group.pivot = event.point;
				  };

				  handle2.onMouseDrag = function(event) {
				     group.rotate(event.point.subtract(handle1.position).angle - (handle2.position.subtract(handle1.position)).angle);

					  console.log("Handle2 drag");
				  };

				  paper.view.draw();
				
				
				//////
				  var obj=Pro.pro.page.objectsArray[Pro.pro.page.curentImageIndex];
				Pro.pro.page.curentGroup = new paper.Group(obj,this);
				console.log("Cirkle2 down");	
			},
			eventCircleScaleonMouseDrag: function(event) {
				 
					var obj=Pro.pro.page.objectsArray[Pro.pro.page.curentImageIndex];
				   //  group.rotate(event.point.subtract(handle1.position).angle - (handle2.position.subtract(handle1.position)).angle);
					Pro.pro.page.curentGroup.rotate(event.point.subtract(obj.position).angle - (this.position.subtract(obj.position)).angle);
				  
	//			 console.log("eventCircleScaleonMouseDrag");	
			},
			
			eventCircleScaleMouseEnter: function() {
				//console.log("Cirkle2 enter");	
			},
			 
			eventCircleRotateMouseEnter : function(event, obj) {
				//console.log("mouseRotateEnter");
				// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);

			},
			eventCircleRotateMouseDown : function(e, obj) {
				Pro.pro.page.lastPointCircle=e.point;
				this.fillColor="yellow";
				this.stateDraw=true;
				// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
				Pro.pro.page.objectsArray.forEach(function(element, index, array) {
					if(element.stateDraw==true){Pro.pro.page.curentImageIndex=index;
					};
					
					//Pro.pro.page.curentrect.arrCircles.forEach(function(item, i, arr) {
						//if(arr[i].stateDraw==false){
							//arr[i].remove();
						//	delete arr[i];
					//	}
					//});
			
					
					
					
					
					
				});
			},
			eventCircleRotateMouseUp : function(event, obj) {
				console.log("mouseRotateDoUP");
				Pro.pro.page.lastPointCircle=null;
				this.fillColor="blue";
				this.stateDraw=false;
				// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);
				Pro.pro.page.curentImageIndex=null;
			//delete	Pro.pro.page.curentrect.arrCircles[0];
			Pro.pro.page.curentrect.arrCircles=Pro.pro.page.func.drawcirclesOnRect(event.position, Pro.pro.page.curentrect.size);

			},
			eventCircleRotateonMouseDrag : function(e, obj) {
			
				//console.log("300 moveCircle " + " P: " + Pro.pro.page.lastPointCircle
						//+ " SD " + this.stateDraw);
				if (Pro.pro.page.lastPointCircle && this.stateDraw == true) {
					//var pos = Pro.pro.page.func.newPosition(e.point, this.position);
					try {
						
					var pos = Pro.pro.page.func.newPositionCircle(this.position, e.point);
					this.position = pos;
					// move squere n image
					//Pro.pro.page.curentrect.position=e.point;
					//var res=e.point.y-Pro.pro.page.curentrect.position.y-Pro.pro.page.curentrect.position.y-yc;
			//	var res1=e.point.y-Pro.pro.page.lastPointCircle.y;
				var newH=(Pro.pro.page.curentrect.position.y-pos.y)*2;
				var newW=(Pro.pro.page.curentrect.position.x-pos.x)*2;
					//console.log("heightrect ::: "+s);
					//Pro.pro.page.curentrect.scale(1.05,Pro.pro.page.curentrect.position);
				//Pro.pro.page.curentrect.bounds=new paper.Rectangle(e.point.x,e.point.y,Pro.pro.page.curentrect.size.width,Pro.pro.page.curentrect.size.height+res1);
				var oldH=Pro.pro.page.curentrect.size.height;
				var oldW=Pro.pro.page.curentrect.size.width;
				Pro.pro.page.curentrect.size=new paper.Size(newW,newH);
					
					// take image and resize
					if(Pro.pro.page.curentImageIndex!=null){
					var obj=Pro.pro.page.objectsArray[Pro.pro.page.curentImageIndex];
					//obj.size=Pro.pro.page.curentrect.size;
			 // matrix
					//obj.translate(new paper.Point(2,7));
					newH=Pro.pro.page.curentrect.size.height;
				    newW=Pro.pro.page.curentrect.size.width;
					var resW=(newW*100/oldW)/100;
					var resH=(newH*100/oldH)/100;//ready
					console.log("resH: "+resH+ " resW: "+resW);
					obj.scale(resW, resH);
					
					console.log("mouseRotateDrag "+obj.bounds.bottomRight);
					var c3= Pro.pro.page.curentrect.arrCircles
					
					};
					} catch (e) {
						console.log(e.stack);
					}
					}
		
			},
			eventCircleRotateonMouseDrag : function(e, obj) {
				
				//console.log("300 moveCircle " + " P: " + Pro.pro.page.lastPointCircle
						//+ " SD " + this.stateDraw);
				if (Pro.pro.page.lastPointCircle && this.stateDraw == true) {
					//var pos = Pro.pro.page.func.newPosition(e.point, this.position);
					try {
						
					var pos = Pro.pro.page.func.newPositionCircle(this.position, e.point);
					this.position = pos;
					// move squere n image
					//Pro.pro.page.curentrect.position=e.point;
					//var res=e.point.y-Pro.pro.page.curentrect.position.y-Pro.pro.page.curentrect.position.y-yc;
			//	var res1=e.point.y-Pro.pro.page.lastPointCircle.y;
				var newH=(Pro.pro.page.curentrect.position.y-pos.y)*2;
				var newW=(Pro.pro.page.curentrect.position.x-pos.x)*2;
					//console.log("heightrect ::: "+s);
					//Pro.pro.page.curentrect.scale(1.05,Pro.pro.page.curentrect.position);
				//Pro.pro.page.curentrect.bounds=new paper.Rectangle(e.point.x,e.point.y,Pro.pro.page.curentrect.size.width,Pro.pro.page.curentrect.size.height+res1);
				var oldH=Pro.pro.page.curentrect.size.height;
				var oldW=Pro.pro.page.curentrect.size.width;
				Pro.pro.page.curentrect.size=new paper.Size(newW,newH);
					
					// take image and resize
					if(Pro.pro.page.curentImageIndex!=null){
					var obj=Pro.pro.page.objectsArray[Pro.pro.page.curentImageIndex];
					//obj.size=Pro.pro.page.curentrect.size;
			 // matrix
					//obj.translate(new paper.Point(2,7));
					newH=Pro.pro.page.curentrect.size.height;
				    newW=Pro.pro.page.curentrect.size.width;
					var resW=(newW*100/oldW)/100;
					var resH=(newH*100/oldH)/100;//ready
					console.log("resH: "+resH+ " resW: "+resW);
					obj.scale(resW, resH);
					
					console.log("mouseRotateDrag "+obj.bounds.bottomRight);
					var c3= Pro.pro.page.curentrect.arrCircles
					
					};
					} catch (e) {
						console.log(e.stack);
					}
					}
		
			},
			
			
			
			
			
			
			
			
		/*
		 * event when mouse enter in area object
		 */
		eventMouseEnter : function(event, obj) {
			
			// Pro.pro.page.func.drawrect(this.bounds.point, this.bounds.size);

		},
		/*
		 * event when mouse click in area object draw alfa rectangle
		 */
		eventMouseClick : function(event, obj) {
			console.log("click");

		},
		/*
		 * event when mouse move and dowd in curentRect object draw alfa
		 * rectangle
		 */
		eventMouseDown : function(event, obj) {
			console.log("move & down " + event.point);

			var index = Pro.pro.page.func.whoisimagestate();
			console.log("157 index " + index);
			if (index != null) {
				Pro.pro.page.objectsArray[index].stateDraw = false;
			}
			;

			this.stateDraw = true;
			this.bringToFront();
			Pro.pro.page.lastPoint = event.point;

			if (Pro.pro.page.curentrect) {
				// console.log(Pro.pro.page.curentrect);
	//Pro.pro.page.curentrect.arrCircles[0].remove();
				Pro.pro.page.curentrect.remove();// removeOn({
				paper.view.update();
			}
			 

			// drag: true,
			// down: true
			// });
			Pro.pro.page.curentrect = Pro.pro.page.func.drawrect(
					this.bounds.point, this.bounds.size);
			// Pro.pro.page.curentrect.bringToFront();
			Pro.pro.page.curentrect.onMouseEnter = function(event) {
			//	console.log("curentrect enter reckt");
				
			};
			

		},
		eventMouseUp : function(event, obj) {

			console.log("Mup move " + Pro.pro.page.lastPoint);
			Pro.pro.page.lastPoint = null;
			// Pro.pro.page.buzystate=false;
			this.stateDraw = false;

		},
		eventMouseMove : function(e) {
			console.log("121 move " + this.stateDraw);

			if (Pro.pro.page.lastPoint && this.stateDraw == true) {

				var pos = Pro.pro.page.func.newPosition(this.position, e.point);
				this.position = pos;
				Pro.pro.page.curentrect.position = pos;

			}
		},
		eventRectMouseMove : function(e) {
	
			if (Pro.pro.page.lastPoint && this.stateDraw == true) {

				var pos = Pro.pro.page.func.newPosition(this.position, e.point);
				this.position = pos;
				Pro.pro.page.curentrect.position = pos;
				//console.log("MMMMMMMMMMMM: "+pos);
				var p= new paper.Point(pos.x-(Pro.pro.page.curentrect.size.width/2),pos.y-(Pro.pro.page.curentrect.size.height/2));
				//console.log("MMMMMMMMMMMMeee: "+Pro.pro.page.curentrect.size.width);
				Pro.pro.page.curentrect.arrCircles[0].position=p;

			}
		},
		eventRectMouseUp : function(event, obj) {

			this.stateDraw = false;
			// search img where stateDraw+ move image to new destination
			console.log(Pro.pro.page.func.whoisimagestate());
			var index = Pro.pro.page.func.whoisimagestate();
			if (index == null) {
				return null;
			}
			;
			Pro.pro.page.objectsArray[index].position = Pro.pro.page.curentrect.position;

		},
		eventRectMouseDown : function(event, obj) {

			Pro.pro.page.lastPoint = event.point;
		//	console.log("Mouse Down: " + event.point);
			// Pro.pro.page.buzystate=false;
			Pro.pro.page.curentrect=this;
			console.log("MouseDown:" +this);
			this.stateDraw = true;
		
			

		}
		

	};

	//Pro.pro.page.func.drawrectN();
	// push mew image
	Pro.pro.page.func.addnewObj("td1");
	Pro.pro.page.func.drawrectN();
	//Pro.pro.page.func.addnewObj("td1");
	// Pro.pro.page.func.addnewObj("t1");
	Pro.pro.page.func.addnewObj("gif1");

};