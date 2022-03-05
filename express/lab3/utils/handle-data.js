const fs = require('fs');
const path = require('path');

/*
function writeFilePromise(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (error) => {
      if (error) reject(error);
      resolve('write file success');
    });
  });
}

function readFilePromise(path) {
  // // const jsonData = await fs.readFile();
  // const jsonData = await fs.readFile(path.join(__dirname, '../users.json'), 'utf-8');
  // // console.log(jsonData);
  // return JSON.parse(jsonData);
  // try {
  //   const jsonData = await fs.promises.readFile(path.join(__dirname, '../users.json'), 'utf8');
  //   return JSON.parse(jsonData);
  // } catch (err) {
  //   console.log(err);
  // }
  // const jsonData = fs.readFileSync(path.join(__dirname, '../users.json'), 'utf8');
  // return JSON.parse(jsonData);
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}
const readData = async () => {
  const jsonData = await readFilePromise(path.join(__dirname, '../users.json'), 'utf8');
  return JSON.parse(jsonData);
};
const saveData = async (data) => {
  const stringifyData = JSON.stringify(data);
  return await writeFilePromise(path.join(__dirname, '../users.json'), stringifyData);
};
*/

const saveData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync(path.join(__dirname, '../users.json'), stringifyData);
};

const readData = () => {
  const jsonData = fs.readFileSync(path.join(__dirname, '../users.json'));
  return JSON.parse(jsonData);
};
module.exports = {
  saveData,
  readData,
};
