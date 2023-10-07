// Funzione per tornare alla pagina precedente nella cronologia del browser
function indietro() {
    history.back();
}

$(function() {
    // Ottenere l'elemento del DOM per visualizzare i dettagli dell'annuncio
    var dettagliAnnuncio = document.getElementById("dettagliAnnuncio");

    // Ottiene i parametri dall'URL
    var urlParams = new URLSearchParams(window.location.search);
    var idAnnuncio = urlParams.get("id");

    // Invio della richiesta AJAX per la visualizzazione dell'annuncio
    $.ajax({
        url: "../php/api.php/visualizzaAnnuncio",
        type: "POST",
        data: {
            id: idAnnuncio
        },
        success: function(response) {
            // Parsa la risposta come oggetto JSON
            var annuncio = JSON.parse(response);

            // Verifica se l'annuncio è disponibile o non esiste
            if (!annuncio) {
                dettagliAnnuncio.innerHTML = "Annuncio non disponibile";
            } else {
                // Crea una stringa di markup HTML per visualizzare i dettagli dell'annuncio
                var annuncioHTML = "";
                annuncioHTML += "<p id='categoria'>" + annuncio.categoria + "</p>";
                annuncioHTML += "<p>" + annuncio.data_ins + "</p>";
                annuncioHTML += "<h2>" + annuncio.titolo + "</h2>";
                annuncioHTML += "<p id='provincia'>&#128205;  " + annuncio.provincia + ", " + annuncio.regione + "</p>";
                annuncioHTML += "<img src='../immagini/" + annuncio.foto + "' id='fotoAnnuncio'>";
                annuncioHTML += "<div id='descrizione'><h4>Descrizione</h4><p>" + annuncio.descrizione + "</p></div>";
                annuncioHTML += "<h4 id='prezzo'>€ " + annuncio.prezzo + "</h4>";
                annuncioHTML += "<div id='condizioni'><h4>Condizioni</h4><p>" + annuncio.condizioni + "</p></div>";
                annuncioHTML += "<h4 id='scrittaVenditore'>Venditore</h4><div id='utente'><div id='venditore'><p>" + annuncio.username + "</p></div><div id='contatti'><p>&#9993; " + annuncio.email + "</p><p>&#9742; " + annuncio.telefono + "</p></div></div>";
                
                // Aggiungere il markup HTML alla pagina
                dettagliAnnuncio.innerHTML = annuncioHTML;
            }
        }
    });
});

// Carica l'header e scatena l'evento DOMContentLoaded
$(function() {
    $("#headerContainer").load("header.html", function() {
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });
});