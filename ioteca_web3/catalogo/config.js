
var baseUrl = 'http://localhost:8000/';
var catalogoUrl = 'http://localhost:8000/api/catalogo/';


var client_id = 'YX73ry9Xck7OvBz15VELaBazyNYAdulgtOhADJJc';
var client_secret = 'tcLfskNxdkvO7ENxFGM3JGQ0dmc7vWwatHNe5Tl9fX4CDFRlsmN2vrcphlHSPMuZKydSVB8nupZuEWAUOJmpa4W3s0akd2faiVsnUe4VYbdgdH5MlbJdSQtmQczXO29H';
var grant_type= 'password';

var config = {
    
    baseUrl: baseUrl,
    catalogoUrl: catalogoUrl,

    client_id: client_id,
    client_secret: client_secret,
    grant_type: grant_type,

};

app.value('config', config);

