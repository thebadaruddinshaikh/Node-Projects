const { argv } = require("yargs");
const note = require("./notes");
const chalk = require("chalk");
//Without curly braces this does not work

//getting file name
console.log(argv.file);

//

switch (argv.mode) {
	case "delete":
		note.delete(argv.file);
		break;
	case "append":
		note.append(argv.file, argv.body);
		break;
	case "read":
		note.read(argv.file);
	case "list":
		note.list();
		break;
	default:
		note.create(argv.file, argv.body);
}
