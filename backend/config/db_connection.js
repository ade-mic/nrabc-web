import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

class DBClient {
  constructor() {
    const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017';
    const dbName = process.env.DB_NAME || 'farmCollab';
// correct initiation
    mongoose
      .connect(`${url}/${dbName}`)
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.error("Failed to connect", err); 
      });

    this.client = mongoose.connection; 
  }

  isAlive() {
    return this.client && this.client.readyState === 1;
  }
}

const dbClient = new DBClient();
export default dbClient;
