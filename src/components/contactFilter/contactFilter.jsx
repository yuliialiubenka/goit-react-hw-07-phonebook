import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { changeFilter } from 'redux/filter';
import { useStyles } from "./contactFilterStyles";
import SearchIcon from "../../data/search-icon.svg";

export default function ContactFilter ({ ...props }) {
    const classes = useStyles();
    const value = useSelector(selectFilter);
    const dispatch = useDispatch();
    
    const onChangeFilter = event => {
        const normalizedValue = event.target.value.toLowerCase();

        dispatch(changeFilter(normalizedValue));
    };

    return (
        <div className={classes.filterWrapper}>
            <h2 className={classes.filterTitle}>{props.title}</h2>
            <label className={classes.filterLabel} htmlFor="search">
                <img
                    className={classes.labelImg}
                    src={SearchIcon} 
                    alt="Phone" 
                    width={28}
                />
                <input
                    name='search'
                    className={classes.filterInput}
                    type="text"
                    placeholder="Find contacts by name"
                    value={value} 
                    onChange={onChangeFilter}
                />
            </label>
        </div>
    );
};
  
  