import React from "react";
import { makeStyles } from "@material-ui/styles";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles(theme => ({
  projectsContainer: {
    marginTop: "40px",
    background: "#f6f9fc"
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "40px"
  }
}));

export default function Projects() {
  const classes = useStyles({});
  const projects = [
    {
      title: "React Discord Clone",
      description:
        "Discord clone built in Typescript + React + Express. I created this to better understand Websockets and to learn Functional Components in React. The application has full functionality including Server + Channel creations, Private Messaging and even Voice Chat using WebRTC.",
      liveurl: "https://ericellb.github.io/React-Discord-Clone/",
      repourl: "https://github.com/ericellb/React-Discord-Clone",
      imageurl: "discord",
      skills: ["TypeScript", "React", "Redux", "Express", "MySQL", "Socket.io", "Material-UI"]
    },
    {
      title: "Lightning Link",
      description:
        "URL Shortener built in TypeScript + React + Express. I created this to design a system to be highly scalable from the start, uses caching to provide Lighting Fast redirection. Also provides analytics and user demographic of your generated LTNG Links.",
      liveurl: "https://ltng.link/#/",
      repourl: "https://github.com/ericellb/Lightning-Link",
      imageurl: "ltnglink",
      skills: ["TypeScript", "React", "Redux", "Express", "MySQL", "Redis", "Material-UI"]
    },
    {
      title: "Flightbook",
      description:
        "Flight Searching web service built in Laravel + TypeScript and React Frontend. Search and build combinations of One Way, Round Trip, and Multi City Flights. Includes an Autosuggestion service to complete Airport names.",
      liveurl: "https://ericellb.github.io/flightbook/#/",
      repourl: "https://github.com/ericellb/flightbook",
      imageurl: "flightbook",
      skills: ["PHP / Laravel", "TypeScript", "React", "Redux", "Material-UI"]
    }
  ];

  return (
    <div className={classes.projectsContainer}>
      <div className={classes.title} id="projects">
        Projects
      </div>
      {projects.map(project => {
        return <ProjectCard data={project} />;
      })}
    </div>
  );
}
