//Takes user info from index.js for licenses. Renders selected badge info
function renderLicenseBadge(license) {
  license = license.map(badge => {
    if (badge !== "Public Domain (No license)") {
      return `![License](https://img.shields.io/static/v1?label=License&message="${badge}&color=BLUE)`
    }
  })
  return license.join(" ")
}

//Appropriately renders every selected license into an list object for MD
function renderListObject(licenseObject) {
  licenseObject = licenseObject.map(item => "* " + item)
  return licenseObject.join(" \n")
}

//Generates a README using all the info from collected from index.js
function generateMarkdown(data) {
  //Reassigns values from incoming data for easier organization
  const {title, description, installation, usage, contribution, licenses, tests, github, email} = data;

  //Returns the completed README file to index.js
  return `
  
# ${title}

${renderLicenseBadge(licenses)}

## Description
${description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Licenses](#licenses)
* [Contribution](#contribution)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${installation}

## Usage
${usage}

## Licenses
This project falls under the following license(s): \n
${renderListObject(licenses)}

## Contribution
${contribution}

## Tests
${tests}

## Questions
If you have any questions, please contact me below: \n

Github: [${github}](https://github.com/${github}) \n
Email: ${email}
`;
}

//Exports generateMarkdown function for use in index.js
module.exports = generateMarkdown;
