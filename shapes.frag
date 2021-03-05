uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 current_coordinate(void) {
	return vec2(gl_FragCoord.x, gl_FragCoord.y);
}
void background(in vec4 color) {
	gl_FragColor = color;
}
bool in_rectangle_bounds(in vec2 corner_point, in vec2 size, in vec2 point) {
	return point.x >= corner_point.x && point.y >= corner_point.y && point.x <= size.x && point.y <= size.y;
}
void rectangle(in vec2 corner_point, in vec2 size, in vec4 color) {
	if (in_rectangle_bounds(corner_point, size, current_coordinate())) {
		gl_FragColor = color;
	}
}
bool in_circle_bounds(in vec2 circle_center, in float circle_radius, in vec2 point) {
	return sqrt(pow(point.x - circle_center.x, 2.0) + pow(point.y - circle_center.y, 2.0)) <= circle_radius;
}
void circle(in vec2 center, in float radius, in vec4 color) {
	if (in_circle_bounds(center, radius, current_coordinate())) {
		gl_FragColor = color;
	}
}
float triangle_area(in vec2 p1, in vec2 p2, in vec2 p3) {
	return abs((p1.x*(p2.y-p3.y) + p2.x*(p3.y-p1.y) + p3.x*(p1.y-p2.y))/2.0);
}
bool in_triangle_bounds(in vec2 p1, in vec2 p2, in vec2 p3, in vec2 p) {
	float area = triangle_area(p1, p2, p3);
	float area1 = triangle_area(p, p2, p3);
	float area2 = triangle_area(p1, p, p3);
	float area3 = triangle_area(p1, p2, p);
	return area == area1 + area2 + area3;
}
void triangle(in vec2 p1, in vec2 p2, in vec2 p3, in vec4 color) {
	if (in_triangle_bounds(p1, p2, p3, current_coordinate())) {
		gl_FragColor = color;
	}
}
