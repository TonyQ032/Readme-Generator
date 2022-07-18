//Takes user info from index.js for licenses. Renders selected badge info
function renderLicenseBadge(license) {
  license = license.map(badge => {
    if (badge !== "Public Domain (No license)") {
      return `![License](https://img.shields.io/static/v1?label=License&message="${badge}&color=BLUE)`
    }
  })
  return license.join(" ")
}

function renderObjectList(licenseObject) {
  licenseObject = licenseObject.map(item => "* " + item)
  return licenseObject.join(" \n")
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const {title, description, installation, usage, contribution, licenses, tests, github, email} = data;
  return `
  
# ${title}

${renderLicenseBadge(licenses)}

## Description
${description}

## Table of Contents
---------------------
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contribution](#contribution)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${installation}

## Usage
${usage}

## Licenses
${renderObjectList(licenses)}

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

module.exports = generateMarkdown;
