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
                annuncioHTML += "<button onclick='apriModificaAnnuncio(" + idAnnuncio + ")' id='modifyButton'>Modifica annuncio</button>";
                annuncioHTML += "<button onclick='eliminaAnnuncio(" + idAnnuncio + ")' id='deleteButton'>Elimina annuncio</button>";
                
                // Aggiungere il markup HTML alla pagina
                dettagliAnnuncio.innerHTML = annuncioHTML;
            }
        }
    });
});

// Funzione per il reindirizzamento alla pagina di modifica dell'annuncio
function apriModificaAnnuncio(idAnnuncio) {
    var url = "http://sellit.altervista.org/html/modificaAnnuncio.html?id=" + idAnnuncio;
    window.location.href = url;
}

// Funzione per il reindirizzamento alla pagina di eliminazione dell'annuncio
function eliminaAnnuncio(idAnnuncio) {
    $.ajax({
        url: "../php/api.php/eliminaAnnuncio",
        type: "DELETE",
        data: {
            id: idAnnuncio
        },
        success: function(response) {
            console.log(response);

            // Se l'annuncio è stato eliminato con successo, mostra un messaggio e reindirizza alla pagina mieiAnnunci
            if (response == "Annuncio eliminato con successo") {
                alert(response);
                window.location.href = "../html/mieiAnnunci.html";
            }
        }
    });
}

// Carica l'header e scatena l'evento DOMContentLoaded
$(function() {
    $("#headerContainer").load("header.html", function() {
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });
});