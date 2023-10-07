// Funzione per reindirizzare alla pagina di login
function reindirizza() {
    window.location.href = "../html/login.html"
}

// Funzione per generare una password casuale
function generateRandomPassword(minLength = 8, maxLength = 16) {
    // Caratteri che vengono usati per la generazione della password
    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var password = '';
    
    var characterCount = characters.length;
    var length = getRandomInt(minLength, maxLength);
    
    // Genera una stringa di caratteri casuali fino alla lunghezza specificata
    for (var i = 0; i < length; i++) {
        var index = getRandomInt(0, characterCount - 1);
        password += characters.charAt(index);
    }
    
    return password;
}

// Funzione per ottenere un numero intero casuale compreso tra min e max (inclusi)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funzione per gestire la richiesta di recupero password
function invio() {
    var email = document.getElementById("email").value;
    var password = generateRandomPassword();

    // Nasconde l'eventuale messaggio di errore precedente
    emailError.style.visibility = "hidden";

    // Cancella eventuali messaggi precedenti
    $("#message").text("");

    // Verifica se l'email è stata inserita
    if (!email) {
        emailError.style.visibility = "visible";
    } else {
        // Invio della richiesta AJAX per il recupero della password
        $.ajax({
            url: "../php/api.php/recupero",
            type: "PUT",
            data: {
                email: email,
                password: password
            },
            success: function(response) {
                $("#message").text(response);

                // Se l'email è stata inviata con successo, mostra un alert e reindirizza alla pagina di login
                if (response == "Email inviata con successo") {
                    alert("Abbiamo inviato un email contenente la nuova password d'accesso");
                    window.location.href = "../html/login.html";
                }
            }
        });
    }
}

// Listener per la pressione del tasto Invio per effettuare il recupero
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        invio();
    }
});