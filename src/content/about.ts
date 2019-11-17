export default [
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
