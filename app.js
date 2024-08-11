const {
  question,
  saveContact,
  listContact,
  deleteContact,
} = require("./contact");
const yargs = require("yargs");

// const main = async () => {
//   const name = await question("Input contact name: ");
//   const number = await question("Input phone number: ");
//   const email = await question("Input email: ");
//   saveContact(name, number, email);
// };

// main();

yargs
  .command({
    command: "add",
    describe: "Add a new contact",
    builder: {
      name: {
        describe: "Contact name",
        demandOption: true,
        type: "string",
      },
      number: {
        describe: "Contact number",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Contact email",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      saveContact(argv.name, argv.number, argv.email);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "List all contacts",
  handler() {
    listContact();
  },
});

yargs.command({
  command: "delete",
  describe: "Delete a contact",
  builder: {
    name: {
      describe: "Contact name",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    console.log("Delete contact with name: ", argv.name);
    deleteContact(argv.name);
  },
});

yargs.parse();
