// https://peakaccount.com/blog/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%84%E0%B8%B4%E0%B8%94%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B8%A3%E0%B8%A7%E0%B8%A1%E0%B8%AA%E0%B8%B8%E0%B8%97%E0%B8%98%E0%B8%B4%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%A3/
// ราคาสินค้ารวม = สามารถตั้งเองได้
// ส่วนลดรวม = สามารถตั้งเองได้
// ราคาสินค้าหลังส่วนลด
// ภาษีมูลค่าเพิ่ม 7 %
// ราคารวมสุทธิ

const express = require("express");
const formidable = require("formidable");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
  console.log(__dirname);
});

app.post("/api/calculatevat", (req, res, next) => {
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    var price_total = fields.price_total;
    var discount = fields.discount;
    var price_after_discount = price_total - discount;
    var vat = price_after_discount * 0.07;
    var net_price = price_after_discount + vat;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.writeHead(200);
    res.write(
      '<label for="price_total">ราคาสินค้ารวม: </label>' + price_total + "<br>"
    );
    res.write('<label for="discount">ส่วนลดรวม: </label>' + discount + "<br>");
    res.write(
      '<label for="price_after_discount">ราคาสินค้าหลังส่วนลด: </label>' +
        price_after_discount +
        "<br>"
    );
    res.write(
      '<label for="vat">ภาษีมูลค่าเพิ่ม 7 %: </label>' + vat.toFixed(2) + "<br>"
    );
    res.write(
      '<label for="net_price">ราคารวมสุทธิ: </label>' +
        net_price.toFixed(2) +
        "<br>"
    );
    res.write('<a href="/">คำนวณอีกครั้ง</a>');
    return res.end();
  });
});

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.writeHead(200);
  res.write(
    '<form action="api/calculatevat" method="post" enctype="multipart/form-data">'
  );
  res.write(
    '<label for="price_total">ราคาสินค้ารวม: </label><input type="text" name="price_total"><br>'
  );
  res.write(
    '<label for="discount">ส่วนลดรวม: </label><input type="text" name="discount"><br>'
  );
  res.write('<input type="submit">');
  res.write("</form>");
  return res.end();
});
