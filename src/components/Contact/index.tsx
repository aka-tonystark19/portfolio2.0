import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  contactContainer: {
    marginTop: "60px",
    background: "#f6f9fc"
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "40px",
    "&:after": {
      content: `" "`,
      border: "4px solid #747fe0",
      display: "block",
      margin: "0 auto",
      marginTop: "30px",
      width: "50px"
    }
  },
  contactInfo: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    fontSize: "18px",
    marginBottom: "40px"
  },
  contactItem: {
    margin: "32px",
    textDecoration: "none",
    color: "black",
    position: "relative",
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
      width: "80%"
    },
    [theme.breakpoints.down("xs")]: {
      flexBasis: "100%",
      textAlign: "center"
    }
  },
  footer: {
    textAlign: "center",
    paddingBottom: "80px"
  }
}));

export default function Contact() {
  const classes = useStyles({});

  return (
    <div className={classes.contactContainer}>
      <div className={classes.title} id="contact">
        {" "}
        Contact Me{" "}
      </div>
      <div className={classes.contactInfo}>
        <a href="mailto:ericellb@gmail.com" className={classes.contactItem}>
          ericellb@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/eric-ellbogen-742722b1/" className={classes.contactItem}>
          LinkedIn
        </a>
        <a href="https://github.com/ericellb" className={classes.contactItem}>
          Github
        </a>
      </div>
      <div className={classes.footer}> Eric Ellbogen 2019 </div>
    </div>
  );
}
