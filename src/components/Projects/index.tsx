import React from "react";
import { makeStyles } from "@material-ui/styles";
import ProjectCard from "./ProjectCard";

const useStyles = makeStyles(theme => ({
  projectsContainer: {
    marginTop: "60px",
    background: "#f6f9fc"
  },
  title: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "60px"
  }
}));

export default function Projects() {
  const classes = useStyles({});
  const projects = [
    {
      title: "React Discord Clone",
      description:
        "Discord clone built in Typescript + React + Express. I created this to better understand Websockets and Funtional Components in React. Has full functionality including Server + Channel creations, Private Messaging and even Voice Chat using WebRTC.",
      liveurl: "https://ericellb.github.io/React-Discord-Clone/",
      repourl: "https://github.com/ericellb/React-Discord-Clone",
      imageurl: "discord",
      skills: ["React", "Redux", "Express", "TypeScript"]
    },
    {
      title: "Lightning Link",
      description:
        "URL Shortener built in TypeScript + React + Express. I created this to design a system to be highly scalable from the start. Get Lightning Fast URL Redirections when using LTNG Link.",
      liveurl: "https://ltng.link/#/",
      repourl: "https://github.com/ericellb/Lightning-Link",
      imageurl: "ltnglink",
      skills: ["React", "Redux", "Express", "TypeScript"]
    },
    {
      title: "Flightbook",
      description:
        "Flight Searching application built in TypeScript + React + Express. Search and build combinations of One Way, Round Trip, and Multi City Flights. Includes an Autosuggestion service to complete Airport names.",
      liveurl: "https://ericellb.github.io/flightbook/#/",
      repourl: "https://github.com/ericellb/flightbook",
      imageurl: "flightbook",
      skills: ["PHP", "Laravel", "TypeScript", "React", "Redux"]
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
