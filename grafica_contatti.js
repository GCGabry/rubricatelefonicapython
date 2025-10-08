//creo un riferimento al div elenco (div in cui verranno aggiunti dinamicamente i contatti)
let elenco = document.getElementById("elenco")

//funzione che si occupa di caricare nel html i contatti
async function caricaContatti() {
    // metodo che ritorna la lista di contatti(dizionari)
    const contatti = await window.pywebview.api.get_contatti();
    elenco.innerHTML = ""; //svuoto l'elenco e lo ricreo ogni volta (per non avere problemi ad esempio nella ricerca)

    //per ogni contatto nella lista creo un div da appendere nell'elenco
    contatti.forEach(c => {
        const contatto = document.createElement('div');
        const testa = document.createElement('div');
        const nome = document.createElement('div');
        const info = document.createElement('div');
        const edit = document.createElement('div');
        const modifica = document.createElement('button');
        const elimina = document.createElement('button');

        testa.classList.add('testa')
        contatto.classList.add('contatto');
        nome.classList.add('nome');
        info.classList.add('info');
        edit.classList.add('edit');
        elimina.classList.add('elimina')
        modifica.classList.add('modifica')

        //tra il +39 voglio uno spazio, uso \u00A0

        nome.innerHTML = `${c.nome+' '+c.cognome}`;
        info.innerHTML = `
            <div style="display:flex; flex-direction:row;"><span><img src="images/phone-handset_icon-icons.com_48252.ico"></span> \u00A0+39\u00A0 <div class="numero_di_telefono">${c.telefono}</div></div> 
            <div style="display:flex; flex-direction:row;"><span><img src="images/email-envelope-outline-shape-with-rounded-corners_icon-icons.com_56530.ico"></span>\u00A0${c.email}</div>`;
        modifica.innerHTML = '<img src="images/edit_icon_128873.ico">';
        elimina.innerHTML = '<img src="images/bin_delete_file_garbage_recycle_remove_trash_icon_123192.ico">';

        edit.appendChild(modifica)
        edit.appendChild(elimina)
        testa.appendChild(nome);
        testa.appendChild(edit);
        contatto.appendChild(testa);
        contatto.appendChild(info);
        elenco.appendChild(contatto)
    });
}

//funzione che controlla se pywebview è stato iniettato nella pagina
window.addEventListener('pywebviewready', () => {
    caricaContatti();//richiamo alla funzione definita sopra
});

//creo un riferimento alla barra di ricerca
let barra_di_ricerca = document.getElementById("search")

//creo una funzione per la ricerca dei contatti
async function cercaContatti() {
    //metodo che ritorna una lista (senza doppioni) dei contatti che soddisfano la stringa di ricerca
    const contatti = await window.pywebview.api.cercaContatto(barra_di_ricerca.value);
    //mostro graficamente i cntatti derivanti dalla ricerca
    elenco.innerHTML = "";
    contatti.forEach(c => {
        const contatto = document.createElement('div');
        const testa = document.createElement('div');
        const nome = document.createElement('div');
        const info = document.createElement('div');
        const edit = document.createElement('div');
        const modifica = document.createElement('button');
        const elimina = document.createElement('button');

        testa.classList.add('testa')
        contatto.classList.add('contatto');
        nome.classList.add('nome');
        info.classList.add('info');
        edit.classList.add('edit');
        elimina.classList.add('elimina')
        modifica.classList.add('modifica')

        //tra il +39 voglio uno spazio, uso \u00A0

        nome.innerHTML = `${c.nome+' '+c.cognome}`;
        info.innerHTML = `
            <div style="display:flex; flex-direction:row;"><span><img src="images/phone-handset_icon-icons.com_48252.ico"></span> \u00A0+39\u00A0 <div class="numero_di_telefono">${c.telefono}</div></div> 
            <div style="display:flex; flex-direction:row;"><span><img src="images/email-envelope-outline-shape-with-rounded-corners_icon-icons.com_56530.ico"></span>\u00A0${c.email}</div>`;
        modifica.innerHTML = '<img src="images/edit_icon_128873.ico">';
        elimina.innerHTML = '<img src="images/bin_delete_file_garbage_recycle_remove_trash_icon_123192.ico">';

        edit.appendChild(modifica)
        edit.appendChild(elimina)
        testa.appendChild(nome);
        testa.appendChild(edit);
        contatto.appendChild(testa);
        contatto.appendChild(info);
        elenco.appendChild(contatto)
    });
}

//controllo se la barra di ricerca non è vuota e se contiene il testo verifico se il testo ha subito variazioni
//se questo avviene richiamo la funzione definia sopra
barra_di_ricerca.addEventListener("input", cercaContatti);