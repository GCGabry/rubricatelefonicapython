#importo una lista contenete tutti i domini validi per l'email
from reference.domini import DOMINI

#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


#Funzione per controllare e gestire l'input
# il primo parametro è la stringa su cui eseguire il controllo
# il secondo è per selezionare la tipologia di controllo:
# 's' -> stringa di caratteri
# 'n' -> stringa di numeri
# 'e' -> email
# viene passata anche la rubrica opzionalmente (serve per controllare che in rubrica non ci siano due numeri di telefono uguali)
def stringaErrata(s:str,c:str,rubrica:list=None):

    if not s: #controllo se la stringa è vuota
            return True

    if c=='s':
       
        for carattere in s: #ciclo che scorre la stringa e controlla che contenga unicamente lettere
            if carattere<'A' or (carattere>'Z' and carattere<'a') or carattere>'z':
                return True
        return False
    
    #---------------------------------------------------------------------------------------

    elif c=='n':
        
        if len(s)!=10: #controllo che il numero di telefono sia composto da 10 cifre
            return True
        
        for i in rubrica: #controllo che il numero di telefono non sia già salvato
            if s == str(i['telefono']):
                return True
        
        for carattere in s: #ciclo che scorre la stringa e controlla che contenga unicamente valori numerici
            if carattere<'0' or carattere>'9':
                return True
        return False
    
    #---------------------------------------------------------------------------------------

    elif c=='e':

        flag = True #imposto un flag a valore vero

        for i in DOMINI: #ciclo per vedere tutti i domini registrati e confrontarlo con quello inserito dall'utente
            if s.find(i)!=-1:
                flag=False #se il dominio è presente tra quelli registrati allora il flag cambia valore in falso
                break #interrompe in ciclo per accorciare il tempo di esecuzione

        if flag==True: #se il flag non ha cambiato valore allora il dominio inserito no è valido
            return True
        
        for carattere in s: #ciclo per scorrere l'email
            if carattere=='@': #impongo che ci sia il carattere '@'
                return False
        return True
    

#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

#Funzione per salvare il contatto in locale sul file .csv
def save(contatto:dict):
    formattazione = (
        contatto['nome'] + ';' + contatto['cognome'] + ';' + str(contatto['telefono']) + ';' + contatto['email'] + '\n'
    )

    with open('contatti.csv', 'a', newline='') as file:
        file.write(formattazione)


#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////