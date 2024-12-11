# MemoryRemains App (First Phase)

Preserve your digital legacy. Ensure your loved ones can access important information and memories when you're no longer able to.

## Overview

MemoryRemains is a secure and innovative application designed to store and manage your most important digital information. It serves as a digital vault for your crucial data, ensuring that your legacy and essential information are preserved and accessible when needed most.

## Key Features

1. **Secure Data Storage**:

   - Store sensitive information such as social network account credentials
   - Save important notes and personal messages

2. **Trusted Person System**:

   - Designate a trusted individual who can access your information in case of emergency
   - Set a customizable inactivity period

3. **Automated Alert System**:

   - The app monitors your login activity
   - If you don't log in within the specified inactivity period, it automatically notifies your trusted person

4. **Emergency Access**:

   - Your trusted person gains controlled access to your stored information after the inactivity period
   - Ensures your important data is retrievable when you're unable to access it yourself

5. **User-Friendly Interface**:
   - Easy-to-use dashboard for managing your stored information
   - Simple process for setting up and modifying your trusted person and inactivity period

## Technical Stack

- Frontend: React.js with Vite
- Backend: Node.js with Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm (v6 or later)
- MongoDB instance (local or cloud-based)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/MemoryRemains.git
   cd MemoryRemains
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory with the following content:

   ```
   MONGO_URI=your_mongo_uri
   PORT=5000
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

   Replace `your_mongo_uri` with your MongoDB connection string and `your_secret_key` with a secure random string for JWT encryption.

### Running the App

1. Build the app:

   ```bash
   npm run build
   ```

2. Start the server:

   ```bash
   npm run start
   ```

3. The app should now be running. Access the frontend at `http://localhost:5173` and the backend API at `http://localhost:5000`.

## Usage

1. **Sign Up/Login**: Create an account or log in to access your personal dashboard.

2. **Add Information**: Use the dashboard to add your important account details and notes.

3. **Set Trusted Person**: Navigate to the settings to add a trusted person's contact information.

4. **Set Inactivity Period**: Choose the duration of inactivity after which your trusted person will be notified.

5. **Regular Use**: Log in periodically to reset the inactivity timer and manage your stored information.

## Security Considerations

- All sensitive data is encrypted before being stored in the database.
- Use a strong, unique password for your MemoryRemains account.
- Choose your trusted person carefully and ensure they understand the responsibility.
- Regularly review and update your stored information and settings.

## Contributing

We welcome contributions to MemoryRemains! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Support

If you encounter any issues or have questions, please file an issue on our GitHub repository or contact our support team at support@memoryremains.com.

## First Phase

In First phase app functionality is completed but mailing system in not working yet and i will implement this feature in Second phase. I think that i will use Mailtrap for that.

---

MemoryRemains: Preserving Your Digital Legacy, Securing Your Peace of Mind.

```

This README provides a comprehensive overview of the MemoryRemains app, including its features, setup instructions, usage guidelines, and important considerations. It's designed to give users and potential contributors a clear understanding of what the app does and how to use it effectively.
```
