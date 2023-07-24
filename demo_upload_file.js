const express = require("express");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const app = express();
const port = 3000;

app.post("/api/fileupload", (req, res, next) => {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    console.log(files);
    let oldPath = files.filetoupload[0].filepath;
    let newPath =
      path.join(__dirname, "uploads") +
      "/" +
      files.filetoupload[0].newFilename +
      path.extname(files.filetoupload[0].originalFilename);
    let rawData = fs.readFileSync(oldPath);

    fs.writeFile(newPath, rawData, function (err) {
      if (err) console.log(err);
      return res.send("Successfully uploaded");
    });
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(__dirname);
});

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(
    '<form action="api/fileupload" method="post" enctype="multipart/form-data">'
  );
  res.write('<input type="file" name="filetoupload"><br>');
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end();
});
