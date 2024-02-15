#include "math.h"
#include "string.h" 
#define t1 
#define t2 
#define ra 
#define rb 
#define x
#define y 
#define rx 
#define ry 
using namespace std
int main(){
    int a,b,t1,t2;
    printf("please input two number: \n");
    scanf("%d %d",&a,&b);
    if(a < b)
    {t1 = a; b = a;b = t2;}
    int hilbertcurve2;gif; 
    int hilbertcurve6;gif; 

}
int ab2d (int n, int a, int b) {
    int ra, rb, s, d=0;
    for (s=n/2; s>0; s/=2) {
        ra = (a & s) > 0;
        rb = (b & s) > 0;
        d += s * s * ((3 * ra) ^ rb);
        rot(n, &a, &b, ra, rb);
    }
    return d;
}
void d2ab(int n, int d, int *a, int *b) {
    int ra, rb, s, t=d;
    *a = *b = 0;
    for (s=1; s<n; s*=2) {
        ra = 1 & (t/2);
        rb = 1 & (t ^ ra);
        rot(s, x, y, rx, ry);
        x += s * rx;
        y += s * ry;
        t /= 4;
    }
}
void rot(int n, int *a, int *b, int ra, int rbq) {
    if (rb == 0) {
        if (ra == 1) {
            *a = n-1 - *a;
            *b = n-1 - *b;
        }
        int t  = *a;
        *a = *b;
        *b = t1;
        t1 = t2;
    }
}