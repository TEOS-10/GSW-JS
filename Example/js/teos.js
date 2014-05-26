//
// Script called in Example/teos.html
// Emilio García Ladona <emilio@icm.csic.es>
// Institut de Ciències del Mar (ICM-CSIC)
// Passeig Marítim, 37-49
// E08003 Barcelona (Spain)
// 
//=============================
﻿// Functions:
//
//  creabloque(id): 
//  closebloque(bloque):
//  muestrafigura(options):
//  helprutine(variable): 
//  tabla_funciones();
//============================  

// TEOS10 Objects

    var TEOS10 = new TEOS10_gsw_oceanographic_toolbox();
    var GSW_saar = new TEOS10_gsw_saar(); 

// Several sections
    var sect = ["Temperature and Salinity Conversions","Density and Enthalpy, based on the 48-term expression for density", "Freezing Temperatures", "Isobaric melting enthalpy and isobaric evaporaction enthalpy", "Basic Thermodynamic Properties in terms of in-situ t, based on the exact Gibbs function", "Library functions of the GSW toolbox"];

//
// Several Functions:  Warning require Mathjax to process the LaTeX code
//
   var sectfunc=new Array();
  sectfunc[0]={ functions:["gsw_sa_from_sp","gsw_sstar_from_sp","gsw_ct_from_t","gsw_deltasa_from_sp","gsw_sr_from_sp","gsw_sp_from_sr","gsw_sp_from_sa","gsw_sstar_from_sa","gsw_sp_from_sstar","gsw_sa_from_sstar","gsw_ct_from_pt","gsw_pt_from_ct","gsw_pt0_from_t","gsw_pt_from_t"],
      funcdesc:["$S_A (S_p, p, Lon, Lat)$ [g/kg]","$S_* (S_p, p, Lon, Lat)$ [g/kg]","$\\Theta (S_A, t, p) [ ^{\\circ}{\\rm C}]$","$\\delta S_A (S_p, p, Lon, Lat)$ [g/kg]","$S_R (S_p)$ [g/kg]"," $S_p (S_R)$","$S_p (S_A, p, Lon, Lat)$","$S_* (S_A, p, Lon, Lat)$ [g/kg]","$S_p (S_*, p, Lon, Lat)$","$S_A (S_*, p, Lon, Lat)$ [g/kg]","$\\Theta (S_A, \\theta)$ $[ ^{\\circ}{\\rm C}]$","$\\theta (S_A, \\Theta) [ ^{\\circ}{\\rm C}]$","$\\theta (S_A, t, p, p_r=0 db)$ $[ ^{\\circ}{\\rm C}]$","$\\theta (S_A, t, p, p_r)$ $[ ^{\\circ}{\\rm C}]$"],
      funcpara:[["sp","p","lon","lat"],["sp","p","lon","lat"],["sa","t","p"],["sp","p","lon","lat"],["sp"],["sr"],["sa","p","lon","lat"],["sa","p","lon","lat"],["sstar","p","lon","lat"],["sstar","p","lon","lat"],["sa","pt"],["sa","ct"],["sa","t","p"],["sa","t","p","p_ref"]],
      funcparat:[["$S_p$","p [db]","Lon [0,360]","Lat [-90,90]"],["$S_p$","p [db]","Lon [0,360]","Lat [-90,90]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_p$","p [db]","Lon [0,360]","Lat [-90,90]"],["$S_p$"],["$S_R$ [g/kg]"],["$S_A$ [g/kg]","p [db]","Lon [0,360]","Lat [-90,90]"],["$S_A$ [g/kg]","p [db]","Lon [0,360]","Lat [-90,90]"],["$S_*$ [g/kg]","p [db]","Lon [0,360]","Lat [-90,90]"],["$S_*$ [g/kg]","p [db]","Lon [0,360]","Lat [-90,90]"],["$S_A$ [g/kg]","$\\theta$ $[ ^{\\circ}{\\rm C}]$"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]","$p_r$ [db]"]],
      funcref: [{page:85,ref:"A.5, p: 75;",href:"SA_from_SP"},{page:86,ref:"eq (A5.6), p:76; A.4",href:"Sstar_from_SP"},               {page:37,ref:"eq (3.3.1) p: 27",href:"CT_from_t"},{page:23,ref:"eq (2.5.1), p:13",href:"deltaSA_from_SP"},{page:20,ref:"eq (2.4.1), p:10; A3, p:67",href:"SR_from_SP"},{page:20,ref:"eq (2.4.1), p:10; A3, p:67",href:"SP_from_SR"},{page:79,ref:"A.5, p:69, 73;",href:"SP_from_SA"},{page:79,ref:"A.5, p:69, 73",href:"Sstar_from_SA"},{page:79,ref:"A.5, p:69, 73",href:"SP_from_Sstar"},{page:79,ref:"A.5, p:69, 73",href:"SA_from_Sstar"},{page:37,ref:"eq (3.2.1-3.3.1) p: 27",href:"CT_from_pt"},{page:37,ref:"eq (3.3.1) p: 27",href:"pt_from_CT"},{page:107,ref:"A.17 p: 97",href:"pt0_from_t"},{page:107,ref:"A.17 p: 97",href:"pt_from_t"}] 
          };

sectfunc[1]={
     functions:["gsw_rho","gsw_alpha","gsw_beta","gsw_specvol","gsw_specvol_anom","gsw_sound_speed","gsw_internal_energy","gsw_enthalpy","gsw_dynamic_enthalpy"],
     funcdesc:["$\\hat{\\rho} (S_A, \\Theta, p)$ [kg/$m^3$]","$\\alpha^{\\Theta} (S_A, \\Theta, p)$","$\\beta^{\\Theta} (S_A, \\Theta, p)$","$v^{\\Theta} (S_A, \\Theta, p)$ [kg/$m^3$]","$\\hat{\\delta} (S_A, \\Theta, p)$ [kg/$m^3$]","$\\hat{c} (S_A, \\Theta, p)$ [m/s]","$\\hat{u} (S_A, \\Theta, p)$ [J/kg]","$\\hat{h} (S_A, \\Theta, p)$ [J/kg]","Dynamic Entalphy $\\equiv \\hat{h} (S_A, \\Theta, p) - c^0_p\\;\\Theta$ [J/kg]"],
     funcpara:[["sa","ct","p"],["sa","ct","p"],["sa","ct","p"],["sa","ct","p"],["sa","ct","p"],["sa","ct","p"],["sa","ct","p"],["sa","ct","p"],["sa","ct","p"]],
     funcparat:[["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$","p [db]"]],
     funcref: [{page:28,ref:"eq (2.8.1), p: 18; eq (A.30.1), p:120; eq (K1), p:153;",href:"rho"},{page:32,ref:"eq (2.18.3), p:22; eq (A.15.4), p:92",href:"alpha"},{page:33,ref:"eq (2.19.3), p:23; eq (A.15.10), p:93",href:"beta"},{page:28,ref:"eq (2.7.1), p:18; eq (A.30.1), p:120; eq (K1), p:153;",href:"specvol"},{page:39,ref:"eq (3.7.3) p:19; eq (A.30.1), p:120; eq (K1), p:153;",href:"specvol_anom"}, {page:32,ref:"eq (2.17.1) pg:22",href:"sound_speed"},{page:30,ref:"eq (2.11.1), p:20",href:"internal_energy"},{page:30,ref:"eq (2.12.1), p:20",href:"enthalpy"},{page:37,ref:"eq (3.2.1) p:27; eq (A.30.6), p:122",href:"dynamic_enthalpy"}] };

sectfunc[2]={
      functions:["gsw_ct_freezing","gsw_t_freezing"],
      funcdesc:["$\\Theta^f (S_A, p, A_s)$ $[ ^{\\circ}{\\rm C}]$","$t^f (S_A, p, A_s)$ $[ ^{\\circ}{\\rm C}]$"],
      funcpara:[["sa","p","saturation_fraction"],["sa","p","saturation_fraction"]],
      funcparat:[["$S_A$ [g/kg]","p [db]","Saturation_fraction"],["$S_A$  [g/kg]","p [db]","Saturation_fraction"]],
      funcref:[{page:56,ref:"eq (2.11.1), p:46",href:"CT_freezing"},{page:56,ref:"eq (2.11.1), p:46",href:"t_freezing"}] };

sectfunc[3]={
      functions:["gsw_latentheat_melting","gsw_latentheat_evap_ct","gsw_latentheat_evap_t"],
      funcdesc:["$L^{SI}_p (S_A, p)$ [J/kg]","$L^{SA}_p (S_A, \\Theta)$ [J/kg]","$L^{VW}_p (S_A, t)$ [J/kg]"],
      funcpara:[["sa","p"],["sa","ct"],["sa","t"]],
      funcparat:[["$S_A$ [g/kg]","p [db]"],["$S_A$ [g/kg]","$\\Theta$ $[ ^{\\circ}{\\rm C}]$"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$"]],
      funcref:[{page:59,ref:"eq (3.34.6), p:49",href:"latentheat_melting"},{page:64,ref:"eq (3.39.7), p:54",href:"latentheat_evap_ct"},
               {page:64 ,ref:"eq (3.39.7), p:54",href:"latentheat_evap_t"}] };
	  
sectfunc[4]={
      functions:["gsw_rho_t_exact","gsw_pot_rho_t_exact","gsw_alpha_wrt_t_exact","gsw_beta_const_t_exact","gsw_specvol_t_exact","gsw_sound_speed_t_exact","gsw_kappa_t_exact","gsw_enthalpy_t_exact","gsw_entropy_t_exact","gsw_cp_t_exact"],
      funcdesc:["$\\rho (S_A, t, p)$ [kg/$m^3$]","$\\widetilde{\\rho} (S_A, t, p, p_{r})$ [kg/$m^3$]","$\\alpha^t (S_A, t, p)$ [1/K]","$\\beta^t (S_A, t, p)$ [kg/g]","$v (S_A, t, p)$ [$kg/m^3$]","$c (S_A, t, p)$ [m/s]","$\\kappa (S_A, t, p)$ [1/Pa]", "$h (S_A, t, p)$ [J/kg]","$\\eta (S_A, t, p)$ [J/(kg K)]","$c_p (S_A, t, p) $ [J/(kg K)]"],
      funcpara:[["sa","ct","p"],["sa","t","p","p_ref"],["sa","t","p"],["sa","t","p"],["sa","t","p"],["sa","t","p"],["sa","t","p"],["sa","t","p"],["sa","t","p"],["sa","t","p"]],
      funcparat:[["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]","$p_{r}$ [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"]],
      funcref:[{page:28,ref:"eq (2.8.1), p:18; A.H, p:146",href:"rho_t_exact"},{page:28,ref:"eq (2.8.1), p:18; A.H, p:146; A.G p:145;",href:"pot_rho_t_exact"},{page:32,ref:"eq (2.18.1), p:22",href:"alpha_wrt_t_exact"},{page:33,ref:"eq (2.19.1), p:23",href:"beta_const_t_exact"},
               {page:28,ref:"eq (2.7.1), p:18",href:"specvol_t_exact"},{page:32,ref:"eq (2.17.1), p:22",href:"sound_speed_t_exact"},{page:31,ref:"eq (2.15.1), p:21",href:"kappa_t_exact"},{page:30,ref:"eq (2.12.1), p:20",href:"enthalpy_t_exact"},{page:30,ref:"eq (2.10.1), p:20",href:"entropy_t_exact"},{page:34,ref:"eq (2.20.1), p:24",href:"cp_t_exact"}]  };
	   
sectfunc[5]={
    functions:["gsw_gibbs","gsw_saar","gsw_delta_sa_ref","gsw_fdelta","gsw_sa_from_sp_baltic","gsw_sp_from_sa_baltic","gsw_entropy_part","gsw_entropy_part_zerop","gsw_gibbs_pt0_pt0"],
    funcdesc:["$g (n_{S_A}, n_t, n_p, S_A, t, p)$ [J kg]  --  ($\\partial^n g/\\partial x_i$)","$R^\\delta \\equiv \\delta S_A /S_R$ (excluding Baltic Sea)","$(\\delta S_A)_r$ [g/kg] (excluding Baltic Sea)","$F^\\delta-1= 2 r_1 R\\delta/(1-r_1R^\\delta)$","$S_A (S_p)$ [g/kg], Baltic Sea","$S_p (S_A)$, Baltic Sea","$\\eta$, entropy minus the terms that are a function of only S_A, [J/(kg K)]","$\\eta$, entropy part evaluated at the sea surface, [J/(kg K)]","$g(S_A,\\theta) \\equiv g(0, 2, 0, S_A, t, p_r=0\\;db)$ [J kg] "],
    funcpara:[["ns","nt","np","sa","t","p"],["p","lon","lat"],["p","lon","lat"],["p","lon","lat"],["sp","long_bs","lat_bs"],["sa","long_bs","lat_bs"],["sa","t","p"],["sa","pt0"],["sa","pt0"]],
    funcparat:[["$n_S_A$","$n_t$","$n_p$","$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["p [db]","Lon [0-360]","Lat [-90-90]"],["p [db]","Lon [0-360]","Lat [-90-90]"],["p [db]","Lon [0-360]","Lat [-90-90]"],["$S_p$","Lon [0-360]","Lat [-90-90]"],["$S_A$ [g/kg]","Lon [0-360]","Lat [-90-90]"],["$S_A$ [g/kg]","t $[ ^{\\circ}{\\rm C}]$","p [db]"],["$S_A$ [g/kg]","$\\theta [ ^{\\circ}{\\rm C}]$"],["$S_A$ [g/kg]","$\\theta [ ^{\\circ}{\\rm C}]$"]],
      funcref:[{page:25,ref:"eq (2.6.3), p:15; eqs (G.1, H.1), ps:145-146",href:"gibbs"},{page:85,ref:"eqs (A.5.2, A.5.5), p:75",href:"SAAR"},
	  {page:85,ref:"eqs (A.5.2, A.5.5), p:75",href:"deltaSA_atlas"},{page:113,ref:"eq (A.20.1-2), p:103-104",href:"Fdelta"},
	  {page:85,ref:"A.5, p: 75;",href:"SA_from_SP_Baltic"},{page:85 ,ref:"A.5, p: 75;",href:"SP_from_SA_Baltic"},{page:30,ref:"eq (2.10.1), p:20; eq (G.1), p:145; eq (H.1), p:146",href:""},{page:30,ref:"eq (2.10.1), p:20; eq (G.1), p:145; eq (H.1), p:146",href:""},{page:25,ref:"eq (2.6.3), p:15; eq (G.1), p:145; eq (H.1), p:146",href:"gibbs"}]
	  };

//=======================================================================
// Function: creabloque(): Creates a hidden div. 
// Parameter: id : the identifier of an element in the DOM <div id="id">
//=======================================================================
function creabloque(id) {

 var cerrar="<a id=\"cerrar"+id+"\" href=\"javascript:void(close('"+id+"'))\"><img class=\"close\" src=\"./images/x.png\"></a>\n";
 var titulo="<div id=\"titulo"+id+"\" class=\"titulores\">"+cerrar+"</div>\n";
 var cuerpo="<div id=\"cuerpo"+id+"\" class=\"cuerpo\"></div>\n";
 var pie="<p class=\"piefig\" id=\"piefig"+id+"\"></p>\n";
 
  var texto =  titulo + cuerpo + pie;
 
  jQuery('<div/>', { id: id, html: texto, class: 'figura' }).appendTo('body'); 
 
   $("#"+id).css('width','70%');    // by defualt occupies 70% of the screen
   $("#"+id).css('display','none');
   $("#"+id).css('z-index','99999');  // We put a higher z-index to be sure that pops up over the rest of elements

   $(function() { $( "#"+id ).draggable(); });

} 

//=================================================
// Function: close(id)
// Parameter: id, id of the pop-up to close
//================================================
function close(id) {  
 $("#"+id).css({'display':'none'});
 return null;
 }

//==============================================================================
// Function: muestrafigura(): Creates a pop-up div to show a brief
// summary of the notation page.
// Parameter: options object
// options={file:'',label:'',ancho:''}
//===========================================================================
function muestrafigura(options) {
 
   var label = options.label;
   var ancho  = options.ancho;
   var bloqueid = options.file; 

   if ( typeof options.state == 'undefined' ) { options.state = 'show'; }
   if ( typeof ancho == 'undefined' || ancho.trim() == '' || ancho.trim() == '%') { 
        ancho = '80%';
   }

//if the element was created before it only shows it 
   if ( $("#"+bloqueid).length > 0 ) {
        $("#"+bloqueid).css('display','block');
       return;
   }
 
   creabloque(bloqueid); 

   var contenedor = " #panel-en"; 
   var texto = '<h3>'+label+'</h3>'; // Texto por defecto
   var nombreglobal = './'+options.file +'.html';
     
   $("#titulo"+bloqueid).append(texto);
   
     ancho=ancho.substr(0,2);
     ancho=Math.round(ancho)*10;

   $("#cuerpo"+bloqueid).load(nombreglobal+contenedor,function() {
		var cargado=$("#cuerpo"+bloqueid).html();

                MathJax.Hub.Queue(["Typeset",MathJax.Hub,bloqueid]);

	        $("#"+bloqueid).css({'width': ancho+"px" });
                if (options.state =="show") {
                 $("#"+bloqueid).css({'display':'block'});
                } else {
                 $('#titulointro').css('text-align','center');
                 $('#titulointro').html(abans[lang]);
                 $('#introex').html(introex);
               }                              
    });
 
// The div can be dragged 
   $(function() { $( "#"+bloqueid ).draggable(); });
	
} // of muestrafigure()

//==============================================================================
// Function: helprutine(): Creates a po-up div to show the function headers
// Parametro: options : Object with the options 
// options={file:'',label:'',ancho:''}
//==================================================================
  function helprutine(options) {

   var ancho  = '55%';
   var file  = options.file + '.html';
   var is  = options.section;
   var iref = sectfunc[is].functions.indexOf(options.tipo);

   if ( $("#"+options.tipo).length > 0 ) {
        $("#"+options.tipo).css('display','block');
       return;
   }
  
    creabloque(options.tipo);

	var contenedor = " #" + options.tipo;

        var TEOSM="<a href=\"http://www.teos-10.org/pubs/TEOS-10_Manual.pdf#page="+sectfunc[is].funcref[iref].page+
                    "\" target=\"_blank\">TEOS-10 manual</a>,"+sectfunc[is].funcref[iref].ref;

        var REFERENCIA = TEOSM;
        if( sectfunc[is].funcref[iref].href !== "") 
           REFERENCIA = TEOSM + " and " + "<a href=\"http://www.teos-10.org/pubs/gsw/pdf/"+sectfunc[is].funcref[iref].href+".pdf\" target=\"_blank\">TEOS-10, GSW Notes</a>";

	$("#titulo"+options.tipo).append("<h3>Function: "+options.label+"</h3>");
        $("#"+options.tipo).css({'width':ancho});	

	$("#cuerpo"+options.tipo).load(file+contenedor,function() {
	     var cargado=$("#cuerpo"+options.tipo).html();   
             $("#"+options.tipo).css({'display':'block'});	
             $("#"+options.tipo+" span[name='referencia']").html(REFERENCIA);	
         });
       
// The div can be dragged 
   $(function() { $( "#"+options.tipo ).draggable(); });

  }

//=================================================================================
// Function: tabla_funciones(): Write a table with multiple TEOS-10 v 3.0 functions
//=================================================================================
 function tabla_funciones() {

    var nota = "<a style=\"color: #fff;\" href=\"javascript:void(muestrafigura({file:'TEOS10notation',label:'Notation',ancho:'75%'}))\">Notation</a>";
	
    var html = "<table id=\"TABLA\" border=\"1px\" style=\"width:100%;font-size:90%;\">\n";
	
    for (var i=0; i < sect.length; i++) {
	  html +="<tr><td class=\"b\" colspan=\"2\" style=\"padding-left:1ex;padding-right:2ex;background: #555; color:#fff;\">" + sect[i] + "<span style=\"float:right;\">" + nota+" </span></td></tr>\n";
		for (var j=0; j < sectfunc[i].functions.length; j++) {
		var ids ="in_" + j;
		var boton = "<input type=\"submit\" value=\" COMPUTE \" onclick=\"res=TEOS10." + sectfunc[i].functions[j] + "(parametros);alert(res)\"> ";
		   html  += "<td style=\"vertical-align:middle;padding-left:1ex;\">" + boton + "<a href=\"javascript:void(helprutine({tipo:'"+sectfunc[i].functions[j]+"',label:'cabecera', file:'TEOS10help',section:"+i+"}))" + "\">" + sectfunc[i].funcdesc[j] + "</a></td><td>";
		   var cadena = "$('#"+ids+"_"+sectfunc[i].funcpara[j][0]+"').val()";
		   var cadenahelp = "<span class=\\'azul\\'>" + sectfunc[i].functions[j] + "</span> (<span class=\\'ora\\'>" + sectfunc[i].funcpara[j][0];
		   for (var k=1; k < sectfunc[i].funcpara[j].length; k++) {
		      cadena +=  "," + "$('#"+ids+"_" + sectfunc[i].funcpara[j][k] + "').val()";
		      cadenahelp +=  ", " + sectfunc[i].funcpara[j][k];
		   }
		   cadenahelp += "</span>)";
		   html = html.replace('cabecera',cadenahelp);
		   html = html.replace('parametros',cadena);
		   for (var k=0; k < sectfunc[i].funcpara[j].length; k++) {
		     if (sectfunc[i].functions[j] == "gsw_gibbs" && ( k==0 || k==1 || k==2 ) ) {
		      html += sectfunc[i].funcpara[j][k] +
			  "<input type=\"text\" size=\"2\" id=\"" + ids + "_" + sectfunc[i].funcpara[j][k] + "\"> ";
		     } else
		       html += sectfunc[i].funcparat[j][k] +
			  "<input type=\"text\" size=\"8\" id=\"" + ids + "_" + sectfunc[i].funcpara[j][k] + "\"> ";
		     }
		   html +="</td></tr>\n";
		}	
	}
	html +='</table>\n';

   document.write(html);

}

//
// END
//
