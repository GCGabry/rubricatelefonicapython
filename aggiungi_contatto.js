// creo un riferimento al bottone html per poter aprire inviare le informazioni alla rubrica su python
const bottone_invia =document.getElementById("invia");
//necessario per il funzionamento del banner a scomparsa
let timeoutId;

//aggiungo un controllo per vedere quando il bottone di invio viene premuto
bottone_invia.addEventListener('click', async ()=>{
    //creo dei riferimenti agli elementi di input che conterranno le informazioni del contatto dal salvare
    const nome=document.getElementById("nome").value;
    const cognome=document.getElementById("cognome").value;
    const telefono=document.getElementById("telefono").value;
    const email=document.getElementById("email").value;

    //creo un dizionario da passare a python che ne eseguirà i vari controlli
    const contatto = {
        nome:nome,
        cognome:cognome,
        telefono:telefono,
        email:email
    };

    //tramite pywebview richiamo un metodo python
    const valore_rtorno = await window.pywebview.api.aggiungiContatto(contatto);
    if (valore_rtorno===true) {
        window.pywebview.api.aggiorna();//metodo che aggiorna i contatti graficamente
        window.pywebview.api.chiudi();//metodo che chiude la scheda
    }
    //mostro graficamente eventuali errori
    else {
        const raccolta = document.getElementById("raccolta");
        raccolta.innerHTML = "";

        valore_rtorno.forEach(e => {
            const errore = document.createElement('div');
            errore.classList.add('testo');
            errore.textContent=e;
            raccolta.appendChild(errore);
        });
        const errori = document.getElementById("errori");
        errori.classList.remove("mostra");
        void errori.offsetWidth;
        errori.classList.add("mostra");

        //banner a scomparsa
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            errori.classList.remove("mostra");
        }, 3000);
    }
});