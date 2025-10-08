//creo riferimenti ai valori attuali salvati nel contatto
const nome_attuale = document.getElementById('nome_attuale');
const cognome_attuale = document.getElementById('cognome_attuale');
const email_attuale = document.getElementById('email_attuale');
//necessario per banner a scomparsa
let timeoutId;

// creo gli input editabili
const nome_input = document.getElementById('nome');
const cognome_input = document.getElementById('cognome');
const email_input = document.getElementById('email');
const form = document.getElementById('modificaForm');

window.addEventListener('pywebviewready', async () => {
    const valore_rtorno = await window.pywebview.api.saluta();
    console.log('saluta ->', valore_rtorno);

    
    const contatto = await window.pywebview.api.get_contatto_da_modificare();
    nome_attuale.textContent = contatto.nome;
    cognome_attuale.textContent = contatto.cognome;
    email_attuale.textContent = contatto.email;

    
    nome_input.value = contatto.nome;
    cognome_input.value = contatto.cognome;
    email_input.value = contatto.email;
});

// gestisco il submit del form
bottone_di_modifica=document.getElementById('invia');
bottone_di_modifica.addEventListener('click', async (e) => {    

    const updated = {
        nome: nome_input.value.trim(),
        cognome: cognome_input.value.trim(),
        email: email_input.value.trim()
    };

    
    const result = await window.pywebview.api.modificaContatto(updated);//metodo che applica le modifiche il locale e sulla rubrica temporanea
    if (result===true) {
        window.pywebview.api.aggiorna();
        window.pywebview.api.chiudi();
    }
    //mostro gli errori
    else {
        const raccolta = document.getElementById("raccolta");
        raccolta.innerHTML = "";

        result.forEach(e => {
            const errore = document.createElement('div');
            errore.classList.add('testo');
            errore.textContent=e;
            raccolta.appendChild(errore);
        });
        const errori = document.getElementById("errori");
        errori.classList.remove("mostra");
        void errori.offsetWidth;
        errori.classList.add("mostra");

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            errori.classList.remove("mostra");
        }, 3000);
    }
});
