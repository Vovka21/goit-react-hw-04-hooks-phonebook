import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import ContactForm from './components/form/ContactForm';
import ContactList from './components/list/list';
import Filter from './components/filter/filter';
import { nanoid } from 'nanoid';
import './App.css';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const findContact = contacts.some(function (e) {
      return e.name.toLowerCase() === name.toLowerCase();
    });

    findContact
      ? alert(`${contact.name} is already in contacts`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(cont => cont.id !== contactId),
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const value = filter;
    return contacts.filter(el =>
      el.name.toLowerCase().includes(value.toLowerCase()),
    );
  };

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div>
      <h1 className="title">Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2 className="title-contacts">Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={getVisibleContacts()} onDelete={deleteContact} />
    </div>
  );
}
