#funzione per ripristinare nella rubrica cioò che viene salvato nel file csv
#questa funzione viene usata all'avvio
def ripristinaContatti(rubrica: list):
    with open('contatti.csv', 'r', newline='') as file:
        for line in file:
            line = line.strip()
            if not line:
                continue
            parts = line.split(';')
            if len(parts) < 4:
                continue
            contatto = {
                'nome': parts[0],
                'cognome': parts[1],
                'telefono': parts[2],
                'email': parts[3],
            }
            rubrica.append(contatto)
