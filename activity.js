const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');
let db = new sqlite3.Database('./mydb.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});
db.run(`CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  room TEXT NOT NULL,
  time TEXT NOT NULL,
  imageUrl INTEGER NOT NULL,
  students INTEGER NOT NULL
)`);

let jsonData = [
  { title: "Solar electricity", department: "ภาควิชาวิศวกรรมไฟฟ้า", room: "ห้อง 101", time: "10:00 AM", students: 3,imageUrl:"https://kcheckin.kmitl.ac.th/api/public/uploads/banner_1.png" },
  { title: "Item2", department: "D2", room: "ห้อง 101", time: "10:00 AM", students: 3,imageUrl:"https://kcheckin.kmitl.ac.th/api/public/uploads/banner_1.png" },
  { title: "Item3", department: "D3", room: "ห้อง 101", time: "10:00 AM", students: 3,imageUrl:"https://kcheckin.kmitl.ac.th/api/public/uploads/banner_1.png" },
  { title: "Item4", department: "D3", room: "ห้อง 101", time: "10:00 AM", students: 3,imageUrl:"https://kcheckin.kmitl.ac.th/api/public/uploads/banner_1.png" }
];

jsonData.forEach(item => {
  const query = 'SELECT * FROM courses WHERE title = ? AND department = ? AND room = ? AND time = ?';
  db.get(query, [item.title, item.department, item.room, item.time], (err, row) => {
      if (err) {
          return console.error(err.message);
      }
      if (!row) {
          db.run('INSERT INTO courses (title, department, room, time, imageUrl, students) VALUES (?, ?, ?, ?, ?, ?)',
              [item.title, item.department, item.room, item.time, item.imageUrl, item.students],
              function(insertErr) {
                  if (insertErr) {
                      return console.error(insertErr.message);
                  }
                  console.log(`A row has been inserted with rowid ${this.lastID}`);
              }
          );
      } else {
          console.log('Record already exists');
      }
  });
});

const app = express();

const port = 3000;
app.use(cors({ origin: '*' }));

app.use(express.json()); // for parsing application/json

// Endpoint to get data from the database
app.get('/courses', (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.json({
      "message":"success",
      "data":rows
    })
  });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
