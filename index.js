/*
Explicación:

1. ^ indica el inicio de la línea.
2. [A-Z] asegura que el primer carácter sea una letra mayúscula.
3. [a-zñA-ZÑ0-9\s\S] permite cualquier carácter (letras minúsculas, letras mayúsculas, números, la letra “ñ”, caracteres especiales y párrafos).
4. {4,199} especifica que después de la primera letra mayúscula, debe haber al menos
 4 caracteres y no más de 199, para un total de entre 5 y 200 caracteres.
5. $ indica el final de la línea.
Esta expresión regular permitirá cualquier carácter 
(incluyendo espacios, números, la letra “ñ”, caracteres especiales y párrafos) 
siempre que la longitud total esté entre 5 y 200 caracteres y comience con una letra mayúscula.

Por favor, ten en cuenta que esta expresión regular no distingue entre diferentes 
tipos de caracteres. Si necesitas una validación más específica (por ejemplo, requerir 
    al menos un número o un carácter especial), tendrás que modificar la expresión regular 
    para adaptarla a tus necesidades.
*/ 

// empresion regular
const REGEX_NAME=/^[A-Z][a-zñA-ZÑ0-9\s\S]{4,500}$/


// selectores
const inputTask=document.querySelector("#inputTask") //input
const formBtn=document.querySelector("#form-btn")//boton
const form=document.querySelector('#form')
const info=document.querySelector('.info')// texto 
const list=document.querySelector('#list')//ul
const Texto=document.querySelector('.info-añadir')// info añadir
const showFormBtn=document.querySelector('.show-btn')


// botones totales
let tBtn1=document.querySelector('.container-btn1')//TOTAL
let tBtn2=document.querySelector('.container-btn2')//COMPLETO
let tBtn3=document.querySelector('.container-btn3')//INCOMPLETO



// validacion entrada de datos
let inputValidation=false


// Data
let contacts = [];



// funcion para validar estado del input al ingresar datos
const validationInput =(input,validation)=>{
    const infoText=info.parentElement.children[2]   
    if(input=== ''){
        input.classList.remove('correct')
        input.classList.remove('incorrect')
        infoText.classList.remove('show-info')
       
    }else if (validation){
        input.classList.add('correct')
        input.classList.remove('incorrect')
        infoText.classList.remove('show-info')
        
        
    }else{
        input.classList.remove('correct')
        input.classList.add('incorrect')
        infoText.classList.add('show-info')
        
    }
    
    if (validationInput ){
        formBtn.disabled=false
       
        formBtn.classList.add('show-btn')
        
    }else{
        formBtn.disabled=true
        
        formBtn.classList.remove('show-btn')
    }
}


// funcion para recorrer el ul por cada li ingresado
const renderContacts = () => {
    list.innerHTML = '';
    
    contacts.forEach(contact => {
      const li = document.createElement('li');
     
      li.id = contact.id; 
      if (contact.completa) {
        li.classList.add('decoracionLi');
      }
      li.innerHTML = `
        <button class="delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class ="delete-icon"fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        </button>
             <p>${contact.taskList}</p>
        <button class="edit-btn">
            <svg xmlns="http://www.w3.org/2000/svg"class ="edit-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
      `;
      list.append(li);
    });
    tBtn1.innerHTML= `<p class="container-btn1 ">Total : ${contacts.length}</p>`
    tBtn1.classList.add('Show-container-btn1')
    
}

const getCompletas=()=>{
    const completa = contacts.filter(contact => contact.completa).length;
    tBtn2.innerHTML =`Completas: ${completa}`
    
}


const getIncompleta=()=>{
    console.log(contacts);
    const incompletass = contacts.filter(contact => !contact.completa).length;
    console.log(incompletass);
    console.log(tBtn3.inn);
    tBtn3.innerHTML =`Incompletas: ${incompletass}`
}

const getTotal=()=>{
    const total = contacts.length;
    tBtn1.innerHTML =`Total: ${total}`
}



const getContacts = () => {// funcion 
    const contactsDb = localStorage.getItem('contacts');
    // const incompletasDb = localStorage.getItem('incompletas');

    if (localStorage.getItem('contacts')) {
      contacts = JSON.parse(contactsDb);
    }
   getCompletas();
   getIncompleta();
   getTotal()
    renderContacts();
  }
  
  getContacts(); // llamando a la funcion getContactos
// evento

inputTask.addEventListener('input',(e)=>{
    inputValidation= REGEX_NAME.test(inputTask.value)
    validationInput(inputTask,inputValidation)
})
form.addEventListener('submit',e=>{
    // logica de negocio
    e.preventDefault();
    if(inputValidation ===''){
    Texto.classList.remove('show-info-añadir'); 

    }else if(!inputValidation){
        return

    }
    else{
            Texto.classList.add('show-info-añadir');
        
    }
   
   
    // Creo el nuevo contacto
    const newContact = {
        id: crypto.randomUUID(), // crea un id aleatorio
        taskList: inputTask.value,
        completa: false,
    
    }
   

  // Agrego el nuevo contacto al array
    contacts = contacts.concat(newContact);


  // Guardo en el navegador
    localStorage.setItem('contacts', JSON.stringify(contacts));
    // localStorage.setItem('incompletas',JSON.stringify(incompletas))
    // localStorage.setItem('completas', JSON.stringify(completas))

  // Limpiar el formulario
    inputValidation = false;


//   logica de renderizado
    inputTask.value=''
    validationInput(inputTask, inputValidation)
    renderContacts()
    getCompletas();
    getIncompleta();
    getTotal()
})

list.addEventListener('click', e => {
    const deleteBtn = e.target.closest('.delete-btn');
    const editBtn = e.target.closest('.edit-btn');
    
    // ELIMINAR
    if (deleteBtn){
        //console.log(1);
        const id =deleteBtn.parentElement.id
        contacts = contacts.filter(contact =>{
            if(contact.id !== id){ // retornas los elemento del arreglo restando las que sean diferente al id
                
                return contact
                
            }
        })
        localStorage.setItem('contacts', JSON.stringify(contacts));
        renderContacts();
        getCompletas();
        getIncompleta();
        getTotal()
        
    }
    // editar

    if (editBtn){
        const li = editBtn.parentElement
        const  taskEdit=li.children[1]
        
        if (li.classList.contains('editando')){
            li.classList.remove('editando')
            contacts = contacts.map(contact=> {
                if (contact.id === li.id) {
                    return {
                      ...contact,                     
                      taskList: taskEdit.innerHTML,
                      
                    }
                  } else {
                    return contact;
                  }
            })
            localStorage.setItem('contacts', JSON.stringify(contacts));
            renderContacts();
            editBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class ="edit-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            }
            `
     
         }else{
 
            editBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class ="edit-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>

            `
          
            
            
            if (editBtn){
                const li = editBtn.parentElement;
                const id = li.id; // Obtiene el ID del elemento de la lista
        
                contacts = contacts.map(contact=>{
                    if (contact.id === li.id) {
                        
                        return {
                          ...contact,                     
                          completa: !contact.completa
                        }
                      } else {
                        return contact;
                        
                      }
                      
                })
                
                localStorage.setItem('contacts', JSON.stringify(contacts)); // Actualiza el localStorage
                renderContacts(); // Actualiza la visualización de los contactos
                getCompletas();
                getIncompleta();
                getTotal()
                list.querySelectorAll('li').forEach(li => {
                    if (contacts.find(contact => contact.id === li.id).completa) {
                        li.classList.add('decoracionLi');
                        editBtn.disabled=true;
                    } else {
                        li.classList.remove('decoracionLi');
                    }
                      });
            }
            
            
            
            
            
                
        }               
            
    }
}) ; 



