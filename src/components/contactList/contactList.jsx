import { useStyles } from "./contactListStyles";
import { getRandomHexColor } from './getRandomHexColor';
import { useSelector, useDispatch } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';
import { deleteContacts } from 'redux/operations';
import ContactIcon from "../../data/contact-icon.svg";
import DeleteIcon from "../../data/delete-icon.svg";

export const ContactList = () => {
    const classes = useStyles();
    const contacts = useSelector(selectVisibleContacts);
    const dispatch = useDispatch();

    return (
        <ul className={classes.contactList}>
            {contacts.map(contact => (
                <li key={contact.id} className={classes.contactListItem}>
                    <img
                        className={classes.contactImg}
                        src={ContactIcon} 
                        alt="Phone" 
                        width={36}
                        style={{ backgroundColor: getRandomHexColor() }}
                    />
                    <a className={classes.contactLink} href={`tel:${contact.number}`}>
                        <p>{contact.name}</p>
                        <p>{contact.number}</p>
                    </a>
                    <button
                        className={classes.contactListButton}
                        type="button"
                        name="delete"
                        onClick={() => dispatch(deleteContacts(contact.id))}
                    >
                        <img
                            className={classes.contactImg}
                            src={DeleteIcon} 
                            alt="Phone" 
                            width={24}
                        />
                    </button>
                </li>
            ))}
        </ul>

    );
};