# wer-bin-ich
Eine kleine Webapp zum spielen von "Wer bin ich?"

## Funktionen
Server joinen
Spiel starten
Wörter verteilen
"Erraten" bestätigen
Zurück zur Lobby

## Ablauf
Alle spieler joinen der Lobby (connecten zum Server) -> Liste mit allen Spielern ist zu sehen
Einer der Spieler startet das Spiel
Alle Spieler geben suchen sich ein Wort für ein anderen Spieler aus
Wenn alle Bestätigt haben fängt das Spiel an
Jeder Spieler sieht die Wörter der anderen Spieler, aber nicht sein eigenes
Wenn man sein Wort richtig erraten hat, kann der Spieler auf "Erraten" klicken und sieht sein Wort + die Zeit die er gebraucht hat
Wenn alle fertig sind, die Wörter aller Spieler + die Zeiten
Zurück in die Lobby

## Einstellungen
Wort-vergabe festlegen


### TODO
Assign-Words abbrechen/Wort-ändern
"Erraten"-Button hinzufügen -> Zeigt das eigene Wort
Timer im Endscreen einfügen

styling:
    Settings

bugs: 
    wenn sich einer anmeldet, werden die inputs bei allen anderen gecleared
    wenn ingame, können spieler nachjoinen und alles ficken
    ingame refresh crashed game