const { saveData, readData } = require('../utils/handle-data');
const connection = require('../utils/connect-mysql');
const mysql = require('mysql2');
const createUser = (req, res) => {
  // const users = readData();
  // users.push({ ...req.body });
  // saveData(users);
  const { name, email } = req.body;
  let insertQuery = 'INSERT INTO ?? (??,??) VALUES (?,?)';
  let query = mysql.format(insertQuery, ['users', 'email', 'name', email, name]);

  // let query = `INSERT INTO users (email,name) VALUES ('${email}','${name}')`;
  // console.log(query);
  connection.query(query, (err, response) => {
    if (err) {
      return res.status(400).json({ err });
    }
    // console.log(response);
    // rows added

    return res.status(201).json({ msg: 'create successfully' });
  });
  // res.send('tiep');
};
const getAllUsers = (req, res) => {
  // const users = readData();
  let query = 'SELECT email, name FROM users';
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(400).json({ err });
    }
    // console.log(result);
    res.status(200).json({ users: result });
  });
};
const getSingleUser = (req, res) => {
  res.send('get single user');
};
const updateUser = (req, res) => {
  res.send('update user');
};
const deleteUser = (req, res) => {
  res.send('delete user');
};

module.exports = {
  createUser,
  getAllUsers,
};
