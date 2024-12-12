const { setEngine } = require("crypto");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
	{
		id: uuidv4(),
		username: "adarshB",
		content: "I love Coding",
	},
	{
		id: uuidv4(),
		username: "testuser",
		content: "This is Test POST",
	},
	{
		id: uuidv4(),
		username: "newUser",
		content: "Hardwork is key for everything",
	},
];

app.get("/", (req, res) => {
	res.send("Server is Runnings");
});

app.get("/posts", (req, res) => {
	res.render("index.ejs", { posts });
});

app.listen(port, () => {
	console.log(`App is Running on Port ${port}`);
});
