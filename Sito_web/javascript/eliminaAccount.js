// Funzione per effettuare il logout
function logout() {
    $.ajax({
        url: "../php/api.php/logout",
        type: "DELETE",
        success: function(response) {
            // Rimuove il valore di "username" dal localStorage
            localStorage.removeItem("username");
            // Reindirizza alla pagina di login dopo 1 secondo
            setTimeout(function() {
                window.location.href = "../html/login.html";
            }, 1000);
        }
    });
}

// Funzione per l'eliminazione dell'account
function eliminaAccount() {
    // Ottiene l'username memorizzato nel localStorage
    var username = localStorage.getItem("username");
    // Ottiene il valori del campo password
    var password = document.getElementById("password").value;

    // Nasconde l'eventuale messaggio di errore precedente
    passwordError.style.visibility = "hidden";

    // Cancella eventuali messaggi precedenti
    $("#message").text("");

    if (!password) {
        passwordError.style.visibility = "visible";
    } else {
        // Invio della richiesta AJAX per l'eliminazione dell'account
        $.ajax({
            url: "../php/api.php/eliminaAccount",
            type: "DELETE",
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                $("#message").text(response);

                // Se l'account viene eliminato correttamente esegue la funzione di logout
                if (response == "Account eliminato") {
                    logout();
                }
            }
        });
    }
}

// Listener per la pressione del tasto Invio per eliminare l'account
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        eliminaAccount();
    }
});

// Carica l'header e scatena l'evento DOMContentLoaded
$(function() {
    $("#headerContainer").load("header.html", function() {
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });
});