// contacts.js
const fs = require('fs').promises
const contactsPath = './db/contacts.json'
const readContacts = fs.readFile(contactsPath);

function listContacts() {
    readContacts
        .then((data) => console.table(JSON.parse(data)))
        .catch((err) => console.log(err.message))
}

function getContactById(contactId) {
    readContacts
        .then((data) => {
            const contacts = JSON.parse(data)
            const result = contacts.filter((contact) => {
                return contact.id === contactId
            })
            if (result.length > 0) {
                console.table(result[0])
            } else {
                console.log('Contact not found')
            }

        }
        )
        .catch(error => console.log(error.message))
}

function removeContact(contactId) {
    readContacts
        .then((data) => {
            const contacts = JSON.parse(data)
            let contactToDelete = false

            contacts.map((contact, index) => {
                if (contact.id == contactId) {
                    contactToDelete = index
                }
            })

            if (contactToDelete === false) {
                console.log('Contact not found')
            } else {
                contacts.splice(contactToDelete, 1)
                fs.writeFile(contactsPath, JSON.stringify(contacts))
                console.log("Success!")
            }

        }
        )
        .catch(console.log)
}


function addContact(name, email, phone) {
    readContacts
        .then((data) => {
            const contacts = JSON.parse(data)
            const id = contacts[contacts.length - 1].id + 1
            const contact = { id, name, email, phone }

            contacts.push(contact)
            fs.writeFile(contactsPath, JSON.stringify(contacts))
            console.log('Success! Contact added')
        })
        .catch(console.log)

}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
