//riferimento al botoone per l'aggiunta di un contatto
const bottone_add = document.getElementById('add')

// se il bottone è premuto eseguo il metodo che crea la scheda form di inserimento
bottone_add.addEventListener('click', ()=>{
   window.pywebview.api.form_aggiunta();
});

//funzione che richima il metodo per la creazione della finestra del form di modifica
document.addEventListener('click', event => {
    if (event.target.closest('.modifica')) {
        const button_mod = event.target.closest('.modifica');
        const contatto_da_modificare = button_mod.closest('.contatto');
        const numero_di_telefono = contatto_da_modificare
            .querySelector('.numero_di_telefono')
            .textContent.trim();
         window.pywebview.api.mod_aggiunta(parseInt(numero_di_telefono));
    }
});