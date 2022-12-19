import app from "./server";

const port = 5000;

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
