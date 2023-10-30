import { useSelector, useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { addContacts } from '../../redux/operations';
import { useStyles } from "./contactFormStyles";
import { useState } from 'react';
import { nanoid } from 'nanoid';
import PhoneIcon from '../../data/phone-icon.svg';
import NameIcon from "../../data/name-icon.svg";

// Generation of unique identifiers for form fields
const nameInputId = nanoid();
const numberInputId = nanoid();

export const ContactForm = ({ ...props }) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    
    const contacts = useSelector(selectContacts);
    const dispatch = useDispatch();

    // Form submission processing
    const handleSubmit = event => {
        event.preventDefault();

        const isInContacts = contacts.some(
        contact => contact.name.toLowerCase().trim() === name.toLowerCase().trim()
        );

        if (isInContacts) {
            alert(`${name} is already in contacts`);
            return;
        }

        dispatch(addContacts({ name, number }));
        setName('');
        setNumber('');
    };
    
    // Processing of changes to form field values
    const handleChange = event => {
        const { name, value } = event.target;
    
        switch (name) {
          case 'name':
            setName(value);
            break;
          case 'number':
            setNumber(value);
            break;
          default:
            return;
        }
      };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <label className={classes.label} htmlFor={nameInputId}>
                <img 
                    className={classes.labelImg}
                    src={NameIcon} alt="Name" 
                    width={32}
                />
                <input
                    className={classes.formInput}
                    type="text"
                    name='name'
                    value={name}
                    onChange={handleChange}
                    placeholder='Name'
                    minLength="2"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                />
            </label>
            <label className={classes.label} htmlFor={numberInputId}>
                <img
                    className={classes.labelImg}
                    src={PhoneIcon} 
                    alt="Phone" 
                    width={32}
                />
                <input
                    className={classes.formInput}
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChange}
                    placeholder='Number'
                    pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>
            <button className={classes.formButton} type="submit">{props.btnText}</button>
        </form>
    );
};