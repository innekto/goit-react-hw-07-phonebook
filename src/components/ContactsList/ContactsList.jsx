import {
  ContactListMarkup,
  ContactListItem,
  ContactListHeader,
  ContactListText,
  ContactListButton,
} from 'components/ContactsList/ContactsList.styled';

import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  // const { contacts, filter } = useSelector(getContacts, getFilter);
  const contacts = useSelector(getContacts);
  // console.log('contacts', contacts);
  const filter = useSelector(getFilter);

  const getRequiredCard = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteCard = contactId => {
    dispatch(deleteContact(contactId));
  };

  const neeedCard = getRequiredCard();
  return (
    <ContactListMarkup>
      {neeedCard.map(({ name, number, id }) => {
        return (
          <ContactListItem key={id}>
            <ContactListHeader>{name}</ContactListHeader>
            <ContactListText>{number}</ContactListText>
            <ContactListButton type="button" onClick={() => deleteCard(id)}>
              Delete
            </ContactListButton>
          </ContactListItem>
        );
      })}
    </ContactListMarkup>
  );
};
