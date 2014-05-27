TEOS-10 V3.0 GSW Oceanographic Toolbox in JavaScript

This is a translation from the PHP code (version 5.3.8) to JS.

Here the quotes of the PHP based code:

"This is a translation of the C code into PHP (version 5.3.8) by
Susanne Feistel, IOW 2013, (susanne.feistel@io-warnemuende.de)
You should download the documentation from http://teos-10.org.
The functions gsw_saar and gsw_delta_sa_ref
have been modified from the original to not use an external
data file for global absolute salinity anomaly and absolute
salinity anomaly ratio data. The data are instead incorporated
into static tables that are used directly."

Files:
======

    readme.txt					- this file.
    index.html					- the check javascript functions library.
    teos.css					- A few styles used
    
    /js/TEOS10_gsw_oceanographic_toolbox.js	- the GSW library less gsw_saar
    /js/TEOS10_gsw_oceanographic_toolbox_min.js	- minified code of TEOS10_gsw_oceanographic_toolbox.js
    /js/TEOS10_gsw_saar.js			- the gsw_saar and gsw_delta_sa_ref (modified)
    /js/TEOS10_gsw_saar_min.js			- minified code of TEOS10_gsw_saar.js
    /js/TEOS10_gsw_saar_data.js			- static global absolute salinity anomaly data used by gsw_saar.c and created by gsw_format Gibbs SeaWater (GSW) Oceanographic Toolbox of TEOS-10 version
    
    /Example/teos.html				- a sample page to use JS version of several functions of TEOS10 Library
    /Example/TEOS10help.html			- help page with the headers of the TEOS10 Library
    /Example/TEOS10notation.html		- help page with the summary of symbols used in teos.html
    /Example/css/example.css			- a few styles used in teos.html
    /Example/css/cupertino.css			- a few styles used in teos.html (from jQuery UI)
    /Example/images/x.png			- icon used in pop-up divs
    /Example/js/teos.js				- Functions to build and manage teos.html
    /Example/js/jquery-1.11.0.min.js		- jQuery library
    /Example/js/jquery-ui.custom.js		- jQuery UI library
    /Example/Mathjax				- Mathjax library to show LaTeX code in html pages
						
Installation:
==========

Copy all files in a local directory or web server directory.
Open the index.html into the browser or call http://your.webserver.com/your-directory/index.html
to see functions and check values. If no value appears in red the installation is ok !.

To call the GSW library in any page:

    1) Be sure that the three JS files are loaded in the page's header
 
    <head>
	.....
     <script src="./js/TEOS10_gsw_saar_data.js"></script>                 <!-- Data Tables --->
     <script src="./js/TEOS10_gsw_oceanographic_toolbox_min.js"></script> <!-- TEOS Toolbox --->
     <script src="./js/TEOS10_gsw_saar_min.js"></script>                  <!-- GSW_saar --->
	......
    </head>
    
    2) These files build two objects:

         TEOS10_gsw_saar
         TEOS10_gsw_oceanographic_toolbox

For any page you want to use it, just do something as 

    <script type="text/javascript">
       var TEOS10 = new TEOS10_gsw_oceanographic_toolbox();
       var GSW_saar = new TEOS10_gsw_saar(); 
    </script>

and then call the methods as

    var p_sal=TEOS10.gsw_sa_from_sp(35.0, 100.0, 260.0, 20.0);

Requirements:
========

You don't need something special to use TEOS10 JS library. But if you
look at teos.html page in the "Example" folder by sure of the correct links
to:

    - jQuery and jQuery UI libraries
    - MathJax:

that are also included in /Example/js/ folder only for demostration purposes.

ChangeLog:
=======

2014-05-29:	gsw-3.0 Initial creation.

Emilio García Ladona <emilio@icm.csic.es>
Institut de Ciències del Mar (ICM-CSIC)
Passeig Marítim, 37-49
E08003 Barcelona (Spain)
