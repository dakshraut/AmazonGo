import fs from "fs";

export const logger = (msg) => {
  const log = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync("server.log", log);
};
