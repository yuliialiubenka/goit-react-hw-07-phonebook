import { useStyles } from "./emptyBlockStyles";

export const EmptyBlock = ({  ...props }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.emptyBlock}>
        <p>{props.emptyText1}</p>
        <p>{props.emptyText2}</p>
      </div>
    );
};