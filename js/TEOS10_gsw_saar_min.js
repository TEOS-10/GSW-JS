var toolbox=new TEOS10_gsw_oceanographic_toolbox;function TEOS10_gsw_saar(){this.gsw_nx=gsw_nx;this.gsw_ny=gsw_ny;this.gsw_nz=gsw_nz;this.longs_ref=longs_ref;this.lats_ref=lats_ref;this.p_ref=p_ref;this.ndepth_ref=ndepth_ref;this.saar_ref=saar_ref;this.delta_sa_ref=delta_sa_ref}TEOS10_gsw_saar.prototype.gsw_sum=function(g,a){for(var c=0,h=0;h<g.length;h++)c+=g[h];return c};TEOS10_gsw_saar.prototype.maxvalue=function(g,a){g>a?result=g:result=a;return result};TEOS10_gsw_saar.prototype.sum=function(g){this.gsw_sum(g)};
TEOS10_gsw_saar.prototype.gsw_saar=function(g,a,c){var h=this.longs_ref,p=this.lats_ref,b=this.p_ref,l=this.ndepth_ref,v=this.saar_ref,e=this.gsw_nx,k=this.gsw_ny,m=this.gsw_nz,f="",s=[0,1,1,0],t=[0,0,1,1],d=[],u=GSW_INVALID_VALUE;if(-86>c||90<c)return u;0>a&&(a+=360);var u=h[1]-h[0],w=p[1]-p[0],q=Math.floor(0+(e-1)*(a-h[0])/(h[e-1]-h[0]));q==e-1&&(q=e-2);e=Math.floor(0+(k-1)*(c-p[0])/(p[k-1]-p[0]));e==k-1&&(e=k-2);for(var r=-1,n=0;4>n;n++)f=e+t[n]+(q+s[n])*k,0<l[f]&&(r=Math.max(r,l[f]));if(-1==r)return 0;
g>b[parseInt(r)-1]&&(g=b[parseInt(r)-1]);l=toolbox.gsw_indx(b,m,g);f=(a-h[q])/(h[q+1]-h[q]);r=(c-p[e])/(p[e+1]-p[e]);g=(g-b[l])/(b[l+1]-b[l]);for(n=0;4>n;n++)d[n]=v[l+m*(e+t[n]+(q+s[n])*k)];260<=a&&291.999>=a&&3.4<=c&&19.55>=c?toolbox.gsw_add_barrier(d,a,c,h[q],p[e],u,w,d):1E10<=Math.abs(this.gsw_sum(d))&&toolbox.gsw_add_mean(d,a,c,d);b=(1-r)*(d[0]+f*(d[1]-d[0]))+r*(d[3]+f*(d[2]-d[3]));for(n=0;4>n;n++)d[n]=v[l+1+m*(e+t[n]+(q+s[n])*k)];260<=a&&291.999>=a&&3.4<=c&&19.55>=c?toolbox.gsw_add_barrier(d,
a,c,h[q],p[e],u,w,d):1E10<=Math.abs(this.gsw_sum(d))&&toolbox.gsw_add_mean(d,a,c,d);a=(1-r)*(d[0]+f*(d[1]-d[0]))+r*(d[3]+f*(d[2]-d[3]));1E10<=Math.abs(a)&&(a=b);u=b+g*(a-b);1E10<=Math.abs(u)&&(u=GSW_INVALID_VALUE);return u};
TEOS10_gsw_saar.prototype.gsw_delta_sa_ref=function(g,a,c){longs_ref=this.longs_ref;lats_ref=this.lats_ref;p_ref=this.p_ref;ndepth_ref=this.ndepth_ref;saar_ref=this.saar_ref;delta_sa_ref=this.delta_sa_ref;nx=this.gsw_nx;ny=this.gsw_ny;nz=this.gsw_nz;flag_dsar=nmean=ndepth_index=j=i="";var h=[0,1,1,0],p=[0,0,1,1],b=[];dsar_mean=lon0_in="";var l=GSW_INVALID_VALUE;if(-86>c||90<c)return l;0>a&&(a+=360);var l=longs_ref[1]-longs_ref[0],v=lats_ref[1]-lats_ref[0],e=Math.floor(0+(nx-1)*(a-longs_ref[0])/(longs_ref[nx-
1]-longs_ref[0]));e==nx-1&&(e=nx-2);var k=Math.floor(0+(ny-1)*(c-lats_ref[0])/(lats_ref[ny-1]-lats_ref[0]));k==ny-1&&(k=ny-2);for(var m=-1,f=0;4>f;f++)ndepth_index=k+p[f]+(e+h[f])*ny,0<ndepth_ref[ndepth_index]&&(m=Math.max(m,ndepth_ref[ndepth_index]));if(-1==m)return 0;parseInt(m);g>p_ref[parseInt(m)-1]&&(g=p_ref[parseInt(m)-1]);var m=toolbox.gsw_indx(p_ref,nz,g),s=(a-longs_ref[e])/(longs_ref[e+1]-longs_ref[e]),t=(c-lats_ref[k])/(lats_ref[k+1]-lats_ref[k]);g=(g-p_ref[m])/(p_ref[m+1]-p_ref[m]);for(f=
0;4>f;f++)b[f]=delta_sa_ref[m+nz*(k+p[f]+(e+h[f])*ny)];260<=a&&291.999>=a&&3.4<=c&&19.55>=c?toolbox.gsw_add_barrier(b,a,c,longs_ref[e],lats_ref[k],l,v,b):1E10<=Math.abs(array_sum(b))&&toolbox.gsw_add_mean(b,a,c,b);for(var d=(1-t)*(b[0]+s*(b[1]-b[0]))+t*(b[3]+s*(b[2]-b[3])),f=0;4>f;f++)b[f]=delta_sa_ref[m+1+nz*(k+p[f]+(e+h[f])*ny)];260<=a&&291.999>=a&&3.4<=c&&19.55>=c?toolbox.gsw_add_barrier(b,a,c,longs_ref[e],lats_ref[k],l,v,b):1E10<=Math.abs(array_sum(b))&&toolbox.gsw_add_mean(b,a,c,b);a=(1-t)*(b[0]+
s*(b[1]-b[0]))+t*(b[3]+s*(b[2]-b[3]));1E10<=Math.abs(a)&&(a=d);l=d+g*(a-d);return 1E10<=Math.abs(l)?GSW_INVALID_VALUE:l};