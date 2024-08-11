const yargs = require("yargs");

yargs.command({
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
});
yargs.parse();
