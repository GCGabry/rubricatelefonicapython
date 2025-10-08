#Richiesta:
#Creazione di una rubrica telefonica: Gli studenti dovranno progettare e implementare un programma Python
#per gestire una semplice rubrica telefonica. Il programma dovrebbe consentire di: * Aggiungere nuovi
#contatti (nome, numero di telefono, indirizzo email). * Visualizzare tutti i contatti. * Cercare un contatto
#per nome. * Modificare i dettagli di un contatto esistente. * Eliminare un contatto. I dati della rubrica
#dovranno essere memorizzati in una struttura dati appropriata (ad esempio, un dizionario o una lista di
#dizionari) e salvati in un file.

#importo i file contenenti le classi API e la funzione per ripristinare i contatti
from funzioni.ripristinaContatti import ripristinaContatti
from API import Api,Api_form

#importo le librerie necessarie per l'interfaccia grafica (pywebview)
import webview

rubrica=[] #creo la rubrica come lista di contatti(dizionari)

ripristinaContatti(rubrica) #ripristino all'avvio i contatti salvati in locale

api = Api(rubrica) #creo una istanza della api principale
api.crea_finestra_principale()
webview.start(debug=False) #creoavvio la GUI 