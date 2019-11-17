import React, { useEffect, useState } from "react";
import { evaluate } from "mathjs";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  terminal: {
    borderRadius: "16px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
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
    ["& span.caret"]: {
      backgroundColor: "hsla(0,0%,97%,.65)",
      animation: "$caret 1s steps(1) infinite"
    }
  },
  infoResult: {
    color: "#e7d184"
  },
  "@keyframes caret": {
    "50%": { background: "transparent" }
  },
  commandInput: {
    background: "#5a5d7a",
    outline: "none",
    border: "none",
    color: "white",
    textShadow: "0 0 0 gray",
    width: "0px",
    fontSize: "18px",
    fontFamily: "Consolas",
    fontWeight: 200,
    "&:focus": {
      outline: "0px solid transparent;",
      border: "none"
    }
  }
}));

let eric = {
  currentLocation: "Montreal, Quebec",
  contactInfo: ["ericellb@gmail.com", "LinkedIn", "github"],
  resume: "resume.pdf",
  skills: [
    "TypeScript",
    "Embedded C",
    "HTML5",
    "CSS3",
    "React",
    "Redux",
    "Material Design",
    "NodeJS",
    "Express",
    "REST API",
    "Redis",
    "MySQL",
    "MongoDB",
    "Linux",
    "Git",
    "Jest",
    "Networking"
  ],
  languages: ["English", "French"]
};

export default function Terminal() {
  const classes = useStyles({});

  let aboutInfoArr = [
    { command: "eric.currentLocation", result: `"Montreal, Quebec"` },
    {
      command: "eric.contactInfo",
      urls: [
        { name: "ericellb@gmail.com", src: "mailto:ericellb@gmail.com" },
        { name: "LinkedIn", src: "https://www.linkedin.com/in/eric-ellbogen-742722b1/" },
        { name: "github", src: "https://github.com/ericellb" }
      ]
    },
    { command: "eric.resume", urls: [{ name: "ericellb.pdf", src: "/resume.pdf" }] },
    {
      command: "eric.skills",
      result: `["TypeScript", "Embedded C", "HTML5", "CSS3", "React", "Redux", "Material Design", "NodeJS", "Express", "REST API", "Redis", "MySQL", "MongoDB", "Linux", "Git", "Jest", "Networking"

  ]`
    },
    { command: "eric.languages", result: `["English", "French"]` }
  ];

  const [aboutInfos, setAboutInfos] = useState(aboutInfoArr);

  // Setup event listener for span content editable input
  useEffect(() => {
    let input = document.getElementById("commandInput");
    if (input) {
      input.addEventListener("keypress", e => {
        let event = e as any;
        if (event.target) {
          let command = event.target.value;
          let input = document.getElementById("commandInput");
          if (event.key === "Enter") {
            event.preventDefault();
            console.log(command);
            if (parseCommand(command)) {
              event.target.innerHTML = "";
            }
          }
        }
      });

      input.addEventListener("input", e => {
        let event = e as any;
        let command = event.target.value;
        if (input) {
          input.style.width = command.length + "ch";
        }
      });
    }
  }, []);

  const parseCommand = (command: string) => {
    let validCommand = true;
    command = command.toLocaleLowerCase();

    if (command.includes("=")) {
      setAboutInfos(prevstate => [...prevstate, { command: command, result: "Stop trying to overwrite me 😥" }]);
    } else if (command === "eric") {
      setAboutInfos(prevstate => [...prevstate, { command: command, result: JSON.stringify(eric) }]);
    } else if (command === "eric.currentlocation") {
      setAboutInfos(prevstate => [...prevstate, aboutInfos[0]]);
    } else if (command === "eric.contactinfo") {
      setAboutInfos(prevstate => [...prevstate, aboutInfos[1]]);
    } else if (command === "eric.resume") {
      setAboutInfos(prevstate => [...prevstate, aboutInfos[2]]);
    } else if (command === "eric.skills") {
      setAboutInfos(prevstate => [...prevstate, aboutInfos[3]]);
    } else if (command === "eric.languages") {
      setAboutInfos(prevstate => [...prevstate, aboutInfos[4]]);
    } else if (command === "help") {
      setAboutInfos(prevstate => [...prevstate, { command: "help", result: "try playing around to find cool stuff!" }]);
    } else {
      // Try to eval for math
      try {
        validCommand = true;
        let result = evaluate(command);
        setAboutInfos(prevstate => [...prevstate, { command: command, result: result }]);
      } catch (err) {
        validCommand = false;
        console.log(err);
        setAboutInfos(prevstate => [...prevstate, { command: command, result: `${command} : command not found ` }]);
      }
    }

    return validCommand;
  };

  const focusInput = () => {
    let input = document.getElementById("commandInput");
    if (input) {
      input.focus();
    }
  };

  return (
    <div className={classes.terminal} onClick={() => focusInput()}>
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
                  return (
                    <a href={url.src} target="_blank">
                      {urlName}
                    </a>
                  );
                })}
            </div>
          );
        })}
        <div className={classes.aboutInfo}>
          <div className={classes.infoCommand}>
            <input id="commandInput" className={classes.commandInput} />
            <span className="caret">&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
