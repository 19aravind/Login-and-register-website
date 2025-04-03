const sequelize = require("../config/db.js");
const User = require("./model.js");

sequelize.sync({ force: false }) // Set `force: true` to drop and recreate tables
    .then(() => console.log("✅ Models synced with DB"))
    .catch(err => console.log("❌ Error syncing models:", err));

module.exports = { User };
