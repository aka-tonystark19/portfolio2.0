import React from "react";
import Terminal from "./Terminal";

let paths = {
  experience: {
    turbulent: "I am currently a backend developer at Turbulent, working on Microservices for Star Citizen!",
    zayo: "I was a Network Technician at Zayo. (View Resume for more info)",
    wowwee: "I was a Embedded Software Developer at WowWee. (View Resume for more info)",
    allstream: "I was a Network Technican at Allstream. (View Resume for more info)"
  },
  projects: {
    discord: "A fully functional Clone of Discord, check it out below",
    ltnglink: "A Highly Scalable URL Shortener, check it out below!",
    visualsort: "A visualizer for various sorting algorithms, check it out below!",
    weather: "A simple weather app, check it out below!"
  },
  animals: {
    dexter: "Is my miniature schnauzer!",
    cami: "Is my turkish van cat!"
  }
};

export default function About() {
  return (
    <div>
      <Terminal paths={paths} />
    </div>
  );
}
