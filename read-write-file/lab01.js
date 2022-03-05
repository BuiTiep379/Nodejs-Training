const fs = require('fs');
const message = 'em la thuc tap sinh nodejs';

fs.writeFile('test.txt', message, (err) => {
  if (err) console.log(err);
  console.log('Successfully Written to File.');
});
fs.readFile('test1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
