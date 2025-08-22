import app from "./app";
import config from "./config/index";

const mainServer = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log("error:", error);
  }
};

mainServer();
