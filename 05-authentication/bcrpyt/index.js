const bcrypt = require("bcrypt");

const password = "myPlainPassword";

const hashPassword = async (password) => {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
};

const login = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) console.log("Authenticated");
    else console.log("Password not matched");
};

(async () => {
    const hashedPassword = await hashPassword(password);
    await login(password, hashedPassword);
})();




// const bcrypt = require("bcrypt");

// const password = "myPlainPassword";

// const hashPassword = async (password) => {
//   const hashed = await bcrypt.hash(password, 10);
//   return hashed;
// };

// const login = async (password, hashPassword) => {
//   const isMatch = await bcrypt.compare(password, hashPassword);
//   if (isMatch) console.log("Authenticated");
//   else console.log("Password not matched");
// };

// (async () => {
//   const hashedPassword = await hashPassword(password);
//   await login(password, hashedPassword);
// })();
