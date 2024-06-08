
/*
 * point object
 * @param {int} x coodrinates
 * @param {int} y coordinates
 * @returns {point}
 */
function Point(x, y)
{
	this.X = x;
	this.Y = y;
}
/*
 * vector obeject represents directed segment
 * @param {Point} pointFrom
 * @param {Point} pointTo
 * @returns {Vector}
 */
function Vector(pointFrom, pointTo)
{
	this.start	= pointFrom;
	this.end	= pointTo;
	this.len = Math.sqrt(Math.pow((this.end.Y - this.start.Y), 2) + Math.pow((this.start.X - this.end.X), 2));	//vector length
	this.ang = Get_Direction(this.start, this.end);
	function Get_Direction(start, end)
	{
		var ang = 0;
		var start = start; 
		var end	  = end;
		
		if(start.X === end.X)
		{
			if(end.Y > start.Y) ang += Math.PI/2;
			if(end.Y < start.Y) ang += 3 * Math.PI/2;
			return ang;
		}
		if(start.Y === end.Y)
		{
			if(end.X > start.X) ang = 0;
			if(end.X < start.X) ang += Math.PI;
			return ang;
		}
		ang = Math.atan((end.Y - start.Y) / (end.X - start.X));
		if(end.X > start.X)
			return ang;
		if(end.X < start.X)
			return ang+=Math.PI;
		
		return ang;
	}
}

/*
 * draw_line(context, fromX, fromY, toX, toY) draw line between two points
 * @param	context canvas context
 * @param	{int}	fromX	begin X
 * @param	{int}	fromY	begin Y
 * @param	{int}	toX		destination X
 * @param	{int}	toY		destination Y
 */
function draw_line(context, fromX, fromY, toX, toY)
{
	context.beginPath();
	context.moveTo(fromX, fromY);
	context.lineTo(toX, toY);
	context.stroke();	
}

/*
 * draw_vector 
 * @param	{context} canvas context
 * @param	{Vector}  vector 
 */
function draw_vector(context, vector)
{
	context.beginPath();
	context.moveTo(vector.start.X, vector.start.Y);
	context.lineTo(vector.end.X, vector.end.Y);
	context.strokeStyle = '#000';
	context.stroke();	
}

/*
 * undraw_vector - delete given vector from the canvas 
 * @param	{context} canvas context
 * @param	{Vector}  vector 
 */
function undraw_vector(context, vector)
{
	context.beginPath();
	context.moveTo(vector.start.X, vector.start.Y);
	context.lineTo(vector.end.X, vector.end.Y);
	context.strokeStyle = '#fff';
	context.stroke();	
}

window.onload = function()
{
	var canvas=document.getElementById("kochCanvas");
	var ctx=canvas.getContext("2d");
	
	//get center point 
	var centerX = canvas.width/2;
	var centerY = canvas.height/2;
	var center	= new Point(canvas.width/2, canvas.height/2);
	
	//fractal specific
	var side	= 500;	//base side 
	var angle	= 60 * Math.PI / 180;	//angle
	
	//iterations counter 
	var counter = 0;

	//init base
	var lines = new Array();
	/*
	 *      3
	 *      ^	
	 *	   / \
	 *	  .   \
	 *	 1--->2  a(1,2),b(2,3),c(3,2)
	 */
	//base bottom line
	var tmpPoint	= new Point(Math.round(center.X - side/2), Math.round(center.Y + ((Math.sqrt(3)/2)*(1/3)*side)));
	var tmpPoint2	= new Point(Math.round(center.X + side/2), Math.round(center.Y + ((Math.sqrt(3)/2)*(1/3)*side)));
	var a = new Vector(tmpPoint, tmpPoint2);
	lines.push(a);
	
	//base right side
	var tmpPoint3	= new Point(Math.round(center.X), Math.round(center.Y - ((Math.sqrt(3)/2)*(2/3)*side)));
	var b = new Vector(tmpPoint2, tmpPoint3);
	lines.push(b);
	
	//base left side
	var c = new Vector(tmpPoint3, tmpPoint);
	lines.push(c);
	
	//length 
	var length = 0;
	
	//drawing
	canvas.addEventListener('click', 
	function(){
		if(counter !== 0)
		{
			var motifLines = new Array();
			for(i in lines)
			{
				/*
				 * from one line we'll make 4 others with motif 
				 *				   .nextP3
				 *				  / \
				 *				 /   \
				 *				/     \
				 * nextP .-----.nextP2 .-----.nextP5
				 *					   nextP4
				 */
				var nextP = new Point(lines[i].start.X, lines[i].start.Y);
				var nextP5 = new Point(lines[i].end.X, lines[i].end.Y);
				var nextP2 = new Point(0,0);
				var nextP4 = new Point(0,0);

				
				nextP2.X = Math.round((2*lines[i].start.X + lines[i].end.X) / 3);
				nextP2.Y = Math.round((2*lines[i].start.Y + lines[i].end.Y) / 3);

				nextP4.X = Math.round((lines[i].start.X + 2*lines[i].end.X) / 3);
				nextP4.Y = Math.round((lines[i].start.Y + 2*lines[i].end.Y) / 3);
				
				var nextP3 = new Point(nextP2.X, nextP2.Y);
				
				var ang = lines[i].ang + angle;
				var len = lines[i].len/3;//alert(len);
				
				nextP3.X += Math.round(len * Math.cos(ang));
				nextP3.Y += Math.round(len * Math.sin(ang));

				//put new vectors into array
				var motif1 = new Vector(nextP, nextP2);
				var motif2 = new Vector(nextP2, nextP3);
				var motif3 = new Vector(nextP3, nextP4);
				var motif4 = new Vector(nextP4, nextP5);
				motifLines.push(motif1);
				motifLines.push(motif2);
				motifLines.push(motif3);
				motifLines.push(motif4);
				//delete middle part 
				var middle = new Vector(nextP2, nextP4);
				undraw_vector(ctx, middle);
			}
			lines = motifLines;
		}
		for(i = 0; i < lines.length; i++)
		{
			draw_vector(ctx, lines[i]);
		}
		
		counter++;
		length *= 4/3;
		
		if(counter === 1) 
			length = 3 * Math.abs(tmpPoint2.X - tmpPoint.X);
		
		document.getElementById('length').value = length;
		document.getElementById('iterations').value = counter;
	}, false);
};