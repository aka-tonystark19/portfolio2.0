import React from "react";
import { makeStyles, Button, Icon } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    background: "white",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    fontFamily: "Roboto",
    color: "#525f7f",
    marginBottom: "40px",
    "&:hover": {
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
    }
  },
  cardImageContainer: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "0%"
    }
  },
  cardImage: {
    width: "100%",
    height: "100%"
  },
  cardMain: {
    width: "60%",
    padding: "48px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      boxSizing: "border-box"
    }
  },
  cardTitle: {
    fontSize: "22px",
    marginBottom: "24px",
    fontWeight: 500
  },
  cardDesc: {
    marginBottom: "24px",
    lineHeight: "26px"
  },
  cardSkillsContainer: {
    display: "flex",
    marginBottom: "24px",
    flexWrap: "wrap"
  },
  cardSkill: {
    padding: "6px",
    border: "2px solid #92eac0",
    borderRadius: "8px",
    margin: "4px",
    fontSize: "14px"
  },
  cardButtonContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  cardButton: {
    marginRight: "16px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "16px"
    }
  },
  cardButtonDemo: {
    background: "#747fe0",
    ["&:hover"]: {
      background: "#7795f8"
    }
  },
  cardButtonSource: {
    background: "#fff",
    color: "#7795f8",
    ["&:hover"]: {
      background: "#fff"
    }
  }
}));

interface ProjectCardProps {
  data: {
    title: string;
    description: string;
    skills: string[];
    liveurl: string;
    repourl: string;
    imageurl: string;
  };
}

export default function ProjectCard(props: ProjectCardProps) {
  const classes = useStyles({});

  const handleLink = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className={classes.container}>
      <div className={classes.cardImageContainer}>
        <img src={process.env.PUBLIC_URL + `/${props.data.imageurl}.png`} className={classes.cardImage} />
      </div>
      <div className={classes.cardMain}>
        <div className={classes.cardTitle}>{props.data.title}</div>
        <div className={classes.cardDesc}>{props.data.description}</div>
        <div className={classes.cardSkillsContainer}>
          {props.data.skills.map(skill => {
            return <div className={classes.cardSkill}> {skill} </div>;
          })}
        </div>
        <div className={classes.cardButtonContainer}>
          <Button
            onClick={() => handleLink(props.data.liveurl)}
            variant="contained"
            color="primary"
            className={classes.cardButton + " " + classes.cardButtonDemo}
            endIcon={<Icon className="fa fa-external-link-alt"></Icon>}
          >
            Live Demo
          </Button>
          <Button
            onClick={() => handleLink(props.data.repourl)}
            variant="contained"
            color="primary"
            className={classes.cardButton + " " + classes.cardButtonSource}
            endIcon={<Icon className="fab fa-github"></Icon>}
          >
            View Source
          </Button>
        </div>
      </div>
    </div>
  );
}
