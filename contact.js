const fs = require("fs");
const readline = require("readline");
const chalk = require("chalk");
const validator = require("validator");

//Styleguide:
const danger = chalk.bold.red.inverse;
const success = chalk.bold.green.inverse;
const warning = chalk.bold.yellow.inverse;
const info = chalk.bold.blue.inverse;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const question = (question) => {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const saveContact = (name, number, email) => {
  const contact = { name, number, email };
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);

  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      `${danger("Contact already exists. Please use another name!")}`
    );
    rl.close();
    return false;
  }

  //cek number phone
  if (!validator.isMobilePhone(number, "id-ID")) {
    console.log(`${danger("Phone number is not valid!")}`);
    rl.close();
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(`${danger("Email is not valid!")}`);
      rl.close();
      return false;
    }
  }

  contacts.push(contact);
  fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2));
  console.log(`${success("Contact has been saved!")}`);
  rl.close();
};

const listContact = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);

  if (contacts.length === 0) {
    console.log(`${warning("No contact available!")}`);
    rl.close();
    return false;
  }

  console.log(info("List of contacts:"));
  contacts.forEach((contact, index) => {
    console.log(`${index + 1}. Name: ${contact.name}`);
    console.log(`   Phone: ${contact.number}`);
    if (contact.email) {
      console.log(`   Email: ${contact.email}`);
    }
  });
  rl.close();
};

const deleteContact = (name) => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);

  const newContacts = contacts.filter((contact) => contact.name !== name);

  if (newContacts.length === contacts.length) {
    console.log(`${danger("Contact not found!")}`);
    rl.close();
    return false;
  }

  fs.writeFileSync(dataPath, JSON.stringify(newContacts, null, 2));
  console.log(`${success("Contact has been deleted!")}`);
  rl.close();
};

module.exports = { question, saveContact, listContact, deleteContact };
