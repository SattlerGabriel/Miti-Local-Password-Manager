const fs = window.require("fs");
const crypto = window.require("crypto");
const path = window.require("path");

const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16);

const remote = window.require("electron").remote.app;
const dataPath = remote.getPath("userData");

function getName(name) {
  return name + ".json";
}

function getPath() {
  return path.join(dataPath, "data");
}

async function GetKey() {
  return new Promise(function (resolve, reject) {
    if (fs.existsSync(path.join(getPath(), "key.pem"))) {
      fs.readFile(path.join(getPath(), "key.pem"), (err, data) => {
        if (err) {
          reject("Error reading file");
          throw err;
        }

        resolve(data);
      });
    } else {
      let tKey = crypto.randomBytes(32);

      fs.writeFile(path.join(getPath(), "key.pem"), tKey, (err) => {
        if (err) throw err;
      });
    }
  });
}

function Encrypt(data) {
  return new Promise(function (resolve) {
    GetKey().then((key) => {
      let cipher = crypto.createCipheriv(algorithm, key, iv);
      let encrypted = cipher.update(data);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      resolve({
        iv: iv.toString("hex"),
        encryptedData: encrypted.toString("hex"),
      });
    });
  });
}

function Decrypt(data) {
  return new Promise(function (resolve) {
    GetKey().then((key) => {
      let iv = Buffer.from(data.iv, "hex");
      let encryptedText = Buffer.from(data.encryptedData, "hex");
      let decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      resolve(decrypted.toString());
    });
  });
}

//Add an object to the files array
export function writeFile(filename, DTO) {
  let name = path.join(getPath(), getName(filename));
  return new Promise(function (resolve, reject) {
    Encrypt(JSON.stringify(DTO)).then((data) => {
      DTO = data;

      if (fs.existsSync(name)) {
        fs.readFile(name, (err, data) => {
          if (err) {
            reject("Failed reading the file");
            throw err;
          }

          let oldData = JSON.parse(data);

          let totalData = new Array();

          for (let i = 0; i < oldData.length; i++) {
            totalData.push(oldData[i]);
          }

          totalData.push(DTO);

          fs.writeFile(name, JSON.stringify(totalData), (err) => {
            if (err) {
              reject("Failed to write the file");
              throw err;
            }

            resolve(true);
          });
        });
      } else {
        let totalData = new Array();

        totalData.push(DTO);

        fs.writeFile(name, JSON.stringify(totalData), (err) => {
          if (err) {
            reject("Failed to write the file");
            throw err;
          }

          resolve(true);
        });
      }
    });
  });
}

//Replace a whole file with the given data
export async function replaceFile(filename, data) {
  let name = path.join(getPath(), getName(filename));
  return new Promise(function (resolve, reject) {
    if (data.length > 0) {
      EncryptArray(data).then((a) => {
        a = JSON.stringify(a);
        fs.writeFile(name, a, (err) => {
          if (err) reject("Failed to write accounts file");

          resolve(true);
        });
      });
    } else {
      fs.writeFile(name, "[]", (err) => {
        if (err) reject("Failed to write accounts file");

        resolve(true);
      });
    }
  });
}

//Get whole file's worth of data
export async function readFile(filename) {
  let name = path.join(getPath(), getName(filename));

  return new Promise(function (resolve, reject) {
    if (fs.existsSync(name)) {
      fs.readFile(name, (err, data) => {
        if (err) {
          reject("Couldn't read specified file");
          throw err;
        }

        let nuData = JSON.parse(data);

        resolve(DecryptArray(nuData));
      });
    } else reject("No such file exists");
  });
}

async function EncryptArray(array) {
  return new Promise(function (resolve) {
    let L = array.length;
    let R = new Array();

    for (let i = 0; i < L; i++) {
      Encrypt(JSON.stringify(array[i])).then((data) => {
        R.push(data);

        if (R.length == L) {
          resolve(R);
        }
      });
    }
  });
}

async function DecryptArray(array) {
  return new Promise(function (resolve) {
    let L = array.length;
    let R = new Array();

    for (let i = 0; i < L; i++) {
      Decrypt(array[i]).then((data) => {
        data = JSON.parse(data);
        R.push(data);

        if (R.length == L) {
          resolve(R);
        }
      });
    }
  });
}

//Remove a matching entry
export async function removeEntry(filename, obj, type) {
  return new Promise(function (resolve) {
    readFile(filename).then((v) => {
      for (let i = 0; i < v.length; i++) {
        if (type == "account") {
          if (
            v[i].webpage == obj.webpage &&
            v[i].username == obj.username &&
            v[i].password == obj.password
          ) {
            v.splice(i, 1);
          }
        } else {
          if (v[i].title == obj.title && v[i].content == obj.content) {
            v.splice(i, 1);
          }
        }
      }

      replaceFile(filename, v).then(() => {
        resolve(true);
      });
    });
  });
}

//Return an array with matching entries
export async function getEntry(filename, data, type) {
  return new Promise(function (resolve, reject) {
    readFile(filename).then((v) => {
      let foundData = [];

      for (let i = 0; i < v.length; i++) {
        if (type == "account") {
          if (
            v[i].webpage.includes(data) ||
            v[i].username.includes(data) ||
            v[i].password.includes(data)
          ) {
            foundData.push(v[i]);
          }
        } else {
          if (v[i].title == data.title && v[i].content == data.content) {
            foundData.push(v[i]);
          }
        }
      }

      if (foundData.length > 0) resolve(foundData);
      else reject("Failed to find any accounts");
    });
  });
}

export function Initialize() {
  if (!fs.existsSync(getPath())) fs.mkdirSync(getPath(), true);
  GetKey();
}

export function ExportAccountList() {
  //Todo
}