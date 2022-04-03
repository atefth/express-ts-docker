import { app } from ".";

const port = process.env.NODE_LOCAL_PORT || "3000";
app.listen(parseInt(port), "0.0.0.0", () => {
  console.log(`Worker: process ${process.pid} is up on port ${port}`);
});
