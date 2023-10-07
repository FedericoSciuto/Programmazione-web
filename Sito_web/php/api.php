<?php

// Configurazione di accesso al database
$servername = "localhost";
$user = "root";
$password = "";
$dbname = "my_sellit";

// Connessione al database
$conn = new mysqli($servername, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Ottenere il metodo della richiesta HTTP e l'endpoint
$method = $_SERVER['REQUEST_METHOD'];
$requestSegments = explode('/', $_SERVER['REQUEST_URI']);
$endpoint = end($requestSegments);

switch($method) {
    // Gestione delle richieste GET
    case 'GET':
        if ($endpoint == "regioni") {
            // Query per ottenere le regioni
            $sql = "
                SELECT Regione
                FROM luoghi
                GROUP BY Regione
                ORDER BY Regione
            ";
            
            $result = $conn->query($sql);
            
            $options .= '<option value=""></option>';
            
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    // Generazione delle opzioni per il menu a tendina
                    $options .= '<option value="' . $row['Regione'] . '">' . $row['Regione'] . '</option>';
                }
            }

            echo $options;

        } else if ($endpoint == "luogo") {
            // Query per ottenere i luoghi (province)
            $sql = "
                SELECT Provincia
                FROM luoghi
                ORDER BY Provincia
            ";
            
            $result = $conn->query($sql);
            
            $options .= '<option value="all">Tutta Italia &#128205;</option>';
            
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    // Generazione delle opzioni per il menu a tendina
                    $options .= '<option value="' . $row['Provincia'] . '">' . $row['Provincia'] . ' &#128205;</option>';
                }
            }

            echo $options;

        } else if ($endpoint == "mieiAnnunci") {
            // Recupera gli annunci dell'utente corrente
            session_start();
            $username = $_SESSION['session_user'];

            $sql = "
                SELECT *
                FROM annunci
                JOIN utenti ON annunci.Username = utenti.Username
                JOIN luoghi ON utenti.Provincia = luoghi.Provincia
                WHERE annunci.Username = '$username'
                ORDER BY annunci.Data_inserimento DESC
            ";

            $result = $conn->query($sql);

            if (!$result) {
                echo json_encode(array('error' => 'Errore durante l\'esecuzione della query: ' . $conn->error));
            } else {
                // Creazione di un array con i dettagli degli annunci
                $annunci = array();
                while ($row = $result->fetch_assoc()) {
                    if ($row['Foto']) {
                        $foto = $row['Foto'];
                    } else {
                        $foto = "noPhoto.jpg";
                    }
                    $prezzo = number_format($row['Prezzo'], 0, ',', '.');
                    $annunci[] = array(
                        'titolo' => $row['Titolo'],
                        'prezzo' => $prezzo,
                        'foto' => $foto,
                        'data_ins' => $row['Data_inserimento'],
                        'provincia' => $row['Provincia'],
                        'regione' => $row['Regione'],
                        'idAnnuncio' => $row['Id']
                    );
                }
                echo json_encode($annunci);
            }
        } else if ($endpoint == "controlloSessione") {
            session_start();

            if (isset($_SESSION['session_id'])) {
                $username = $_SESSION['session_user'];
                echo $username;
            } else {
                echo "";
            }
        }

        break;

    case 'PUT':
        if ($endpoint == "recupero") {
            // Parsing dei dati tramite PUT
            parse_str(file_get_contents("php://input"), $data);
            $email = $data['email'];
            $password = $data['password'];
            
            // Query per verificare se l'email esiste nel database
            $sql = "
                SELECT *
                FROM utenti
                WHERE Email = '$email'
            ";

            $result = $conn->query($sql);

            if (!$result) {
                echo "Errore durante l'esecuzione della query: " . $conn->error;
            } else {
                $row = $result->fetch_assoc();

                if (!$row) {
                    echo "L'email inserita non è associata a nessun account";
                } else {
                    $username = $row['Username'];

                    // Invia l'email con la nuova password
                    $to = $email;
                    $subject = "Reimposta password";
                    $txt = "Ciao $username, la tua nuova password e': $password \n\nPuoi cambiarla quando vuoi andando nella sezione 'Profilo' --> 'Cambia password'.";
                    $headers = "From: sellit@altervista.org" . "\r\n" .
                    "CC:";
                    mail($to,$subject,$txt,$headers);

                    // Hash della password
                    $password_hash = password_hash($password, PASSWORD_BCRYPT);

                    // Aggiorna la password dell'utente nel database
                    $sql = "
                        UPDATE utenti
                        SET Password = '$password_hash'
                        WHERE Username = '$username'
                    ";

                    $result = $conn->query($sql);

                    if (!$result) {
                        echo "Errore durante l'esecuzione della query: " . $conn->error;
                    } else {
                        echo "Email inviata con successo";
                    }
                }
            }
        } else if ($endpoint == "cambioPassword") {
            // Parsing dei dati tramite PUT
            parse_str(file_get_contents("php://input"), $data);
            $username = $data['username'];
            $password = $data['password'];
            $nuovaPassword = $data['nuovaPassword'];

            // Query per ottenere la password corrente dell'utente
            $sql = "
                SELECT Password
                FROM utenti
                WHERE Username = '$username'
            ";

            $result = $conn->query($sql);

            if (!$result) {
                echo "Errore durante l'esecuzione della query: " . $conn->error;
            } else {
                $row = $result->fetch_assoc();

                // Verifica che la password presa in input corrisponda con quella presente nel database
                if (password_verify($password, $row['Password']) === false) {
                    echo "Password errata";
                } else {
                    // Hash della password
                    $password_hash = password_hash($nuovaPassword, PASSWORD_BCRYPT);

                    // Aggiorna la password dell'utente nel database
                    $sql = "
                        UPDATE utenti
                        SET Password = '$password_hash'
                        WHERE Username = '$username'
                    ";

                    $result = $conn->query($sql);
                    
                    if (!$result) {
                        echo "Errore durante l'esecuzione della query: " . $conn->error;
                    } else {
                        echo "Password cambiata correttamente";

                        // Ottiene l'email dell'utente
                        $sql = "
                            SELECT Email
                            FROM utenti
                            WHERE Username = '$username'
                        ";

                        $result = $conn->query($sql);
                        
                        if (!$result) {
                            echo "Errore durante l'esecuzione della query: " . $conn->error;
                        } else {
                            $row = $result->fetch_assoc();

                            $email = $row['Email'];

                            // Invia un'email di notifica per il cambio password
                            $to = $email;
                            $subject = "Cambio password";
                            $txt = "Ciao $username, la tua password e' stata cambiata.";
                            $headers = "From: sellit@altervista.org" . "\r\n" .
                            "CC:";
                            mail($to,$subject,$txt,$headers);
                        }
                    }
                }
            }
        } else if ($endpoint == "modificaAnnuncio") {
            // Parsing dei dati tramite PUT
            parse_str(file_get_contents("php://input"), $data);
            $idAnnuncio = $data['id'];
            // Si prendono i valori di titolo e descrizione inseriti dall'utente utilizzando mysqli_real_escape_string() per "pulire" le stringhe dai caratteri che potrebbero causare problemi di sintassi a SQL
            $titolo = mysqli_real_escape_string($conn, $data['titolo']);
            $descrizione = mysqli_real_escape_string($conn, $data['descrizione']);
            $prezzo = $data['prezzo'];

            // Aggiorna l'annuncio nel database
            $sql = "
                UPDATE annunci
                SET Titolo = '$titolo', Descrizione = '$descrizione', Prezzo = '$prezzo'
                WHERE Id = '$idAnnuncio'
            ";

            $result = $conn->query($sql);
            
            if (!$result) {
                echo "Errore durante l'esecuzione della query: " . $conn->error;
            } else {
                echo "Annuncio modificato con successo";
            }
        }

        break;
        
    case 'POST':
        if ($endpoint == "registrazione") {
            $username = $_POST['username'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $telefono = $_POST['telefono'];
            $provincia = $_POST['provincia'];
            $data_reg = date('d/m/Y, H:i', time());

            // Verifica se il nome utente è già in uso
            $sql = "
                SELECT Username
                FROM utenti
                WHERE Username = '$username'
            ";

            $result = $conn->query($sql);

            if (!$result) {
                echo "Errore durante l'esecuzione della query: " . $conn->error;
            } else {
                $row = $result->fetch_assoc();

                if ($row) {
                    echo "Nome utente già in uso";
                } else {
                    // Verifica se l'email è già collegata ad un account
                    $sql = "
                        SELECT Email
                        FROM utenti
                        WHERE Email = '$email'
                    ";
                    
                    $result = $conn->query($sql);

                    if (!$result) {
                        echo "Errore durante l'esecuzione della query: " . $conn->error;
                    } else {
                        $row = $result->fetch_assoc();

                        if ($row) {
                            echo "L'email inserita è già collegata ad un account";
                        } else {
                            // Hash della password
                            $password_hash = password_hash($password, PASSWORD_BCRYPT);
                            
                            // Inserimento dei dati dell'utente nel database
                            $sql = "
                                INSERT INTO utenti 
                                VALUES ('$username', '$email', '$password_hash', '$telefono', '$provincia', '$data_reg')
                            ";
                            
                            if ($conn->query($sql) === TRUE) {
                                echo "Registrazione avvenuta con successo!";

                                // Invio di un'email di benvenuto
                                $to = $email;
                                $subject = "Registrazione";
                                $txt = "Ciao $username, siamo lieti di darti il benvenuto nel nostro sito!";
                                $headers = "From: sellit@altervista.org" . "\r\n" .
                                "CC:";
                                mail($to,$subject,$txt,$headers);
                            } else {
                                echo "Errore durante la registrazione: " . $conn->error;
                            }
                        }
                    }
                }
            }
        } else if ($endpoint == "login") {
            session_start();
            $email = $_POST['email'];
            $password = $_POST['password'];

            // Verifica dell'email di accesso dell'utente
            $sql = "
                SELECT *
                FROM utenti
                WHERE Email = '$email'
            ";

            $result = $conn->query($sql);

            if (!$result) {
                $response = array('status' => "Errore durante l'esecuzione della query: " . $conn->error);
            } else {
                $row = $result->fetch_assoc();

                if (!$row) {
                    $response = array('status' => 'L\'email inserita non è collegata a un account');
                } else {
                    // Verifica della password
                    if (password_verify($password, $row['Password']) === false) {
                        $response = array('status' => 'La password inserita non è corretta');
                    } else {
                        // Generazione di una nuova sessione utente
                        session_regenerate_id();
                        $_SESSION['session_id'] = session_id();
                        $_SESSION['session_user'] = $row['Username'];

                        $response = array('status' => 'Login effettuato', 'username' => $row['Username']);
                    }
                }
            }
            echo json_encode($response);

        } else if ($endpoint == "province") {
            $regione = $_POST['regione'];
            
            // Recupero delle province in base alla regione selezionata
            $sql = "
                SELECT Provincia
                FROM luoghi
                WHERE Regione = '$regione'
                ORDER BY Provincia
            ";
            
            $result = $conn->query($sql);
        
            $options .= '<option value=""></option>';

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $options .= '<option value="' . $row['Provincia'] . '">' . $row['Provincia'] . '</option>';
                }
            }

            echo $options;
        } else if ($endpoint == "nuovoAnnuncio") {
            session_start();
            $categoria = $_POST['categoria'];
            $titolo = mysqli_real_escape_string($conn, $_POST['titolo']);
            $descrizione = mysqli_real_escape_string($conn, $_POST['descrizione']);
            $condizioni = $_POST['condizioni'];
            $prezzo = $_POST['prezzo'];
            $data_ins = date('d/m/Y, H:i', time());
            $username = $_SESSION['session_user'];

            $foto = null;
            $newImageName = "";
            $targetPath = "";

            if (!empty($_FILES['foto']['name']) && is_uploaded_file($_FILES['foto']['tmp_name'])) {
                $foto = $_FILES['foto'];
                $imageExtension = pathinfo($foto['name'], PATHINFO_EXTENSION);
                $newImageName = uniqid() . '.' . $imageExtension;
                $uploadDirectory = '../immagini/';
                
                if (!is_dir($uploadDirectory)) {
                    mkdir($uploadDirectory);
                }
                
                $targetPath = $uploadDirectory . $newImageName;
                move_uploaded_file($foto['tmp_name'], $targetPath);
            }
            
            // Inserimento di un nuovo annuncio nel database
            $sql = "
                INSERT INTO annunci
                VALUES (NULL, '$categoria', '$titolo', '$descrizione', '$condizioni', '$prezzo', '$newImageName', '$data_ins', '$username')
            ";
            
            if ($conn->query($sql) === TRUE) {
                echo "Annuncio inserito con successo";
            } else {
                echo "Errore durante l'inserimento dell'annuncio: " . $conn->error;
            }
        } else if ($endpoint == "caricaAnnunci") {
            $category = $_POST['category'];
            $title = $_POST['title'];
            $luogo = $_POST['luogo'];
            $ordine = $_POST['ordine'];

            // Caricamento degli annunci in base ai filtri selezionati
            $sql = "
                SELECT *
                FROM annunci
                JOIN utenti ON annunci.Username = utenti.Username
                JOIN luoghi ON utenti.Provincia = luoghi.Provincia
            ";

            if ($category) {
                if ($category == "Motori") {
                    $sql .= "WHERE annunci.Categoria IN ('Automobili', 'Moto', 'Accessori auto', 'Accessori moto')";
                } else if ($category == "Elettronica") {
                    $sql .= "WHERE annunci.Categoria IN ('Informatica', 'Audio/Video', 'Telefonia')";
                } else if ($category == "Oggetti-per-la-casa") {
                    $sql .= "WHERE annunci.Categoria IN ('Elettrodomestici', 'Abbigliamento')";
                } else if ($category == "Sport-e-hobby") {
                    $sql .= "WHERE annunci.Categoria IN ('Musica', 'Film', 'Libri', 'Sport')";
                } else {
                    $sql .= "WHERE annunci.Categoria = '$category'";
                }
                if ($luogo) {
                    if ($luogo != "all") {
                        $sql .= "AND luoghi.Provincia = '$luogo'";
                    }
                }
            } else if ($luogo) {
                if ($luogo != "all") {
                    $sql .= "WHERE luoghi.Provincia = '$luogo'";
                }
            }

            if ($title) {
                $sql .= "AND annunci.Titolo LIKE '%$title%'";
            }

            if (!$ordine || $ordine == "recente") {
                $sql .= " ORDER BY annunci.Data_inserimento DESC";
            } else if ($ordine == "meno-recente") {
                $sql .= " ORDER BY annunci.Data_inserimento ASC";
            } else if ($ordine == "meno-caro") {
                $sql .= " ORDER BY annunci.Prezzo ASC";
            } else {
                $sql .= " ORDER BY annunci.Prezzo DESC";
            }

            $result = $conn->query($sql);

            if (!$result) {
                echo json_encode(array('error' => 'Errore durante l\'esecuzione della query: ' . $conn->error));
            } else {
                $annunci = array();
                while ($row = $result->fetch_assoc()) {
                    if ($row['Foto']) {
                        $foto = $row['Foto'];
                    } else {
                        $foto = "noPhoto.jpg";
                    }
                    $prezzo = number_format($row['Prezzo'], 0, ',', '.');
                    $annunci[] = array(
                        'idAnnuncio' => $row['Id'],
                        'titolo' => $row['Titolo'],
                        'prezzo' => $prezzo,
                        'foto' => $foto,
                        'data_ins' => $row['Data_inserimento'],
                        'provincia' => $row['Provincia'],
                        'regione' => $row['Regione']
                    );
                }
                echo json_encode($annunci);
            }
        } else if ($endpoint == "visualizzaAnnuncio") {
            $idAnnuncio = $_POST['id'];

            // Recupero di un annuncio specifico dal database
            $sql = "
                SELECT *
                FROM annunci
                JOIN utenti ON annunci.Username = utenti.Username
                JOIN luoghi ON utenti.Provincia = luoghi.Provincia
                WHERE annunci.Id = '$idAnnuncio'
            ";

            $result = $conn->query($sql);

            if (!$result) {
                echo json_encode(array('error' => 'Errore durante l\'esecuzione della query: ' . $conn->error));
            } else {
                $row = $result->fetch_assoc();
                if ($row) {
                    if ($row['Foto']) {
                        $foto = $row['Foto'];
                    } else {
                        $foto = "noPhoto.jpg";
                    }
                    $prezzo = number_format($row['Prezzo'], 0, ',', '.');
                    $annuncio = array(
                        'categoria' => $row['Categoria'],
                        'data_ins' => $row['Data_inserimento'],
                        'titolo' => $row['Titolo'],
                        'provincia' => $row['Provincia'],
                        'regione' => $row['Regione'],
                        'foto' => $foto,
                        'prezzo' => $prezzo,
                        'username' => $row['Username'],
                        'condizioni' => $row['Condizioni'],
                        'descrizione' => $row['Descrizione'],
                        'email' => $row['Email'],
                        'telefono' => $row['Telefono']
                    );
                    echo json_encode($annuncio);
                } else {
                    echo json_encode(null);
                }
            }
        }

        break;

    case 'DELETE':
        if ($endpoint == "logout") {
            // Logout dell'utente
            session_start();
            if (($_SESSION['session_id'])) {
                unset($_SESSION['session_id']);
            }
        } else if ($endpoint == "eliminaAccount") {
            // Parsing dei dati tramite DELETE
            parse_str(file_get_contents("php://input"), $data);
            $username = $data['username'];
            $password = $data['password'];

            // Verifica delle credenziali dell'utente
            $sql = "
                SELECT *
                FROM utenti
                WHERE Username = '$username'
            ";

            $result = $conn->query($sql);

            if (!$result) {
                echo "Errore durante l'esecuzione della query: " . $conn->error;
            } else {
                $row = $result->fetch_assoc();

                // Verifica della password fornita
                if(password_verify($password, $row['Password']) === false) {
                    echo "Password errata";
                } else {
                    $email = $row['Email'];
                    
                    // Eliminazione dell'account dal database
                    $sql = "
                        DELETE 
                        FROM utenti
                        WHERE Username = '$username'
                    ";

                    $result = $conn->query($sql);

                    if (!$result) {
                        echo "Errore durante l'esecuzione della query: " . $conn->error;
                    } else {
                        // Invio all'utente di un'email di avvenuta eliminazione
                        $to = $email;
                        $subject = "Eliminazione account";
                        $txt = "Ciao $username, ti confermiamo che il tuo account e' stato eliminato.";
                        $headers = "From: sellit@altervista.org" . "\r\n" .
                        "CC:";
                        mail($to,$subject,$txt,$headers);

                        echo "Account eliminato";
                    }
                }
            }
        } else if ($endpoint == "eliminaAnnuncio") {
            // Parsing dei dati tramite DELETE
            parse_str(file_get_contents("php://input"), $data);
            $idAnnuncio = $data['id'];

            // Eliminazione dell'annuncio dal database
            $sql = "
                DELETE
                FROM annunci
                WHERE Id = '$idAnnuncio'
            ";

            $result = $conn->query($sql);
            
            if (!$result) {
                echo "Errore durante l'esecuzione della query: " . $conn->error;
            } else {
                echo "Annuncio eliminato con successo";
            }
        }

        break;
}

// Chiusura della connessione col database
$conn->close();

?>