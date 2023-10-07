// Funzione per effettuare il logout
function logout() {
    $.ajax({
        url: "../php/api.php/logout",
        type: "DELETE",
        success: function(response) {
            // Rimuove il valore di "username" dal localStorage
            localStorage.removeItem("username");
            // Reindirizza alla pagina di login
            window.location.href = "../html/login.html";
        }
    });
}

// Listener per l'evento di caricamento del contenuto
document.addEventListener("DOMContentLoaded", function() {
    var userLoggedElement = document.getElementById("userLogged");
    
    // Ottiene il parametro "title" dall'URL
    var urlParams = new URLSearchParams(window.location.search);
    var title = urlParams.get("title");
    
    // Se il parametro "title" è presente, imposta il valore del campo di ricerca uguale al suo contenuto
    if (title) {
        document.getElementById("searchTitle").value = title;
    }
    
    // Effettua una richiesta AJAX per controllare se la sessione dell'utente è impostata o meno
    $.ajax({
        url: "../php/api.php/controlloSessione",
        type: "GET",
        success: function(response) {
            if (response !== "") {
                // Se la sessione è impostata, visualizza il nome utente in userLogged
                userLoggedElement.textContent = response;
            } else {
                // Se la sessione non è impostata, mostra un alert e reindirizza alla pagina di login
                window.location.href = "../html/login.html";
                alert("Effettua il login per accedere a questa pagina");
            }
        },
    });
});


// Listener per il click sul logo interattivo che reindirizza alla pagina index
document.getElementById("logoInterattivo").addEventListener("click", function() {
    window.location.href = "index.html";
});

// Listener per l'evento keydown
document.addEventListener("keydown", function(event) {
    // Se viene prevuto il tasto invio mentre si sta usando il campo di ricerca, fa partire la ricerca del titolo
    if (event.keyCode === 13) {
        var title = document.getElementById("searchTitle");
        if (document.activeElement === title) {
            event.preventDefault();
            searchTitle();
        }
    }
});


// Funzione per effettuare la ricerca in base al titolo
function searchTitle() {
    var title = document.getElementById("searchTitle").value;
    var category = null;
    var luogo = null;
    var ordine = null;

    // Ottiene i parametri dall'URL
    var urlParams = new URLSearchParams(window.location.search);
    category = urlParams.get("category");
    luogo = urlParams.get("from");
    ordine = urlParams.get("order");
    
    var url = new URL("http://sellit.altervista.org/html/index.html");
    
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

    window.location.href = url.toString();
}


// Funzione per mostrare un menù a tendina
function showDropdown(dropdown) {
    document.getElementById(dropdown).style.display = "block";
}

// Funzione per nascondere un menù a tendina
function hideDropdown(dropdown) {
    document.getElementById(dropdown).style.display = "none";
}

// Listener per il click sull'elemento "userLogged"
document.getElementById("userLogged").addEventListener("click", function() {
    var dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu.style.display === "block") {
        hideDropdown("dropdownMenu");
    } else {
        showDropdown("dropdownMenu");
    }
});


// Listener per il il passaggio del mouse sugli elementi "cat_Motori" e "dropdownMotori"
document.getElementById("cat_Motori").addEventListener("mouseover", function() {
    showDropdown("dropdownMotori");
});
document.getElementById("cat_Motori").addEventListener("mouseout", function() {
    hideDropdown("dropdownMotori");
});
document.getElementById("dropdownMotori").addEventListener("mouseover", function() {
    showDropdown("dropdownMotori");
});
document.getElementById("dropdownMotori").addEventListener("mouseout", function() {
    hideDropdown("dropdownMotori");
});

// Listener per il il passaggio del mouse sugli elementi "cat_Elettronica" e "dropdownElettronica"
document.getElementById("cat_Elettronica").addEventListener("mouseover", function() {
    showDropdown("dropdownElettronica");
});
document.getElementById("cat_Elettronica").addEventListener("mouseout", function() {
    hideDropdown("dropdownElettronica");
});
document.getElementById("dropdownElettronica").addEventListener("mouseover", function() {
    showDropdown("dropdownElettronica");
});
document.getElementById("dropdownElettronica").addEventListener("mouseout", function() {
    hideDropdown("dropdownElettronica");
});

// Listener per il il passaggio del mouse sugli elementi "cat_OggettiCasa" e "dropdownOggettiCasa"
document.getElementById("cat_OggettiCasa").addEventListener("mouseover", function() {
    showDropdown("dropdownOggettiCasa");
});
document.getElementById("cat_OggettiCasa").addEventListener("mouseout", function() {
    hideDropdown("dropdownOggettiCasa");
});
document.getElementById("dropdownOggettiCasa").addEventListener("mouseover", function() {
    showDropdown("dropdownOggettiCasa");
});
document.getElementById("dropdownOggettiCasa").addEventListener("mouseout", function() {
    hideDropdown("dropdownOggettiCasa");
});

// Listener per il il passaggio del mouse sugli elementi "cat_SportHobby" e "dropdownSportHobby"
document.getElementById("cat_SportHobby").addEventListener("mouseover", function() {
    showDropdown("dropdownSportHobby");
});
document.getElementById("cat_SportHobby").addEventListener("mouseout", function() {
    hideDropdown("dropdownSportHobby");
});
document.getElementById("dropdownSportHobby").addEventListener("mouseover", function() {
    showDropdown("dropdownSportHobby");
});
document.getElementById("dropdownSportHobby").addEventListener("mouseout", function() {
    hideDropdown("dropdownSportHobby");
});

// Funzione per cambiare la categoria
function changeCategory(category) {
    var luogo = null;
    var title = null;
    var ordine = null;

    // Ottiene i parametri dall'URL
    var urlParams = new URLSearchParams(window.location.search);
    luogo = urlParams.get("from");
    title = urlParams.get("title");
    ordine = urlParams.get("order");
    
    var url = new URL("http://sellit.altervista.org/html/index.html");
    
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

    window.location.href = url.toString();
}

// Listener per il clic sui vari elementi per impostare le categorie
document.getElementById("cat_Motori").addEventListener("click", function() {
    changeCategory("Motori");
});
document.getElementById("Automobili").addEventListener("click", function() {
    changeCategory("Automobili");
});
document.getElementById("Moto").addEventListener("click", function() {
    changeCategory("Moto");
});
document.getElementById("Accessori auto").addEventListener("click", function() {
    changeCategory("Accessori-auto");
});
document.getElementById("Accessori moto").addEventListener("click", function() {
    changeCategory("Accessori-moto");
});

document.getElementById("cat_Elettronica").addEventListener("click", function() {
    changeCategory("Elettronica");
});
document.getElementById("Informatica").addEventListener("click", function() {
    changeCategory("Informatica");
});
document.getElementById("Audio/Video").addEventListener("click", function() {
    changeCategory("Audio/Video");
});
document.getElementById("Telefonia").addEventListener("click", function() {
    changeCategory("Telefonia");
});

document.getElementById("cat_OggettiCasa").addEventListener("click", function() {
    changeCategory("Oggetti-per-la-casa");
});
document.getElementById("Elettrodomestici").addEventListener("click", function() {
    changeCategory("Elettrodomestici");
});
document.getElementById("Abbigliamento").addEventListener("click", function() {
    changeCategory("Abbigliamento");
});

document.getElementById("cat_SportHobby").addEventListener("click", function() {
    changeCategory("Sport-e-hobby");
});
document.getElementById("Musica").addEventListener("click", function() {
    changeCategory("Musica");
});
document.getElementById("Film").addEventListener("click", function() {
    changeCategory("Film");
});
document.getElementById("Libri").addEventListener("click", function() {
    changeCategory("Libri");
});
document.getElementById("Sport").addEventListener("click", function() {
    changeCategory("Sport");
});

document.getElementById("cat_Immobili").addEventListener("click", function() {
    changeCategory("Immobili");
});