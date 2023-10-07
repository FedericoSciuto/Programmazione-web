// Funzione per il caricamento degli annunci
function caricaAnnunci() {
    var listaAnnunci = document.getElementById("listaAnnunci");
    
    // Invio della richiesta AJAX per il caricamento degli annunci
    $.ajax({
        url: "../php/api.php/mieiAnnunci",
        type: "GET",
        success: function(response) {
            var annunci = JSON.parse(response);
            // Se non ci sono annunci, mostra un messaggio
            if (annunci.length == 0) {
                listaAnnunci.innerHTML = "Non hai nessun annuncio";
            } else {
                var annunciHTML = "";
                for (var i = 0; i < annunci.length; i++) {
                    // Crea una stringa di markup HTML per visualizzare la lista degli annunci
                    annunciHTML += "<div class='annunci' data-id='" + annunci[i].idAnnuncio + "'>";
                    annunciHTML += "<h3>" + annunci[i].titolo + "</h3>";
                    annunciHTML += "<img src='../immagini/" + annunci[i].foto + "' id='fotoAnnunci'>";
                    annunciHTML += "<p>" + annunci[i].provincia + ", " + annunci[i].regione + " - " + annunci[i].data_ins + "</p>";
                    annunciHTML += "<h4>€ " + annunci[i].prezzo + "</h4>";
                    annunciHTML += "</div>";
                }
                // Aggiungere il markup HTML alla pagina
                listaAnnunci.innerHTML = annunciHTML;
            }
        }
    });
}

// Funzione per il reindirizzamento alla pagina di creazione di un annuncio
function inserisciAnnuncio() {
    window.location.href = "../html/nuovoAnnuncio.html";
}

// Funzione per l'apertura di un annuncio specifico
function apriAnnuncio(idAnnuncio) {
    var url = "http://sellit.altervista.org/html/mioAnnuncio.html?id=" + idAnnuncio;
    window.location.href = url;
}

// Listener per gli eventi di click per l'apertura degli annunci
document.addEventListener("click", function(event) {
    var target = event.target;
    var annuncio = target.closest(".annunci");
    if (annuncio) {
        var idAnnuncio = annuncio.getAttribute("data-id");
        if (idAnnuncio) {
            apriAnnuncio(idAnnuncio);
        }
    }
});

// Carica gli annunci quando il documento è pronto
document.addEventListener("DOMContentLoaded", function() {
    caricaAnnunci();
});

// Carica l'header e scatena l'evento DOMContentLoaded
$(function() {
    $("#headerContainer").load("header.html", function() {
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });
});