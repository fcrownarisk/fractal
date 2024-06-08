### BEGIN LICENSE
# The MIT License (MIT)
#
# Copyright (C) 2015 Christopher Wells <cwellsny@nycap.rr.com>
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
### END LICENSE
"""A script which visually draws a Cantor set."""
import turtle
import time

def rec_draw(l, r, x, xd, t, pen):
	"""Recursively draw each section of the Cantor set, until the set
	 number of rows has been met."""
	if x < t:
		# Draw the first full line, is redundant after first recursion
		pen.up()
		pen.goto(l, (-(x - 1) * xd))
		pen.down()
		pen.goto(r, (-(x - 1) * xd))

		# Find the length of each of the lesser lines
		diff = (r - l) / 3

		# Draw the first lesser line (1/3)
		pen.up()
		pen.goto(l, -x * xd)
		pen.down()
		pen.goto(l + diff, -x * xd)
		rec_draw(l, l + diff, x + 1, xd, t, pen)

		# Draw the second lesser line (3/3)
		pen.up()
		pen.goto(l + diff * 2, -x * xd)
		pen.down()
		pen.goto(r, -x * xd)
		rec_draw(l + diff * 2, r, x + 1, xd, t, pen)
	else:
		# End once the given number of lines has been met
		return

def main():
	"""Draw a visual representation of a Cantor set."""

	# Create the pen and set its initial values
	pen = turtle.Turtle()
	pen.ht()
	pen.speed(0)

	# Set the values of the Cantor set
	left = -200	# The right boundry
	right = 200	# The left boundry
	starting_row = 0	# The location of the first row
	row_distance = 10	# The distance between rows
	rows = 5	# The number of rows

	# Draw the Cantor set
	rec_draw(left, right, starting_row, row_distance, rows, pen)
	time.sleep(500)

# Run the main method of the script
if __name__ == '__main__':
	main()

