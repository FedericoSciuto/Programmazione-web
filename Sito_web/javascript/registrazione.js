// Funzione per reindirizzare alla pagina di login
function reindirizza() {
    window.location.href = "../html/login.html"
}

// Funzione per verificare la validità dell'username
function isUsernameValid(username) {
    // Il campo username può contenere solamente lettere, numeri e underscore, inoltre la lunghezza deve essere compresa tra i 3 e i 20 caratteri
    var regex = /^[a-z\d_]{3,20}$/i;
    return regex.test(username);
}

// Funzione per verificare la validità dell'email
function isEmailValid(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return regex.test(email);
}

// Funzione per verificare la validità della password
function isPasswordValid(password) {
    // Il campo password deve avere una lunghezza compresa tra gli 8 e i 16 caratteri
    var regex = /^.{8,16}$/;
    return regex.test(password);
}

// Funzione per verificare la validità del numero di telefono
function isPhoneValid(telefono) {
    // Il campo numero di telefono può contenere solamente numeri e la lunghezza deve essere compresa tra i 9 e gli 11 caratteri
    var regex = /^\d{9,11}$/;
    return regex.test(telefono);
}

// Funzione per caricare le regioni nell'elemento "regione" tramite una richiesta AJAX
function caricaRegioni() {
    $.ajax({
        url: "../php/api.php/regioni",
        type: "GET",
        success: function(regioni) {
            var select = $("#regione");
            select.empty();
            select.html(regioni);
        }
    });
}

// Funzione per caricare le province di una regione nell'elemento "provincia" tramite una richiesta AJAX
function caricaProvince(regione) {
    $.ajax({
        url: "../php/api.php/province",
        type: "POST",
        data: {
            regione: regione
        },
        success: function(province) {
            var select = $("#provincia");
            select.empty();
            select.append(province);
        }
    });
}

// Funzione per gestire la registrazione
function registrazione() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var telefono = document.getElementById("telefono").value;
    var regione = document.getElementById("regione").value;
    var provincia = document.getElementById("provincia").value;

    // Nasconde eventuali messaggi di errore precedenti
    usernameError.style.visibility = "hidden";
    usernameRequire.style.visibility = "hidden";
    emailError.style.visibility = "hidden";
    emailRequire.style.visibility = "hidden";
    passwordError.style.visibility = "hidden";
    passwordRequire.style.visibility = "hidden";
    telefonoError.style.visibility = "hidden";
    telefonoRequire.style.visibility = "hidden";
    regioneError.style.visibility = "hidden";
    provinciaError.style.visibility = "hidden";

    // Cancella eventuali messaggi precedenti
    $("#message").text("");
    
    var isValid = true;

    // Verifica validità dei campi e gestisce la visualizzazione degli errori
    if (!username) {
        usernameError.style.visibility = "visible";
        isValid = false;
    } else if (!isUsernameValid(username)) {
        usernameRequire.style.visibility = "visible";
        isValid = false;
    } if (!email) {
        emailError.style.visibility = "visible";
        isValid = false;
    } else if (!isEmailValid(email)) {
        emailRequire.style.visibility = "visible";
        isValid = false;
    } if (!password) {
        passwordError.style.visibility = "visible";
        isValid = false;
    } else if (!isPasswordValid(password)) {
        passwordRequire.style.visibility = "visible";
        isValid = false;
    } if (!telefono) {
        telefonoError.style.visibility = "visible";
        isValid = false;
    } else if (!isPhoneValid(telefono)) {
        telefonoRequire.style.visibility = "visible";
        isValid = false;
    } if (!regione) {
        regioneError.style.visibility = "visible";
        isValid = false;
    } if (!provincia) {
        provinciaError.style.visibility = "visible";
        isValid = false;
    }
    // Invio della richiesta AJAX per la registrazione se tutti i campi sono validi
    if (isValid) {
        $.ajax({
            url: "../php/api.php/registrazione",
            type: "POST",
            data: {
                username: username,
                email: email,
                password: password,
                telefono: telefono,
                provincia: provincia
            },
            success: function(response) {
                $("#message").text(response);
                if (response == "Registrazione avvenuta con successo!") {
                    // Reindirizzamento alla pagina di login dopo un secondo
                    setTimeout(function() {
                        window.location.href = "../html/login.html";
                    }, 1000);
                }
            }
        });
    }
}

// Caricamento delle regioni all'avvio del documento
$(document).ready(function() {
    caricaRegioni();

    // Caricamento delle province al cambio di regione
    $("#regione").change(function() {
        var regione = $(this).val();
        caricaProvince(regione);
    });
})

// Listener per la pressione del tasto Invio per effettuare la registrazione
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        registrazione();
    }
});