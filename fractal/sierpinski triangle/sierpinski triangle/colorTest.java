import java.awt.Color;

public class colorTest {
	public static void main(String[] args) {
		Color red = new Color(255, 0, 0);
		Color white = new Color(255, 255, 255);
		Color sienna = new Color(160, 82, 45);

		StdDraw.setCanvasSize(800,800);

		//first Albers square
		StdDraw.setPenColor(red);
		StdDraw.filledSquare(.25,.5,.2);
		StdDraw.setPenColor(sienna);
		StdDraw.filledSquare(.25,.5,.1);

		//second Albers square
		StdDraw.setPenColor(sienna);
		StdDraw.filledSquare(.75,.5,.2);
		StdDraw.setPenColor(red);
		StdDraw.filledSquare(.75,.5,.1);

	}
}