## Technologies Used

- **Node.js** and Express.js for the backend server
- **MongoDB** for the database
- **bcrypt.js** for password hashing
- **JSON Web Tokens (JWT)** for user authentication
- **Multer** for handling file uploads

## Getting Started

To run locally on your machine, follow these steps:

1. Clone the repository:

   ```shell
   git clone
   ```

2. Navigate to the project directory:

   ```shell
   cd server
   ```

3. Install the dependencies for the backend:

   ```shell
   npm install
   ```

4. Make a `.env` and update the configuration values with your own:

   - Set the `MONGO_URI` to your MongoDB connection string
   - Set the `JWT_SECRET` to a secret key for JWT authentication

5. Start the backend server:

   ```shell
   npm run server
   ```
