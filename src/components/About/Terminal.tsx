import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  terminal: {
    borderRadius: "16px"
  },
  header: {
    background: "#e4e3e5",
    height: "28px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  termButton: {
    background: " #f96256",
    width: "14px",
    height: "14px",
    borderRadius: "15px",
    marginLeft: "8px"
  },
  exit: {
    background: "#f96256"
  },
  minimize: {
    background: "#fdbc3d"
  },
  maximize: {
    background: "#33c948"
  },
  body: {
    background: "#5a5d7a",
    padding: "16px",
    fontSize: "18px"
  },
  aboutInfo: {
    marginTop: "24px",
    marginBottom: "24px",
    ["& a"]: {
      textDecoration: "none",
      color: "#35feff"
    }
  },
  infoCommand: {
    color: "#f7f7f7",
    ["&::before"]: {
      content: "'> '"
    },
    ["& span"]: {
      backgroundColor: "hsla(0,0%,97%,.65)",
      animation: "$caret 1s steps(1) infinite"
    }
  },
  infoResult: {
    color: "#e7d184"
  },
  "@keyframes caret": {
    "50%": { background: "transparent" }
  }
}));

export default function Terminal() {
  const classes = useStyles({});
  let aboutInfos = [
    { command: "eric.currentLocation", result: `"Montreal, Quebec"` },
    {
      command: "eric.contactInfo",
      urls: [
        { name: "ericellb@gmail.com", src: "ericellb@gmail.com" },
        { name: "LinkedIn", src: "https://linkedin.com" },
        { name: "github", src: "https://github.com" }
      ]
    },
    { command: "eric.resume", urls: [{ name: "ericellb.pdf", src: "ericellb@gmail.com" }] },
    {
      command: "eric.skills",
      result: `["TypeScript", "Embedded C", "HTML5", "CSS3", "React", "Redux", "Material Design", "NodeJS", "Express", "REST API", "Redis", "MySQL", "MongoDB", "Linux", "Git", "Jest", "Networking"

  ]`
    },
    { command: "eric.languages", result: `["English", "French"]` }
  ];

  return (
    <div className={classes.terminal}>
      <div className={classes.header}>
        <div className={classes.termButton + " " + classes.exit}></div>
        <div className={classes.termButton + " " + classes.minimize}></div>
        <div className={classes.termButton + " " + classes.maximize}></div>
      </div>
      <div className={classes.body}>
        {aboutInfos.map(aboutInfo => {
          return (
            <div className={classes.aboutInfo}>
              <div className={classes.infoCommand}>{aboutInfo.command}</div>
              {!aboutInfo.urls && <div className={classes.infoResult}>{aboutInfo.result}</div>}
              {aboutInfo.urls &&
                aboutInfo.urls.map((url, i) => {
                  let urlName;
                  if (aboutInfo.urls.length === 1) {
                    urlName = url.name;
                  } else if (i === 0) {
                    urlName = `["` + url.name + ", ";
                  } else if (i < aboutInfo.urls.length - 1) {
                    urlName = '"' + url.name + '", ';
                  } else {
                    urlName = '"' + url.name + '"]';
                  }
                  return <a href={url.src}>{urlName}</a>;
                })}
            </div>
          );
        })}
        <div className={classes.aboutInfo}>
          <div className={classes.infoCommand}>
            <span>&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
