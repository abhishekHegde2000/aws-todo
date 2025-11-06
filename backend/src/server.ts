import app from "./app.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Get the port from environment variables or default to 8000
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
  // We use console.log here, but in production, we'd use a real logger
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Press CTRL+C to stop server");
});
