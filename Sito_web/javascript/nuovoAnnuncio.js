// Funzione per verificare la validità del prezzo
function isPriceValid(prezzo) {
    // Il prezzo può contenere solamente numeri e la cifra che può essere inserita varia da 0 a 2000000000
    var regex = /^(0|[1-9]\d{0,8}(\.\d{1,2})?|1\d{0,9}|2000000000)$/;
    return regex.test(prezzo);
}

// Funzione per verificare la validità dell'estensione della foto
function isFotoExtensionValid(foto) {
    if (foto && foto.name) {
        var allowedExtensions = ['jpg', 'jpeg', 'png'];
        var fileExtension = foto.name.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    } else {
        return true;
    }
}

// Funzione per l'inserimento di un nuovo annuncio
async function inserimento() {
    // Ottiene i valori dei campi del modulo
    var categoria = document.getElementById("categoria").value;
    var titolo = document.getElementById("titolo").value;
    var descrizione = document.getElementById("descrizione").value;
    var condizioni = document.getElementById("condizioni").value;
    var prezzo = document.getElementById("prezzo").value;
    var fotoInput = document.getElementById("foto");
    var foto = fotoInput.files[0];

    // Nasconde eventuali messaggi di errore precedenti
    categoriaError.style.visibility = "hidden";
    titoloError.style.visibility = "hidden";
    descrizioneError.style.visibility = "hidden";
    condizioniError.style.visibility = "hidden";
    prezzoError.style.visibility = "hidden";
    prezzoRequire.style.visibility = "hidden";
    fotoError.style.visibility = "hidden";

    // Cancella eventuali messaggi precedenti
    $("#message").text("");

    var isValid = true;

    // Verifica validità dei campi e gestisce la visualizzazione degli errori
    if (!categoria) {
        categoriaError.style.visibility = "visible";
        isValid = false;
    } if (!titolo) {
        titoloError.style.visibility = "visible";
        isValid = false;
    } if (!descrizione) {
        descrizioneError.style.visibility = "visible";
        isValid = false;
    } if (!condizioni) {
        condizioniError.style.visibility = "visible";
        isValid = false;
    } if (!prezzo) {
        prezzoError.style.visibility = "visible";
        isValid = false;
    } else if (!isPriceValid(prezzo)) {
        prezzoRequire.style.visibility = "visible";
        isValid = false;
    } if (!isFotoExtensionValid(foto)) {
        fotoError.style.visibility = "visible";
        isValid = false;
    }
    // Invio della richiesta AJAX per l'inserimento dell'annuncio se tutti i campi sono validi
    if (isValid) {
        var formData = new FormData();
        formData.append('categoria', categoria);
        formData.append('titolo', titolo);
        formData.append('descrizione', descrizione);
        formData.append('condizioni', condizioni);
        formData.append('prezzo', prezzo);
        formData.append('foto', foto);
        $.ajax({
            url: "../php/api.php/nuovoAnnuncio",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response) {
                $("#message").text(response);

                // Se l'annuncio viene inserito con successo, avviene il reindirizzamento alla pagina di login dopo un secondo
                if (response == "Annuncio inserito con successo") {
                    setTimeout(function() {
                        window.location.href = "../html/mieiAnnunci.html";
                    }, 1000);
                }
            }
        });
    }
}

// Funzione per visualizzare un'anteprima dell'immagine
$(document).ready(function() {
    $('#foto').change(function(evt) {
        var [file] = $('#foto')[0].files;
        if (file) {
            $('#previewImg').attr('src', URL.createObjectURL(file));
        }
    });
});

// Listener per la pressione del tasto Invio per effettuare l'inserimento dell'annuncio
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        inserimento();
    }
});

// Carica l'header e scatena l'evento DOMContentLoaded
$(function() {
    $("#headerContainer").load("header.html", function() {
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });
});