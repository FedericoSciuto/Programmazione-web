-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Giu 28, 2023 alle 15:52
-- Versione del server: 8.0.30
-- Versione PHP: 8.0.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `my_sellit`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `annunci`
--

CREATE TABLE `annunci` (
  `Id` int NOT NULL,
  `Categoria` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Titolo` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Descrizione` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Condizioni` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `Prezzo` int NOT NULL,
  `Foto` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Data_inserimento` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `Username` varchar(20) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `annunci`
--

INSERT INTO `annunci` (`Id`, `Categoria`, `Titolo`, `Descrizione`, `Condizioni`, `Prezzo`, `Foto`, `Data_inserimento`, `Username`) VALUES
(1, 'Automobili', 'Ferrari SF-23', 'Vendo riproduzione in scala 1:1 della Ferrari SF-23, non funzionante.', 'Usato - danneggiato', 20000, '6488e55045d0c.jpg', '13/06/2023, 23:53', 'F3D3'),
(2, 'Telefonia', 'iPhone 13 Pro', 'Vendo iPhone 13 Pro usato, completo di accessori.', 'Usato - ottime condizioni', 500, '649201a5792ef.jpg', '20/06/2023, 21:44', 'F3D3'),
(6, 'Sport', 'Pallone finale champions', 'Vendo pallone utilizzato nella finale di champions league di Istambul', 'Usato - buone condizioni', 125, '649aa55b9743e.jpg', '27/06/2023, 11:01', 'carmelo5'),
(7, 'Sport', 'Palla di basket', 'Vendo palla nuova di Basket', 'Nuovo', 35, '649aa6289e685.jpg', '27/06/2023, 11:04', 'carmelo5'),
(9, 'Informatica', 'MSI GL65', 'MSI Gaming GL65 Leopard 10SFSK-636IT i7-10750H Computer portatile 39,6 cm (15.6\") Full HD Intel® Core™ i7 32 GB DDR4-SDRAM 1000 GB SSD NVIDIA GeForce RTX 2070 SUPER Wi-Fi 6 (802.11ax).', 'Usato - ottime condizioni', 1150, '649ad2efdfb37.jpeg', '27/06/2023, 14:15', 'carmelo5'),
(10, 'Musica', 'Lettore vinile', 'Lettore di vinili unico nel suo genere.', 'Nuovo', 50, '649ae5c9833d4.jpg', '27/06/2023, 15:36', 'Daniela7'),
(11, 'Moto', 'Honda SH 125', 'Vendo Honda SH 125 nuovo, mai usato.', 'Nuovo', 3800, '649ae8881d06a.jpg', '27/06/2023, 15:47', 'F3D3'),
(12, 'Abbigliamento', 'Nike Air Jordan 12 Mid AJ12 Gucci Shoes 12 GS', 'Vendo scarpe Nike Air Jordan 12 edizione limitata Gucci, come nuove.', 'Usato - ottime condizioni', 1000, '649aeba81e09b.jpg', '27/06/2023, 16:01', 'Marco'),
(13, 'Elettrodomestici', 'Divano Norton angolare', 'Divano in tessuto angolare con poggiatesta reclinabili.\r\nDisponibile in varie misure, anche con relax elettrici.', 'Nuovo', 2000, '649af000e3c3d.jpg', '27/06/2023, 16:19', 'Daniela7'),
(14, 'Libri', 'Libro del Signore degli anelli', 'Libro originale del signore degli anelli, lingua inglese, usato pochissimo.', 'Usato - buone condizioni', 18, '649af1b568d26.jpg', '27/06/2023, 16:27', 'Daniela7'),
(15, 'Immobili', 'Villa lussuosa con piscina', 'Il processo TRIO - Creare la vostra proprietà personalizzata. Nel nostro processo di acquisto è possibile scegliere tra tre livelli di qualità e finitura per ciascuna delle nostre opzioni personalizzabili.', 'Nuovo', 350000, '649af236214f4.jpg', '27/06/2023, 16:29', 'Daniela7'),
(16, 'Automobili', 'Jeep Renegade', 'Jeep Renegade del 2017.', 'Usato - buone condizioni', 11500, '649af34bc36f4.jpg', '27/06/2023, 16:33', 'Marco'),
(17, 'Audio/Video', 'TV Nokia 50', 'Televisore LED Nokia 50\".', 'Usato - buone condizioni', 200, '649af76faedb6.jpg', '27/06/2023, 16:51', 'Luca');

-- --------------------------------------------------------

--
-- Struttura della tabella `luoghi`
--

CREATE TABLE `luoghi` (
  `Provincia` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `Regione` varchar(25) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `luoghi`
--

INSERT INTO `luoghi` (`Provincia`, `Regione`) VALUES
('Agrigento', 'Sicilia'),
('Alessandria', 'Piemonte'),
('Ancona', 'Marche'),
('Aosta', 'Valle d Aosta'),
('Arezzo', 'Toscana'),
('Ascoli Piceno', 'Marche'),
('Asti', 'Piemonte'),
('Avellino', 'Campania'),
('Bari', 'Puglia'),
('Barletta-Andria-Trani', 'Puglia'),
('Belluno', 'Veneto'),
('Benevento', 'Campania'),
('Bergamo', 'Lombardia'),
('Biella', 'Piemonte'),
('Bologna', 'Emilia-Romagna'),
('Bolzano', 'Trentino-Alto Adige'),
('Brescia', 'Lombardia'),
('Brindisi', 'Puglia'),
('Cagliari', 'Sardegna'),
('Caltanissetta', 'Sicilia'),
('Campobasso', 'Molise'),
('Caserta', 'Campania'),
('Catania', 'Sicilia'),
('Catanzaro', 'Calabria'),
('Chieti', 'Abruzzo'),
('Como', 'Lombardia'),
('Cosenza', 'Calabria'),
('Cremona', 'Lombardia'),
('Crotone', 'Calabria'),
('Cuneo', 'Piemonte'),
('Enna', 'Sicilia'),
('Fermo', 'Marche'),
('Ferrara', 'Emilia-Romagna'),
('Firenze', 'Toscana'),
('Foggia', 'Puglia'),
('Forlì-Cesena', 'Emilia-Romagna'),
('Frosinone', 'Lazio'),
('Genova', 'Liguria'),
('Gorizia', 'Friuli-Venezia Giulia'),
('Grosseto', 'Toscana'),
('Imperia', 'Liguria'),
('Isernia', 'Molise'),
('L\'Aquila', 'Abruzzo'),
('La Spezia', 'Liguria'),
('Latina', 'Lazio'),
('Lecce', 'Puglia'),
('Lecco', 'Lombardia'),
('Livorno', 'Toscana'),
('Lodi', 'Lombardia'),
('Lucca', 'Toscana'),
('Macerata', 'Marche'),
('Mantova', 'Lombardia'),
('Massa e Carrara', 'Toscana'),
('Matera', 'Basilicata'),
('Messina', 'Sicilia'),
('Milano', 'Lombardia'),
('Modena', 'Emilia-Romagna'),
('Monza e Brianza', 'Lombardia'),
('Napoli', 'Campania'),
('Novara', 'Piemonte'),
('Nuoro', 'Sardegna'),
('Oristano', 'Sardegna'),
('Padova', 'Veneto'),
('Palermo', 'Sicilia'),
('Parma', 'Emilia-Romagna'),
('Pavia', 'Lombardia'),
('Perugia', 'Umbria'),
('Pesaro e Urbino', 'Marche'),
('Pescara', 'Abruzzo'),
('Piacenza', 'Emilia-Romagna'),
('Pisa', 'Toscana'),
('Pistoia', 'Toscana'),
('Pordenone', 'Friuli-Venezia Giulia'),
('Potenza', 'Basilicata'),
('Prato', 'Toscana'),
('Ragusa', 'Sicilia'),
('Ravenna', 'Emilia-Romagna'),
('Reggio Calabria', 'Calabria'),
('Reggio Emilia', 'Emilia-Romagna'),
('Rieti', 'Lazio'),
('Rimini', 'Emilia-Romagna'),
('Roma', 'Lazio'),
('Rovigo', 'Veneto'),
('Salerno', 'Campania'),
('Sassari', 'Sardegna'),
('Savona', 'Liguria'),
('Siena', 'Toscana'),
('Siracusa', 'Sicilia'),
('Sondrio', 'Lombardia'),
('Sud Sardegna', 'Sardegna'),
('Taranto', 'Puglia'),
('Teramo', 'Abruzzo'),
('Terni', 'Umbria'),
('Torino', 'Piemonte'),
('Trapani', 'Sicilia'),
('Trento', 'Trentino-Alto Adige'),
('Treviso', 'Veneto'),
('Trieste', 'Friuli-Venezia Giulia'),
('Udine', 'Friuli-Venezia Giulia'),
('Varese', 'Lombardia'),
('Venezia', 'Veneto'),
('Verbano-Cusio-Ossola', 'Piemonte'),
('Vercelli', 'Piemonte'),
('Verona', 'Veneto'),
('Vibo Valentia', 'Calabria'),
('Vicenza', 'Veneto'),
('Viterbo', 'Lazio');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `Username` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `Telefono` varchar(11) COLLATE utf8mb4_general_ci NOT NULL,
  `Provincia` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `Data_registrazione` varchar(25) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`Username`, `Email`, `Password`, `Telefono`, `Provincia`, `Data_registrazione`) VALUES
('carmelo5', 'carmelosantamaria5@gmail.com', '$2y$10$i0tNIR8YC.DnggxyvomGj.DxiVFm3JUvA55L3PYueYVwlRQIsdNDW', '3479950219', 'Messina', '27/06/2023, 02:07'),
('Daniela7', 'danielapassari40@gmail.com', '$2y$10$NJ5UrYL05yEKPmVMpbnkR..oP/8nQpu.qgBbPTR82wNjnRr4ZwWQq', '3408271973', 'Catania', '27/06/2023, 10:26'),
('F3D3', 'sctfrc01h26f158e@studenti.unime.it', '$2y$10$AkY6v5sLXuue0Tr12cRIq.s7Z/akMpJQN./9LGdi8568gdkoiWHnC', '987654321', 'Messina', '13/06/2023, 23:51'),
('Luca', 'lucasciuto@gmail.com', '$2y$10$qkNZXi3aFu66rZFKjIooROsRrnD8SAIpCv9ycj.1V0aGDoOxQJp5W', '3295196360', 'Cagliari', '27/06/2023, 16:35'),
('Marco', 'marcorossi@gmail.com', '$2y$10$ig8tVUp3VHYBV4qGvG7LlePzFu6I8JSuYXXuFRpfiyzOA0M/jcJom', '3458640275', 'La Spezia', '27/06/2023, 10:30');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `annunci`
--
ALTER TABLE `annunci`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Username` (`Username`);

--
-- Indici per le tabelle `luoghi`
--
ALTER TABLE `luoghi`
  ADD PRIMARY KEY (`Provincia`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`Username`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `Provincia` (`Provincia`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `annunci`
--
ALTER TABLE `annunci`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `annunci`
--
ALTER TABLE `annunci`
  ADD CONSTRAINT `annunci_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `utenti` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `utenti`
--
ALTER TABLE `utenti`
  ADD CONSTRAINT `utenti_ibfk_1` FOREIGN KEY (`Provincia`) REFERENCES `luoghi` (`Provincia`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
