import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  header: {
    fontSize: "22px",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: "32px"
  },
  item: {
    paddingRight: "1em",
    fontWeight: 300,
    position: "relative",
    textDecoration: "none",
    color: "black",
    "&:after": {
      display: "block",
      position: "absolute",
      left: 0,
      bottom: "-30px",
      width: 0,
      height: "8px",
      backgroundColor: "#747fe0",
      content: `""`,
      transition: "width .15s"
    },
    "&:hover:after": {
      width: "70%"
    }
  }
}));

export default function Header() {
  const classes = useStyles({});

  return (
    <div className={classes.header}>
      <a href="#projects" className={classes.item}>
        Projects
      </a>
      <a href="#contact" className={classes.item}>
        Contact
      </a>
    </div>
  );
}
