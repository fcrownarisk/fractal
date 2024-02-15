import java.awt.Color;      //imports the Color Class
import java.util.Random;    // imports the Random Class

public class Sierpinski {
		/*
		 * Purpose: This is the main function that will take in one argument from the command line and set that = to variable n, and will then set the
 		 * local variables length, x, and y. The function will then call method drawSierpinski().
		 *
		 *
		 * Variables
		 * ---------
		 * n - An integer created from args[0]
		 * length - A double representing the length of the first triangle
		 * x - A double representing the x coord of the first triangle's reference point
		 * y - A double representing the y coord of the first triangle's reference point
		 *
		 * Return Value
		 * ------------
		 * None
		 *
		 * @author Scott Thelemann
		 *
		 * @version 1.0 02/15/14
		 *
		*/  
	public static void main(String[] args) {
		
		// Local Variables
		
		int n = Integer.parseInt(args[0]); 		// The amount of times the recursive process will repeat, converts arg[0] to an Integer
		double length = 0.5; 					// The double representing the length of the triangle's sides
		double x = 0.5; 						// The x coordinate of the reference point for the first triangle  
		double y = 0;   						// The y coordinate of the reference point for the first triangle
		
		//Body

		drawSierpinski(x, y, length, n); 		//Calls the drawSierpinski() method.

	} // main
	
	/*
	 * Purpose: This function will take in a triangle's reference point & length. The function
	 *  will then set a, b, and c based on the triangle's length. Next the function will use the random class
	 *  imported to set a random color for the triangle using the imported Color class. Finally the function
	 *  will set the array values for x1 & y1 and will then draw the triangle to the screen using these points and the StdDraw class.
	 *
	 *
	 * Variables
	 * ---------
	 * a - A double representing the triangle's height
	 * b - A double representing the value of half the length
	 * c - A double representing length
	 * r - The value representing the Random Class imported
	 * color - The value representing the color set randomly using the Random Class and Color Class
	 * x1 - An array used to store the x coordinates for the Triangle to be drawn
	 * y1 - An array used to store the y cooridnates for the Triangle to be drawn
	 *
	 * Return Value
	 * -----------
	 * None
	 *
	 * @author Scott Thelemann
	 *
	 * @version 1.0 02/15/14
	 *
	*/

	public static void filledTriangle(double x, double y, double len) {
		
		double a =  (len * .5 * Math.sqrt(3)); 
		double b = len/2;
		double c = len;
		
		Random r = new Random();
		Color color = new Color(r.nextInt(50), r.nextInt(256), r.nextInt(100)); 

		double[] x1 = {(x-b), x, (x + b)};   
		double[] y1 = {(y+a), y, (y+a)};			
		
		StdDraw.setPenColor(color);
		StdDraw.filledPolygon(x1, y1);

	} // filledTriangle
	
	/*
	* Purpose: This function will take in the triangle's reference point, length, and value of n.
	*  The function will then set the values for a, b, & c using length. The function will then check what the value of n is.
	*  If the n is == 0 then the program will end. If n is > 0 then the function will call filledTriangle to draw a new triangle, and it will then
	*  proceed to recursively draw 3 triangles for every triangle drawn until the variable n == 0.
	* 
	*
	* Variables
	* ---------
	* a - A double representing the triangle's height
	* b - A double representing the value of half the length
	* c - A double representing length
	*
	* Return Value
	* ------------
	* None
	*
	* @author Scott Thelemann
	*
	* @version 1.0 02/15/14
	*
	*/
	public static void drawSierpinski(double x, double y, double len, int n) {
		//recursive process
		//for each triangle drawn, function draws 3 additional triangles on each edge
	
		double a =  (len * .5 * Math.sqrt(3));
		double b = len/2;
		double c = len;

		if(n == 0) {
			
		} // if
		
		/*
		 * else statement is used to draw 3 triangles for every triangle drawn by calling filledTriangle
		 * to fill the parent Triangle, and then calls drawSierpinski 3 times to draw the 3 baby triangles for the parent.
		 * When drawSierpinski is called the length is halved, and the value of n is decreased by 1.
		*/
		else {
			
			filledTriangle(x,y,len);
			
			drawSierpinski((x-b),y,len/2, n-1); 
			
			drawSierpinski((x+b),y,len/2, n-1);
			
			drawSierpinski(x,(y+a),len/2, n-1);

		} // else

	} // drawSierpinski 	

} // Sierpinski 
