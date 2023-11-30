class Contact {
    constructor(name, tel, email){
        this.name = name
        this.tel = tel
        this.email = email
    }
    add(){
        PHONEBOOK.push(this)
    }
}

const PHONEBOOK = [];

const STORAGE_KEY = 'PHONEBOOK';

const addButton = document.querySelector('#add-btn');
const nameInput = document.querySelector('#name')
const telInput = document.querySelector('#tel')
const mailInput = document.querySelector('#mail')
const phonebookDOM = document.querySelector('#agenda')

const createContact = (e) => {
    e.preventDefault()
  
    const name = nameInput.value;
    const tel = telInput.value;
    const mail = mailInput.value;
    
    document.querySelector('form').reset()
}


function updateDOM(){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(PHONEBOOK))
    renewDOM()
    PHONEBOOK.forEach( contacto => createContacDiv(contacto) )   
}

const renewDOM = () => {
    agenda.innerHTML = '<h2>Contactos</h2>'
}

const createContacDiv = (obj) => {

    const {name, tel, email} = obj

    let newContact = document.createElement('div')
    newContact.classList.add('contacto')

    const nameNode = document.createElement('h3')
    nameNode.textContent = name;
    const telNode = document.createElement('span')
    telNode.textContent = tel;
    const mailNode = document.createElement('span')
    mailNode.textContent = email;

    const editBtn = document.createElement('button')
    editBtn.setAttribute('class', 'edit-btn')
    editBtn.textContent = 'Editar'
    const deleteBtn =document.createElement('button')
    deleteBtn.setAttribute('class', 'delete-btn')
    deleteBtn.textContent = 'Borrar'

    editBtn.addEventListener('click', editContact)
    deleteBtn.addEventListener('click', deleteContact)

    newContact.appendChild(nameNode)
    newContact.appendChild(editBtn)
    newContact.appendChild(mailNode)
    newContact.appendChild(deleteBtn)
    newContact.appendChild(telNode)

    
    agenda.appendChild(newContact)
} 

const editContact = (e) => {
    const selectedMail = e.target.nextSibling.textContent
    const {selectedContact, selectedIndex} = findUserAndIndex(selectedMail)
    const {newName, newEmail, newTel} = askNewData()
    PHONEBOOK[selectedIndex].name = newName.trim() ? newName : selectedContact.name
    PHONEBOOK[selectedIndex].email = newEmail.trim() ? newEmail : selectedContact.email
    PHONEBOOK[selectedIndex].tel = newTel.trim() ? newTel : selectedContact.tel
    updateDOM()
}





const deleteContact = (e) => {
    const selectedMail = e.target.previousSibling.textContent;
    const {selectedContact, selectedIndex} = findUserAndIndex(selectedMail)
    const confirmation = confirm(`¿Seguro que quieres borrar a ${selectedContact.name} de tus contactos? `)
    if(confirmation){
        PHONEBOOK.splice(selectedIndex, 1)
        updateDOM()
    }

}

function findUserAndIndex(mail){
    const selectedContact = PHONEBOOK.find( ( person ) => person.email === mail )
    const selectedIndex = PHONEBOOK.indexOf(selectedContact)
    return {
        selectedContact : selectedContact, 
        selectedIndex : selectedIndex
    }
}

function askNewData(){
    const newName = prompt('Nuevo nombre')
    const newEmail = prompt('Nuevo email')
    const newTel = prompt('Nuevo teléfono')

    return {
        newName : newName,
        newEmail : newEmail,
        newTel : newTel
    }
}

const checkStorage = () => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if(!savedData){
        return 
    }else{
        const parsedData = JSON.parse(savedData);
        PHONEBOOK.push(...parsedData)
        updateDOM()
    }
}

addButton.onclick = (e) => {
    createContact(e);
}

window.onload = () => {
    checkStorage()
}