import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { seedSuperAdmin } from "./app/DB";
const port = config.port;

const main = async () => {
  try {
    await mongoose.connect(config.db_url);
    seedSuperAdmin();
  } catch (error) {
    console.log(error);
  }
};

main();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
