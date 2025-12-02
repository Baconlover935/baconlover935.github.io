flag = new Array("UK", "US", "DE", "CH", "FR");
country = new Array("UK", "USA", "Deutschland", "Schwiez", "France");
url = new Array("uk", "us", "de", "ch", "fr");
output = '<table cellpadding="4" cellspacing="0"><tr>';
for ( i = 0; i < flag.length; i++ ) {
	output += '<td><a href="https://baconlover935.github.io/pingu.net/' + url[i] + '"><img src="https://web.archive.org/web/20131217191845/http://www.hitentertainment.com/flags/flag' + flag[i] + '.gif" border="0" alt="'+country[i]+'" title="'+country[i]+'"/></a></td>';
}
output += '	</tr></table>';
document.write(output);


}
