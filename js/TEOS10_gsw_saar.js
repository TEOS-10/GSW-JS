/**
* Gibbs SeaWater (GSW) Oceanographic Toolbox of TEOS-10 version 3.0 (C)
* This is as translation to JavaScript from the PHP code by 
* Susanne Feistel.
* Author: E. Garcia-Ladona, ICM-CSIC
* Contact: emilio@icm.csic.es
*
* The original notices follow.
*
* Gibbs SeaWater (GSW) Oceanographic Toolbox of TEOS-10 version 3.0 (C)
* This is as translation of the C-translation into PHP for web-based applications.
* The original notices follow.
* Translation by Susanne Feistel, IOW 2013, 
* Contact: susanne.feistel@io-warnemuende.de
**/

// Global variables
// It is necessary to have loaded TEOS10_gsw_oceanographic_toolbox.js 

  var toolbox = new TEOS10_gsw_oceanographic_toolbox();

/**
**  $Id: gsw_saar.c,v 0fa6ed68e79e 2011/09/25 18:18:19 fdelahoyde $
**
**  TEOS-10 V3.0
*/
/*===========================================
 Function: TEOS10_gsw_saar ()
 Purpose: Creates the TEOS10_gsw_saar object.
     In the following all the methods are 
     created using "prototype".
=============================================*/
function  TEOS10_gsw_saar () {
 // We initialize the object with global variables from TEOS10_gsw_saar_data.js
	this.gsw_nx = gsw_nx;
	this.gsw_ny = gsw_ny;
	this.gsw_nz = gsw_nz;
	this.longs_ref = longs_ref;
	this.lats_ref = lats_ref;
	this.p_ref = p_ref;
	this.ndepth_ref = ndepth_ref;
	this.saar_ref = saar_ref;
	this.delta_sa_ref = delta_sa_ref;
 }
 //
// METHODS 
// 
/*===========================================
 Function: gsw_sum ()
 Purpose: Sum all the elements from an array
=============================================*/
	TEOS10_gsw_saar.prototype.gsw_sum = function (x, n) {
	    //n is not necessary
		var val=0.0;
		for (var i=0; i < x.length; i++) { val += x[i]; } 
		return val;
	}

/*======================================================
 Function: maxvalue ()
 Purpose: Determines the max value. It is
 equivalent to js Math.max(a,b). Only for compatibility
=====================================================*/	
	TEOS10_gsw_saar.prototype.maxvalue = function (a,b) {
		(a>b) ? result = a : result = b;
		return result;
	}
/*======================================================
 Function: sum ()
 Purpose: Wrap around of  gsw_sum()
=====================================================*/		
	TEOS10_gsw_saar.prototype.sum = function(x) { this.gsw_sum(x);	}

/*======================================================
 Function: gsw_saar ()
=====================================================*/		
	TEOS10_gsw_saar.prototype.gsw_saar = function(p, lon, lat) {
		
		var longs_ref = this.longs_ref;
		var lats_ref = this.lats_ref;
		var p_ref = this.p_ref;
		var ndepth_ref = this.ndepth_ref;
		var saar_ref = this.saar_ref;
		var delta_sa_ref = this.delta_sa_ref;
		
		var nx = this.gsw_nx;   var ny = this.gsw_ny;   var nz = this.gsw_nz;
		
		var i = ''; var j = ''; 
		var nmean = ''; var flag_saar = ''; var ndepth_index = '';
		
		var deli = [0,1,1,0];  	var delj = [0,0,1,1];
		var saar = [];
		var saar_old = [];

		var lon0_in = ''; var saar_mean = ''; 

		var return_value = GSW_INVALID_VALUE;

		if (lat  <  -86e0  ||  lat  >  90e0) 
		    return return_value;

		if (lon  <  0.0)
		    lon	= lon + 360.0;
			
		var dlong	= longs_ref[1]-longs_ref[0];
		var dlat	= lats_ref[1]-lats_ref[0];

		var indx0	=  Math.floor(0 + (nx-1)*(lon-longs_ref[0])/(longs_ref[nx-1]-longs_ref[0]));
		if (indx0 == nx-1) indx0 = nx-2;

		var indy0 =  Math.floor(0 + (ny-1)*(lat-lats_ref[0])/(lats_ref[ny-1]-lats_ref[0]));
		if (indy0 == ny-1)  indy0 = ny-2;

		var ndepth_max = -1;
		for ( var k=0; k < 4; k++) {
		    ndepth_index	= indy0 + delj[k] + (indx0 + deli[k]) * ny;
		    if (ndepth_ref[ndepth_index] > 0.0)
				ndepth_max = Math.max(ndepth_max, ndepth_ref[ndepth_index]);
		}

		if (ndepth_max == -1.0e0)
		    return 0.0;

		if (p > p_ref[parseInt(ndepth_max)-1])
		    p = p_ref[parseInt(ndepth_max)-1];
		
		var indz0	= toolbox.gsw_indx(p_ref,nz,p);
		
		var r1	= (lon-longs_ref[indx0])/(longs_ref[indx0+1]-longs_ref[indx0]);
		var s1	= (lat-lats_ref[indy0])/(lats_ref[indy0+1]-lats_ref[indy0]);
		var t1	= (p-p_ref[indz0])/(p_ref[indz0+1]-p_ref[indz0]);

		for ( var k=0; k<4; k++)
		    saar[k]	= saar_ref[indz0+nz*(indy0+delj[k]+(indx0+deli[k])*ny)];
		    
		if (260.0 <= lon && lon <= 291.999 && 3.4 <= lat && lat <= 19.55) {
		    //# memmove(saar_old,saar,4*sizeof (double));
		    saar_old = saar;
		    toolbox.gsw_add_barrier(saar_old, lon, lat, longs_ref[indx0], lats_ref[indy0], dlong, dlat, saar);		
			/* FIXME v FIXME */
		} else if (Math.abs(this.gsw_sum(saar))  >=  1e10) {
		    saar_old = saar;
		    toolbox.gsw_add_mean(saar_old, lon,lat,saar);	
		}

		var sa_upper  = (1.0-s1)*(saar[0] + r1*(saar[1]-saar[0])) + s1*(saar[3] + r1*(saar[2]-saar[3]));
		
		for (var k=0; k<4; k++)
		    saar[k]	= saar_ref[indz0+1+nz*(indy0+delj[k]+ (indx0+deli[k])*ny)];

		if (260.0 <= lon && lon <= 291.999 && 3.4 <= lat && lat <= 19.55) {
		    saar_old = saar;
		    toolbox.gsw_add_barrier(saar_old, lon, lat, longs_ref[indx0], lats_ref[indy0], dlong, dlat, saar);
			/* FIXME v FIXME */
		} else if (Math.abs(this.gsw_sum(saar))  >=  1e10) {
		    saar_old = saar;		    
		    toolbox.gsw_add_mean(saar_old, lon, lat, saar);
		}

		var sa_lower	= (1.0-s1)*(saar[0] + r1*(saar[1]-saar[0])) + s1*(saar[3] + r1*(saar[2]-saar[3]));
		
		if (Math.abs(sa_lower)  >=  1e10)
		    sa_lower	= sa_upper;
		    
		return_value	= sa_upper + t1*(sa_lower-sa_upper);

		if (Math.abs(return_value) >= 1e10)
		    return_value = GSW_INVALID_VALUE;

		return return_value;
	}
/*======================================================
 Function: gsw_delta_sa_ref ()
=====================================================*/		
	TEOS10_gsw_saar.prototype.gsw_delta_sa_ref = function(p, lon, lat) {
		
		longs_ref = this.longs_ref;
		lats_ref = this.lats_ref;
		p_ref = this.p_ref;
		ndepth_ref = this.ndepth_ref;
		saar_ref = this.saar_ref;
		delta_sa_ref = this.delta_sa_ref;
		
		nx = this.gsw_nx; ny = this.gsw_ny; nz = this.gsw_nz;

		i = ''; j = ''; ndepth_index = '';
		nmean = ''; flag_dsar = '';
		var deli = [0,1,1,0];
		var delj = [0,0,1,1];
		
		var dsar = [];
		var dsar_old = [];
		
		lon0_in = ''; 	dsar_mean = ''; 

		var return_value  = GSW_INVALID_VALUE;

		if (lat < -86.0  ||  lat  >  90.0)
		    return return_value;

		if (lon < 0.0)
		    lon	= lon + 360.0;
		
		var dlong	= longs_ref[1]-longs_ref[0];
		var dlat	= lats_ref[1]-lats_ref[0];

		var indx0	= Math.floor(0 + (nx-1)*(lon-longs_ref[0])/(longs_ref[nx-1]-longs_ref[0]));
		
		if (indx0 == nx-1)
		    indx0	= nx-2;

		var indy0	=  Math.floor(0 + (ny-1)*(lat-lats_ref[0])/(lats_ref[ny-1]-lats_ref[0]));
		
		if (indy0 == ny-1)
		    indy0	= ny-2;

		var ndepth_max	= -1;
		for (var k=0; k<4; k++) {
		    ndepth_index	= indy0+delj[k]+(indx0+deli[k])*ny;
		    if (ndepth_ref[ndepth_index] > 0.0)
				ndepth_max	= Math.max(ndepth_max, ndepth_ref[ndepth_index]);
		}

		if (ndepth_max == -1.0)
		    return 0.0;
		
		var ttt = parseInt(ndepth_max)-1;
		var xxx = p_ref[ttt];
		
		if (p > p_ref[parseInt(ndepth_max)-1])
		    p	= p_ref[parseInt(ndepth_max)-1];
		    
		var indz0	= toolbox.gsw_indx(p_ref,nz,p);
	    
		var r1	= (lon-longs_ref[indx0])/(longs_ref[indx0+1]-longs_ref[indx0]);
		var s1	= (lat-lats_ref[indy0])/	(lats_ref[indy0+1]-lats_ref[indy0]);
		var t1	= (p-p_ref[indz0])  /	(p_ref[indz0+1]-p_ref[indz0]);

		for (var k=0; k < 4; k++)
		    dsar[k]	= delta_sa_ref[indz0+nz*(indy0+delj[k]+(indx0+deli[k])*ny)];

		if (260.0 <= lon && lon <= 291.999 && 3.4 <= lat && lat <= 19.55) {
		    dsar_old = dsar;
		    toolbox.gsw_add_barrier(dsar_old,lon,lat,longs_ref[indx0],
					lats_ref[indy0],dlong,dlat,dsar);
		} else if (Math.abs(array_sum(dsar)) >= 1e10) {
		    dsar_old = dsar;
		    toolbox.gsw_add_mean(dsar_old,lon,lat,dsar);
		}

		var sa_upper	= (1.0-s1)*(dsar[0] + r1*(dsar[1]-dsar[0])) +
					s1*(dsar[3] + r1*(dsar[2]-dsar[3]));

		for (var k=0; k<4; k++)
		    dsar[k]	= delta_sa_ref[indz0+1+nz*(indy0+delj[k]+
					(indx0+deli[k])*ny)];

		if (260.0 <= lon && lon <= 291.999 && 3.4 <= lat && lat <= 19.55) {
		    dsar_old = dsar;
		    toolbox.gsw_add_barrier(dsar_old,lon,lat,longs_ref[indx0],
					lats_ref[indy0],dlong,dlat,dsar);
		} else if (Math.abs(array_sum(dsar)) >= 1e10) {
		    dsar_old = dsar;
		    toolbox.gsw_add_mean(dsar_old,lon,lat,dsar);
		}

		var sa_lower	= (1.0-s1)*(dsar[0] + r1*(dsar[1]-dsar[0])) +
					s1*(dsar[3] + r1*(dsar[2]-dsar[3]));
		if (Math.abs(sa_lower) >= 1e10)
		    sa_lower	= sa_upper;
		return_value	= sa_upper + t1*(sa_lower-sa_upper);

		if (Math.abs(return_value) >= 1e10)
		    return (GSW_INVALID_VALUE);

		return return_value;
	}
// End

