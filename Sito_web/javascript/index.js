// Inizializzazione della variabile per la categoria selezionata
var selectedCategory = null;

// Funzione per il caricamento degli annunci
function caricaAnnunci() {
    var listaAnnunci = document.getElementById("listaAnnunci");
    var urlParams = new URLSearchParams(window.location.search);
    var category = urlParams.get("category") || null;
    var title = urlParams.get("title") || null;
    var luogo = urlParams.get("from") || null;
    var ordine = urlParams.get("order") || null;
    var selectedCategory = document.getElementById("selectedCategory");

    // Ottiene i parametri dall'URL
    var requestData = {
        category: category,
        title: title,
        luogo: luogo,
        ordine: ordine
    };

    // Se la categoria non è specificata viene impostata uguale a null
    if (!category) {
        requestData.category = null;
    }
    // Mostra la categoria selezionata nell'elemento HTML corrispondente
    if (category) {
        selectedCategory.innerHTML = category.replace(/-/g, " ");
    }
    // Se il titolo non è specificato viene impostato uguale a null
    if (!title) {
        requestData.title = null;
    }

    // Invio della richiesta AJAX per il caricamento degli annunci
    $.ajax({
        url: "../php/api.php/caricaAnnunci",
        type: "POST",
        data: requestData,
        success: function(response) {
            var annunci = JSON.parse(response);
            // Se non ci sono annunci, mostra un messaggio
            if (annunci.length == 0) {
                listaAnnunci.innerHTML = "<h3 id='noAnnunci'>Nessun annuncio disponibile</h3>";
            } else {
                var annunciHTML = "";
                for (var i = 0; i < annunci.length; i++) {
                    // Crea una stringa di markup HTML per visualizzare la lista degli annunci
                    annunciHTML += "<div class='annunci' data-id='" + annunci[i].idAnnuncio + "'>";
                    annunciHTML += "<h3>" + annunci[i].titolo + "</h3>";
                    annunciHTML += "<img src='../immagini/" + annunci[i].foto + "' id='fotoAnnunci'>";
                    annunciHTML += "<p>&#128205; " + annunci[i].provincia + ", " + annunci[i].regione + " - " + annunci[i].data_ins + "</p>";
                    annunciHTML += "<h4>€ " + annunci[i].prezzo + "</h4>";
                    annunciHTML += "</div>";
                }
                // Aggiungere il markup HTML alla pagina
                listaAnnunci.innerHTML = annunciHTML;
            }
        }
    });
}

// Funzione per caricare i luoghi nell'elemento "luogo"
function caricaLuogo() {
    $.ajax({
        url: "../php/api.php/luogo",
        type: "GET",
        success: function(province) {
            var select = $("#luogo");
            select.empty();
            select.append(province);
        }
    });
}

// Carica gli annunci e i luoghi quando il documento è pronto
document.addEventListener("DOMContentLoaded", function() {
    caricaAnnunci();
    caricaLuogo();
});

// Funzione per il reindirizzamento alla pagina di creazione di un annuncio
function inserisciAnnuncio() {
    window.location.href = "../html/nuovoAnnuncio.html";
}

// Funzione per l'apertura di un annuncio specifico
function apriAnnuncio(idAnnuncio) {
    var url = "http://sellit.altervista.org/html/annuncio.html?id=" + idAnnuncio;
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

// Listener del cambiamento del luogo per aggiornare l'URL e caricare gli annunci
document.getElementById("luogo").addEventListener("change", function() {
    var luogo = document.getElementById("luogo").value;
    var category = null;
    var title = null;
    var ordine = null;
    
    var urlParams = new URLSearchParams(window.location.search);
    category = urlParams.get("category");
    title = urlParams.get("title");
    ordine = urlParams.get("order");
    
    var url = new URL(window.location.href);
    
    if (category) {
        url.searchParams.set("category", category);
    }
    
    if (luogo) {
        url.searchParams.set("from", luogo);
    }
    
    if (title) {
        url.searchParams.set("title", title);
    }
    
    if (ordine) {
        url.searchParams.set("order", ordine);
    }
    
    var newUrl = url.pathname + url.search;        
    window.history.pushState({ path: newUrl}, "", newUrl);

    caricaAnnunci();
});

// Listener del cambiamento dell'ordine per aggiornare l'URL e caricare gli annunci
document.getElementById("ordine").addEventListener("change", function() {
    var category = null;
    var luogo = null;
    var title = null;
    var ordine = document.getElementById("ordine").value;
    
    var urlParams = new URLSearchParams(window.location.search);
    category = urlParams.get("category");
    luogo = urlParams.get("from");
    title = urlParams.get("title");
    
    var url = new URL(window.location.href);
    
    if (category) {
        url.searchParams.set("category", category);
    } 
    
    if (luogo) {
        url.searchParams.set("from", luogo);
    } 
    
    if (title) {
        url.searchParams.set("title", title);
    }
    
    if (ordine) {
        url.searchParams.set("order", ordine);
    }
    
    var newUrl = url.pathname + url.search;        
    window.history.pushState({ path: newUrl}, "", newUrl);

    caricaAnnunci();
});

// Carica l'header e scatena l'evento DOMContentLoaded
$(function() {
    $("#headerContainer").load("header.html", function() {
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });
});