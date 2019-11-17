import React from "react";
import { makeStyles } from "@material-ui/styles";
import ProjectCard from "./ProjectCard";
import projects from "../../content/projects";

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
