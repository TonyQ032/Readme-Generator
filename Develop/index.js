// Packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// Function that prompts user with questions
const questions = () => {
  const userQuestions = inquirer.prompt([
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title",
      //Ensures the user has included a title for their README
      validate: userTitle => {
        if (userTitle) {
          return true;
        } else {
          console.log("Project title is required!")
          return false;
        }
      }
    },
    {
      type: "input",
      message: "Write a detailed description of your project: ",
      name: 'description'
    },
    {
      type: "input",
      message: "Write any installation instructions: ",
      name: 'installation'
    },
    {
      type: "input",
      message: "Write any important usage information: ",
      name: 'usage'
    },
    {
      type: "input",
      message: "What are your contribution guidelines?",
      name: 'contribution'
    },
    {
      type: "checkbox",
      message: "What licenses will apply to your project? (Select all the apply)",
      name: 'licenses',
      choices: ["Apache", "GNU", "ISC", "MIT", "OBSD", "Public Domain (No license)"]
    },
    {
      type: "input",
      message: "What are some tests you've done for your project?",
      name: 'tests',
    },
    {
      type: "input",
      message: "What is your Github username?",
      name: 'github',
    },
    {
      type: "input",
      message: "What is your email?",
      name: 'email',
    },
  ])
  return userQuestions
}

// Function writes to README file
function writeToFile(readMe) {
  return new Promise((resolve, reject) => {
    //Generates README into the 'generated' folder
    fs.writeFile("./generated/README.md", readMe, err => {
      if (err) {
        console.log("Error writing to file");
        reject(err);
        return;
      }
      resolve()
    })
  })
};

//Runs the questions function, then executes the appropriate functions, one after another
questions()
  //Takes user input and generates the markdown for README
  .then(data => {
    return generateMarkdown(data)
  })
  //Writes generated markdown and creates a completed README
  .then(readMe => {
    writeToFile(readMe);
    console.log("README successfully generated!");
  })
  //Console.logs any errors caught along the way
  .catch(err => {
    console.log(err)
  })