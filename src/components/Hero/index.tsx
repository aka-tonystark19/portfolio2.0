import React from "react";
import TypeWriter from "./Typewriter";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  "@keyframes caret": {
    "50%": { background: "transparent" }
  },
  heroWrapper: {
    marginTop: "60px"
  },
  title: {
    color: "#747fe0",
    fontSize: "72px",
    ["&::before"]: {
      content: "'> '"
    },
    ["& span"]: {
      backgroundColor: "rgba(116,127,224,.65)",
      animation: "$caret 1s steps(1) infinite"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "32px"
    }
  },
  content: {
    fontSize: "22px",
    lineHeight: "40px",
    marginTop: "40px",
    marginBottom: "40px",
    fontWeight: 300
  }
}));

export default function Hero() {
  const classes = useStyles({});

  return (
    <div className={classes.heroWrapper}>
      <TypeWriter text="Eric Ellbogen" className={classes.title} />
      <div className={classes.content}>
        Fullstack developer with a passion for building rich and responsive web applications.
      </div>
    </div>
  );
}
