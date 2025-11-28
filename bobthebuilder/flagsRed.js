flag = new Array("US", "GB", "CA", "AU", "NL", "DE", "FR", "ES", "IT", "JP", "ROW");
country = new Array("USA", "UK", "Canada", "Australia", "Nederland", "Deutschland", "France", "España", "Italia", "Japan", "Rest of the World");
/*url = new Array("usa/index.html","uk/index.html","bob_the_builder_online_website_canada_flag_page.html","au/main.html","nl/main.html","de/main.html","fr/index.html","es/main.html", "it/main.html", "jp/main.html", "row/main.html");*/

output = '<p align="center">';
output += '<table cellpadding="4" cellspacing="0"><tr>';
for ( i = 0; i < flag.length; i++ ) {
	output += '<td><a href="setCookie.asp?akaLocale=' + flag[i] + '" target="_parent"><img src="https://web.archive.org/web/20111024165624/http://www.hitentertainment.com/flags/flag' + flag[i] + '.gif" border="0" title="'+country[i]+'" alt="'+country[i]+'"/></a></td>';
}
output += '	</tr></table></p>';
document.write(output);


}
