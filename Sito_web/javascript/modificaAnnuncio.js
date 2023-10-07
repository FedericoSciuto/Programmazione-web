// Funzione per tornare alla pagina precedente nella cronologia del browser
function indietro() {
    history.back();
}

// Funzione per verificare la validità del prezzo
function isPriceValid(prezzo) {
    // Il prezzo può contenere solamente numeri e la cifra che può essere inserita varia da 0 a 2000000000
    var regex = /^(0|[1-9]\d{0,8}(\.\d{1,2})?|1\d{0,9}|2000000000)$/;
    return regex.test(prezzo);
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
                annuncioHTML += '<p id="categoria">' + annuncio.categoria + '</p>';
                annuncioHTML += '<p>' + annuncio.data_ins + '</p>';
                // Mostra il titolo all'interno di una casella di testo per permettere all'utente un'eventuale modifica
                annuncioHTML += '<input type="text" title="Modifica il titolo" id="textTitolo" name="textTitolo" maxlength="50" value="' + annuncio.titolo + '" required>';
                annuncioHTML += '<p class="error" id="modTitoloError">* Inserisci il titolo dell\'annuncio</p>';
                annuncioHTML += '<p id="provincia">&#128205; ' + annuncio.provincia + ', ' + annuncio.regione + '</p>';
                annuncioHTML += '<img src="../immagini/' + annuncio.foto + '" id="fotoAnnuncio">';
                // Mostra la descrizione all'interno di una casella di testo per permettere all'utente un'eventuale modifica
                annuncioHTML += '<div id="modificaDescrizione"><h4>Descrizione</h4><textarea title="Modifica la descrizione" id="textDescrizione" name="textDescrizione" maxlength="255" required>' + annuncio.descrizione + '</textarea></div>';
                annuncioHTML += '<p class="error" id="modDescrizioneError">* Inserisci la descrizione dell\'annuncio</p>';
                // Mostra il prezzo all'interno di una casella di testo per permettere all'utente un'eventuale modifica
                annuncioHTML += '<h4 id="€">€</h4></div><input type="text" title="Modifica il prezzo" id="textPrezzo" name="textPrezzo" value="' + annuncio.prezzo.toString().replace(".", "") + '" required>';
                annuncioHTML += '<p class="error" id="modPrezzoError">* Inserisci il prezzo richiesto</p><p class="require" id="modPrezzoRequire">* Inserisci un prezzo valido</p>';
                annuncioHTML += '<div id="condizioni"><h4>Condizioni</h4><p>' + annuncio.condizioni + '</p></div>';
                annuncioHTML += '<h4 id="scrittaVenditore">Venditore</h4><div id="utente"><div id="venditore"><p>' + annuncio.username + '</p></div><div id="contatti"><p>&#9993; ' + annuncio.email + '</p><p>&#9742; ' + annuncio.telefono + '</p></div></div>';
                annuncioHTML += '<button onclick="modificaAnnuncio()" id="confirmButton">Conferma Modifiche</button>';

                // Aggiungere il markup HTML alla pagina
                dettagliAnnuncio.innerHTML = annuncioHTML;
            }
        }
    });
});

// Funzione per la modifica dell'annuncio
function modificaAnnuncio() {
    // Ottiene l'id dell'annuncio dall'URL
    var urlParams = new URLSearchParams(window.location.search);
    var idAnnuncio = urlParams.get("id");

    //Ottiene i valori dei campi titolo, descrizione e prezzo
    var titolo = document.getElementById("textTitolo").value;
    var descrizione = document.getElementById("textDescrizione").value;
    var prezzo = document.getElementById("textPrezzo").value;

    // Nasconde eventuali messaggi di errore precedenti
    modTitoloError.style.visibility = "hidden";
    modDescrizioneError.style.visibility = "hidden";
    modPrezzoError.style.visibility = "hidden";
    modPrezzoRequire.style.visibility = "hidden";

    // Cancella eventuali messaggi precedenti
    $("#message").text("");

    var isValid = true;
    
    // Verifica validità dei campi e gestisce la visualizzazione degli errori
    if (!titolo) {
        modTitoloError.style.visibility = "visible";
        isValid = false;
    } if (!descrizione) {
        modDescrizioneError.style.visibility = "visible";
        isValid = false;
    } if (!prezzo) {
        modPrezzoError.style.visibility = "visible";
        isValid = false;
    } else if (!isPriceValid(prezzo)) {
        modPrezzoRequire.style.visibility = "visible";
        isValid = false;
    }
    // Invio della richiesta AJAX per la modifica dell'annuncio se tutti i campi sono validi
    if (isValid) {
        $.ajax({
            url: "../php/api.php/modificaAnnuncio",
            type: "PUT",
            data: {
                id: idAnnuncio,
                titolo: titolo,
                descrizione: descrizione,
                prezzo: prezzo
            },
            success: function(response) {
                console.log(response);

                // Se l'annuncio viene modificato con successo, mostra un messaggio e reindirizza alla pagina dell'annuncio
                if (response == "Annuncio modificato con successo") {
                    $("#message").text(response);
                    setTimeout(function() {
                        window.location.href = "http://sellit.altervista.org/html/mioAnnuncio.html?id=" + idAnnuncio;
                    }, 1000);
                }
            }
        });
    }
}

// Listener per la pressione del tasto Invio per confermare le modifiche dell'annuncio
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        modificaAnnuncio();
    }
});

// Carica l'header e scatena l'evento DOMContentLoaded
$(function() {
    $("#headerContainer").load("header.html", function() {
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });
});