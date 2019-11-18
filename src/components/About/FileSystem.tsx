export class FileSystem {
  private paths: any = {
    experience: {
      zayo: "This is where I currently work!",
      allstream: "This was my job!"
    },
    projects: {
      discord: "Discord Clone ",
      weather: "some weather!"
    },
    animals: {
      dexter: "Is my miniature schnauzer!",
      cami: "Is my turkish van cat!"
    }
  };

  private workingDir = "";

  public getWorkingDir() {
    return this.workingDir;
  }

  // Returns content of a file
  public cat(fileName: string) {
    let files = this.getPathContents();
    if (typeof files[fileName] === "string") {
      return files[fileName];
    }
  }

  // Creates a file
  public touch(fileName: string) {
    this.createFileFolder(fileName, "file");
  }

  // Creates a folder
  public mkdir(folderName: string) {
    this.createFileFolder(folderName, "folder");
  }

  // Lists all files / folder
  public ls() {
    let fileList = this.getPathContents();
    let results: { fileName: string; type: string }[] = [];
    for (let key in fileList) {
      if (typeof fileList[key] === "string") {
        results.push({ fileName: key, type: "file" });
      } else if (typeof fileList[key] === "object") {
        results.push({ fileName: key, type: "folder" });
      }
    }
    return results;
  }

  // Navigates into a folder
  public cd(folderName: string) {
    let dirs = this.getPathContents();
    let foundDir = true;

    // Trying to go back dirs
    if (folderName === "./" || folderName === "../") {
      if (folderName === "./") {
        this.workingDir = "";
      } else if (folderName === "../") {
        let lastIndex = this.workingDir.lastIndexOf("/");
        this.workingDir = this.workingDir.slice(0, lastIndex);
      }
    }
    // Trying to go into a dir
    else {
      let i = 0;
      for (let key in dirs) {
        if (typeof dirs[key] === "object" && Object.keys(dirs).indexOf(folderName) === i) {
          this.workingDir += "/" + folderName;
          return foundDir;
        }
        i++;
      }
      foundDir = false;
    }

    return foundDir;
  }

  // Creates either a file or folder at current path
  private createFileFolder(fileName: string, type: "file" | "folder") {
    let creationType;
    if (type === "file") {
      creationType = ` = 'Empty File'`;
    } else if (type === "folder") {
      creationType = ` = {}`;
    }

    if (this.workingDir === "") {
      let command = `this.paths.${fileName}` + creationType;
      eval(command);
    } else {
      let dirs = this.workingDir.split("/");
      let command = `this.paths`;
      for (let i = 1; i < dirs.length; i++) {
        command = command + "." + dirs[i];
      }
      // Path is a string literal, that we will eval to JS
      command += `.${fileName}` + creationType;

      eval(command);
    }
  }

  // Gets the current path from workingDir
  private getPathContents() {
    if (this.workingDir === "") {
      return this.paths;
    } else {
      let dirs = this.workingDir.split("/");
      let path = this.paths[dirs[1]];
      for (let i = 2; i < dirs.length; i++) {
        path = path[dirs[i]];
      }

      return path;
    }
  }
}
