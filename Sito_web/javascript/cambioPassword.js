// Funzione per verificare la validità della password
function isPasswordValid(password) {
    // Il campo password deve avere una lunghezza compresa tra gli 8 e i 16 caratteri
    var regex = /^.{8,16}$/;
    return regex.test(password);
}

// Funzione per il cambio della password
function cambioPassword() {
    // Ottiene l'username memorizzato nel localStorage
    var username = localStorage.getItem("username");
    // Ottiene i valori dei campi password, nuovaPassword e confermaPassword
    var password = document.getElementById("password").value;
    var nuovaPassword = document.getElementById("nuovaPassword").value;
    var confermaPassword = document.getElementById("confermaPassword").value;

    // Nasconde eventuali messaggi di errore precedenti
    passwordAttualeError.style.visibility = "hidden";
    nuovaPasswordError.style.visibility = "hidden";
    nuovaPasswordRequire.style.visibility = "hidden";
    confermaPasswordError.style.visibility = "hidden";

    // Cancella eventuali messaggi precedenti
    $("#message").text("");

    var isValid = true;

    // Verifica validità dei campi e gestisce la visualizzazione degli errori
    if (!password) {
        passwordAttualeError.style.visibility = "visible";
        isValid = false;
    } if (!nuovaPassword) {
        nuovaPasswordError.style.visibility = "visible";
        isValid = false;
    } else if (!isPasswordValid(nuovaPassword)) {
        nuovaPasswordRequire.style.visibility = "visible";
        isValid = false;
    } if (!confermaPassword) {
        confermaPasswordError.style.visibility = "visible";
        isValid = false;
    } else if (nuovaPassword != confermaPassword) {
        isValid = false;
    }
    // Invio della richiesta AJAX per il cambio della password se tutti i campi sono validi
    if (isValid) {
        $.ajax({
            url: "../php/api.php/cambioPassword",
            type: "PUT",
            data: {
                username: username,
                password: password,
                nuovaPassword: nuovaPassword,
            },
            success: function(response) {
                $("#message").text(response);

                // Se la password viene cambiata correttamente, reindirizza alla pagina di accesso dopo 1 secondo
                if (response == "Password cambiata correttamente") {
                    setTimeout(function() {
                        window.location.href = "../html/index.html";
                    }, 1000);
                }
            }
        });
    }
}

// Listener per il confronto delle password durante la digitazione
document.addEventListener('keyup', ()=>{
    if (confermaPassword.value != nuovaPassword.value) {
        confrontoPassword.style.visibility = 'visible';
    } else {
        confrontoPassword.style.visibility = 'hidden';
    }
})

// Listener per la pressione del tasto Invio per confermare il cambio della password
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        cambioPassword();
    }
});

// Carica l'header e scatena l'evento DOMContentLoaded
$(function() {
    $("#headerContainer").load("header.html", function() {
        document.dispatchEvent(new Event("DOMContentLoaded"));
    });
});