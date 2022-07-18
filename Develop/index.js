// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown.js");

// Function that prompts user with questions
const questions = () => {
  data = [];
  const userQuestions = inquirer.prompt([
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title",
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

// TODO: Create a function to write README file
// Function writes to README file
function writeToFile(readMe) {
  return new Promise((resolve, reject) => {
    fs.writeFile("./generated/README.md", readMe, err => {
      if (err) {
        console.log("Error writing to file");
        reject(err);
        return;
      }
      resolve({
        ok: true,
        message: "README generated!"
      })
    })
  })
};

questions()
  .then(data => {
    return generateMarkdown(data)
  })
  .then(readMe => {
    return writeToFile(readMe)
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse.message)
  })
  .catch(err => {
    console.log(err)
  })