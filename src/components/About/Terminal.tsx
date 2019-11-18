import React, { useEffect, useState, Fragment } from "react";
import { evaluate } from "mathjs";
import { makeStyles } from "@material-ui/core";
import aboutInfoArr, { CommandType } from "../../content/about";
import { FileSystem } from "./FileSystem";

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
    background: "#1e1e1e",
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
  infoFile: {
    color: "white"
  },
  infoFolder: {
    color: "#0dbc79"
  },
  "@keyframes caret": {
    "50%": { background: "transparent" }
  },
  commandInput: {
    background: "#1e1e1e",
    outline: "none",
    border: "none",
    color: "white",
    textShadow: "0 0 0 gray",
    width: "4ch",
    fontSize: "18px",
    fontFamily: "Consolas",
    fontWeight: 200,
    "&:focus": {
      outline: "0px solid transparent;",
      border: "none"
    }
  }
}));

let fs: FileSystem;
let fsCommands = ["cd", "mkdir", "touch", "cat"];
let ericCommands: any = {
  "eric.currentlocation": aboutInfoArr[0],
  "eric.contactinfo": aboutInfoArr[1],
  "eric.resume": aboutInfoArr[2],
  "eric.skills": aboutInfoArr[3],
  "eric.languages": aboutInfoArr[4]
};

interface TerminalProps {
  paths: any;
}

export default function Terminal(props: TerminalProps) {
  const classes = useStyles({});
  const [command, setCommand] = useState("help");
  const [aboutInfos, setAboutInfos] = useState(aboutInfoArr);
  const [workingDir, setWorkingDir] = useState("/");

  // Setup filesystem paths + custom commands
  useEffect(() => {
    fs = new FileSystem(props.paths);
  }, []);

  const parseCommand = (command: string) => {
    let validCommand = true;
    command = command.toLocaleLowerCase();

    if (ericCommands[command]) {
      setAboutInfos(prevstate => [...prevstate, ericCommands[command]]);
    } else if (command === "help") {
      setAboutInfos(prevstate => [
        ...prevstate,
        { command: "help", result: "supported commands are : cd, ls, mkdir, cat, touch" }
      ]);
    } else if (command === "ls") {
      let result = fs.ls();
      setAboutInfos(prevstate => [...prevstate, { command: command, files: result }]);
    } else if (fsCommands.indexOf(command.split(" ")[0]) > -1) {
      let commandParts = command.split(" ");
      let fsCommand = `fs.${commandParts[0]}('${commandParts[1]}')`;
      let result = eval(fsCommand);
      setAboutInfos(prevstate => [...prevstate, { command: command, result: result }]);
      let tempWorkingDir = fs.getWorkingDir();
      if (tempWorkingDir === "") {
        tempWorkingDir = "/";
      }
      setWorkingDir(tempWorkingDir);
    } else {
      // If none of our valid commands, try to parse it as math
      try {
        let result = evaluate(command);
        if (typeof result === "string") {
          setAboutInfos(prevstate => [...prevstate, { command: command, result: result }]);
        } else {
          throw new Error("invalid math result");
        }
      } catch (err) {
        validCommand = false;
        setAboutInfos(prevstate => [...prevstate, { command: command, result: `${command} : command not found ` }]);
      }
    }

    return validCommand;
  };

  // Focuses Input (used if click anywhere on terminal div)
  const focusInput = () => {
    let input = document.getElementById("commandInput");
    if (input) {
      input.focus();
    }
  };

  // Renders if aboutinfo has urls to format
  const renderURLS = (aboutInfo: CommandType) => {
    if (aboutInfo.urls) {
      return aboutInfo.urls.map((url, i) => {
        let urlName;
        if (aboutInfo.urls && aboutInfo.urls.length === 1) {
          urlName = url.name;
        } else if (i === 0) {
          urlName = `["` + url.name + ", ";
        } else if (aboutInfo.urls && i < aboutInfo.urls.length - 1) {
          urlName = '"' + url.name + '", ';
        } else {
          urlName = '"' + url.name + '"]';
        }
        return (
          <a href={url.src} target="_blank">
            {urlName}
          </a>
        );
      });
    }
  };

  // Renders if aboutInfo has file/folder data
  const renderFileFolder = (aboutInfo: CommandType) => {
    if (aboutInfo.files) {
      return aboutInfo.files.map(file => {
        return (
          <Fragment>
            <span className={file.type === "folder" ? classes.infoFolder : classes.infoFile}>{file.fileName} </span>
          </Fragment>
        );
      });
    }
  };

  // Parses key if enter, submits string
  const submitCommand = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (parseCommand(command)) {
        let input = document.getElementById("commandInput");
        setCommand("");
        if (input) {
          input.style.width = "0ch";
        }
      }

      // Keep bottom of Terminal in view (when typing a lot of commands)
      var commandInput = document.getElementById("commandInput");
      if (commandInput) {
        commandInput.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  // Sets command on change, also updates input width
  const setCommandInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(event.target.value);
    event.target.style.width = event.target.value.length + "ch";
  };

  return (
    <div className={classes.terminal} onClick={() => focusInput()} id="terminal">
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
              {aboutInfo.result && <div className={classes.infoResult}>{aboutInfo.result}</div>}
              {aboutInfo.urls && renderURLS(aboutInfo)}
              {aboutInfo.files && renderFileFolder(aboutInfo)}
            </div>
          );
        })}
        <div className={classes.aboutInfo}>
          <div className={classes.infoCommand}>
            <span style={{ color: "#2d84ea" }}>{workingDir}</span>{" "}
            <input
              id="commandInput"
              className={classes.commandInput}
              autoComplete="off"
              value={command}
              onChange={e => setCommandInput(e)}
              onKeyDown={e => submitCommand(e)}
            />
            <span className="caret">&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
