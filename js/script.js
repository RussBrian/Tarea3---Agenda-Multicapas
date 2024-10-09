//-----------------------------------------------------------------------------------
//GET

const listOfContacts = () => {
    fetch('http://www.raydelto.org/agenda.php')
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById('contact-list');
            data.forEach(contacto => {
                const item = document.createElement('tr');
                item.innerHTML = `
                    <td>${contacto.nombre}</td>
                    <td>${contacto.apellido}</td>
                    <td>${contacto.telefono}</td>
                `;
                contactList.appendChild(item);
            });
        })
        .catch(error => console.error('Error al obtener contactos:', error));
};

window.onload = listOfContacts;

//----------------------------------------------------------------------------------
// POST

const addContact = (nombre, apellido, telefono) => {
    fetch('http://www.raydelto.org/agenda.php', {
        method: 'POST',
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre, apellido, telefono})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Contacto agregado:', data);
        listOfContacts();
    })
    .catch(error => console.error('Error al agregar contacto:', error));
};

const btnAddContact = document.getElementById('btn-add-contact');
btnAddContact.addEventListener('click', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const telefono = document.getElementById('telefono').value;

    if (nombre && apellido && telefono) {
        addContact(nombre, apellido, telefono);
        alert('Se añadio un nuevo contacto');
    } else {
        alert('Todos los campos son obligatorios');
    }
});
