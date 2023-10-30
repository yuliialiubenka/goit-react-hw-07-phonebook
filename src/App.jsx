import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectContacts, selectVisibleContacts } from './redux/selectors';
import { fetchContacts } from './redux/operations';
import { Wrapper } from './components/wrapper/wrapper';
import { ContactForm } from './components/contactForm/contactForm';
import { ContactList } from './components/contactList/contactList';
import { EmptyBlock } from './components/emptyBlock/emptyBlock';
import ContactFilter from './components/contactFilter/contactFilter';
import { useStyles } from "./AppStyles";
import data from './data/data';

export const App = () => {
  const classes = useStyles();
  const contacts = useSelector(selectContacts);
  const visibleContacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    // Running async Thunk-action 'fetchContacts' when mounting a component
    dispatch(fetchContacts());
  }, [dispatch]);
  
  let filterContent;
  let contactsList;

  if (contacts.length > 0 ) {
    filterContent = <ContactFilter 
                      title={data.filterTitle}
                    />
  } else if (contacts.length === 0) {
    filterContent = <EmptyBlock
                      emptyText1={data.emptyText1}
                      emptyText2={data.emptyText2}
                    />
  }

  if (contacts.length > 0 && visibleContacts.length !== 0) {
    contactsList = <ContactList/>
  } else if (contacts.length > 0 && visibleContacts.length === 0) {
    contactsList = <div className={classes.noContacts}>{data.noContacts}</div>
  }
  return (
    <>
      <Wrapper
        title={data.title}
      >
        <ContactForm btnText={data.btnText}/>
          {filterContent}
          {contactsList}
      </Wrapper>
    </>
  )
}