import { Formik } from 'formik';

import {
  FormWrapp,
  Input,
  Error,
  Label,
  SubmitButton,
} from 'components/ContactForm/ContactForm.styled';

import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import { submitSchema } from 'Utils/submitSchema';

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    resetForm();

    const { name, number } = values;

    const contact = {
      name,
      number,
    };

    const dublicateContact = findDublicateContact(contact, contacts);

    dublicateContact
      ? alert(`${contact.name} is already in contacts`)
      : dispatch(addContact(values));
  };

  const findDublicateContact = (contact, contacts) => {
    return contacts.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={submitSchema}
    >
      {/* <Message /> */}
      <FormWrapp autoComplete="off">
        <Label htmlFor="number">Number</Label>
        <Input
          type="tel"
          name="number"
          placeholder="Please, enter your Number"
          required
        />
        <Error name="number" component="p" />

        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          name="name"
          placeholder="Please, enter your Name"
          required
        />
        <Error name="name" component="p" />
        <SubmitButton type="submit">Add contact</SubmitButton>
      </FormWrapp>
    </Formik>
  );
};
