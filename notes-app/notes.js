const fs = require("fs");
const chalk = require("chalk");

//creating a new note
//overwriting the note
newNote = (filename, body) => {
	const filePath = "./notes/" + filename;
	fs.writeFile(filePath, body, (err) => {
		if (err) throw err;
		console.log(chalk.green("Note Made"));
	});
};

//deleting a note
deleteNote = (filename) => {
	const filePath = "./notes/" + filename;
	fs.unlink(filePath, (err) => {
		if (err) throw err;

		console.log(chalk.red.inverse("Note Sucessfully deleted"));
	});
};

//listing all the notes
listNotes = () => {
	fs.readdir("./notes", (err, files) => {
		if (err) throw err;

		files.forEach((e) => {
			console.log(chalk.green(e));
		});
	});
};

//reading the mention note
readNote = (filename) => {
	const filePath = "./notes/" + filename;
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) throw err;
		console.log(data);
	});
};
//appending the note
appendNote = (filename, body) => {
	const filePath = "./notes/" + filename;
	fs.appendFile(filePath, body, (err) => {
		if (err) throw err;
	});
};

module.exports = {
	delete: deleteNote,
	create: newNote,
	append: appendNote,
	list: listNotes,
	read: readNote,
};
