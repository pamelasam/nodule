var sqlite3 = require("sqlite3").verbose();
var fs = require("fs");

var db_name = "mcu.db";
var db = new sqlite3.Database(db_name);

var create_table_script = `
create table hero ( 
    hero_id int primary key not null, 
    hero_name text not null, 
    is_xman text not null, 
    was_snapped text not null 
);

insert into hero (hero_id, hero_name, is_xman, was_snapped)
    values (1, 'Spiderman', 'N', 'Y'),
           (2, 'Tony Stark', 'N', 'N'),
           (3, 'Jean Grey', 'Y', 'N');

create table hero_power (
    hero_id int not null,
    hero_power text not null
);

insert into hero_power (hero_id, hero_power)
    values (1, 'Web Slinging'),
           (1, 'Super Strength'),
           (1, 'Total Nerd'),
           (2, 'Total Nerd'),
           (3, 'Telepathic Manipulation'),
           (3, 'Astral Projection');
`;

db.exec(create_table_script, (err) => {
  if (!err) {
    console.log("Table created.");
  } else if (err) {
    console.log("Getting error " + err);
  }
});

db.all(
  `select hero_name, is_xman, was_snapped from hero h
   inner join hero_power hp on h.hero_id = hp.hero_id
   where hero_power = ?`,
  "Total Nerd",
  (err, rows) => {
    // console.log(rows);
    rows.forEach((row) => {
      console.log(row.hero_name + "\t" + row.is_xman + "\t" + row.was_snapped);
    });
  }
);

db.close((err) => {
  if (err) throw err;
  fs.unlink(db_name, function (err) {
    if (err) throw err;
    console.log("File deleted!");
  });
});
