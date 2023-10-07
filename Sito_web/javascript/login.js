// Funzione per reindirizzare alla pagina di registrazione
function reindirizza() {
    window.location.href = "../html/registrazione.html"
}

// Funzione per gestire il login
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Nasconde eventuali messaggi di errore precedenti
    emailError.style.visibility = "hidden";
    passwordError.style.visibility = "hidden";

    // Cancella eventuali messaggi precedenti
    $("#message").text("");

    var isValid = true;

    // Verifica se l'email è stata inserita
    if (!email) {
        emailError.style.visibility = "visible";
        isValid = false;
    }
    // Verifica se la password è stata inserita
    if (!password) {
        passwordError.style.visibility = "visible";
        isValid = false;
    }
    // Invio della richiesta AJAX per il login se tutti i campi sono validi
    if (isValid) {
        $.ajax({
            url: "../php/api.php/login",
            type: "POST",
            data: {
                email: email,
                password: password
            },
            success: function(response) {
                var responseData = JSON.parse(response);
                var status = responseData.status;
                var username = responseData.username;

                console.log(status);
                $("#message").text(status);

                // Se il login è stato effettuato con successo, salva l'username nell'archivio locale e reindirizza alla pagina index
                if (status == 'Login effettuato') {
                    localStorage.setItem("username", username);
                    window.location.href = "../html/index.html";
                }
            }
        });
    }
}

// Listener per la pressione del tasto Invio per effettuare il login
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        login();
    }
});