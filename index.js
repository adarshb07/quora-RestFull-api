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

app.get("/posts/new", (req, res) => {
	res.render("new.ejs");
});

app.post("/posts", (req, res) => {
	let { username, content } = req.body;
	let id = uuidv4();
	posts.push({ id, username, content });
	res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
	let { id } = req.params;
	let post = posts.find((p) => id === p.id);
	res.render("post.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
	let { id } = req.params;
	let newContent = req.body.content;
	let post = posts.find((p) => id === p.id);
	post.content = newContent;
	res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
	let { id } = req.params;
	console.log(id);
	let post = posts.find((p) => id === p.id);
	console.log(post);
	res.render("edit.ejs", { post });
});

app.listen(port, () => {
	console.log(`App is Running on Port ${port}`);
});
