import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const sequelize = new Sequelize({
    dialect: "sqlite",
  storage: "./database.sqlite", 
  logging: false,
})

sequelize.authenticate()
    .then(() => console.log("✅ Database connected successfully!"))
    .catch(err => console.log("❌ Database connection failed:", err));

export {sequelize};
