# 🛒 Sellit! - Piattaforma E-commerce C2C

**Sellit!** è un'applicazione web di compravendita tra privati (Consumer-to-Consumer) che permette agli utenti di pubblicare annunci, gestire il proprio profilo e mettersi in contatto con potenziali acquirenti.

## 🎯 Funzionalità Principali
* **Gestione Utenti:** Sistema di registrazione e login sicuro con gestione delle sessioni.
* **Pubblicazione Annunci:** Creazione di inserzioni complete di titolo, descrizione, prezzo e immagini.
* **Dashboard Personale:** Area dedicata per monitorare, modificare o eliminare i propri annunci ("I miei annunci").
* **Ricerca e Filtri:** Sistema di navigazione tra le categorie per facilitare il reperimento degli oggetti.
* **Contatto Diretto:** Integrazione di recapiti (email/telefono) per concludere le trattative fuori piattaforma.

## 🛠️ Stack Tecnologico
* **Frontend:** HTML5, CSS3, JavaScript (per la validazione form e interattività).
* **Backend:** PHP (logica di business e gestione delle richieste server-side).
* **Database:** MySQL (progettazione dello schema relazionale per utenti e annunci).
* **Hosting:** Sviluppato in ambiente XAMPP e deployato su server remoto (Altervista).

## 📂 Struttura del Progetto
* `/php/`: Script per la gestione del database, login, registrazione e CRUD degli annunci.
* `/css/` & `/js/`: Asset per lo styling responsivo e la logica client-side.
* `/immagini_annunci/`: Gestione del caricamento dinamico dei file multimediali.
* `Relazione.pdf`: Documentazione tecnica completa con dettagli sull'architettura e lo schema del database.

## 🚀 Installazione e Setup
1. Clona la repository nella cartella `htdocs` di XAMPP.
2. Importa il database tramite il file SQL fornito (o segui lo schema presente nella relazione).
3. Configura i parametri di connessione nel file `connessione.php`.
4. Accedi a `localhost/Sellit/index.php` dal tuo browser.

---
*Progetto realizzato da: Federico Sciuto e Carmelo Santamaria (2023)*
