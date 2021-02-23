export default [
  { command: "eric.currentLocation", result: `"Montreal, QC, Canada"` },
  {
    command: "eric.contactInfo",
    urls: [
      { name: "ericellb@gmail.com", src: "mailto:ericellb@gmail.com" },
      { name: "LinkedIn", src: "https://www.linkedin.com/in/eric-ellbogen-742722b1/" },
      { name: "GitHub", src: "https://github.com/ericellb" },
    ],
  },
  { command: "eric.resume", urls: [{ name: "ericellb.pdf", src: "/resume.pdf" }] },
  {
    command: "eric.skills",
    result: `["TypeScript", "Node.js", "MySql", "Redis", "Microservices", "Event-Sourcing", "React", "Redux", "Material UI"]`,
  },
  { command: "eric.languages", result: `["English", "French"]` },
] as CommandType[];

export interface CommandType {
  command: string;
  result?: string;
  urls?: { name: string; src: string }[];
  files?: { fileName: string; type: string }[];
}
