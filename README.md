# 📝 Todo App - NestJS Learning Project

> 🎓 A hands-on learning journey through NestJS fundamentals, one todo at a time!

A simple yet powerful NestJS backend application built while diving deep into the official "NestJS Fundamentals" course at [learn.nestjs.com](https://learn.nestjs.com). Because nothing says "I'm learning a framework" like building yet another todo app... but make it 🔥!

## 🤔 About This Project

This repository serves as a living reference for anyone getting their feet wet with NestJS. Instead of blindly following the course's demo app, I went rogue 😎 and built a todo-list application to really understand the concepts being taught.

**Perfect for**: NestJS newbies, TypeScript enthusiasts, and anyone who enjoys well-structured backend code!

### 🛠️ Tech Stack & Architecture

- **Framework**: NestJS 🐈 (Node.js/TypeScript)
- **Database**: MySQL 🐬 (with TypeORM magic)
- **Docker**: 🐳 Docker Compose setup for painless local development
- **Validation**: Joi ✨ for bulletproof configuration validation

### 🗄️ Data Model

The app features a single resource (`/items`) with two entities dancing in a Many-To-Many relationship:

- **Items** 📋: Your actual todo items
- **Tags** 🏷️: Labels/categories that can be associated with multiple items (and vice versa!)

## 🎯 What's Implemented

✅ \*🚀 Getting Started

### 📋 Prerequisites

- Node.js (v18 or higher recommended) ⚡
- Docker and Docker Compose 🐳

### 💻 Installation

1. Clone the repository 📥
2. Install dependencies:

   ```bash
   npm install
   ```

3. **Configure Environment Variables** 🔑
   A `.env` file is included in the repository with default database credentials for quick setup.

   > ⚠️ **Note**: For demonstration purposes, the `.env` file is committed to this repo. In a real-world scenario, you should **never** commit `.env` files with sensitive credentials. If you fork this repo and plan to use your own credentials, uncomment the `.env` line in `.gitignore` to keep your secrets safe! 🔒

4. Start the Docker containers (and watch the magic happen ✨):

   ```bash
   docker compose up -d
   ```

5. Run the application:

   ```bash
   # development mode
   npm run start

   # watch mode (auto-reload) 👀
   npm run start:dev

   # production mode 🚀
   npm run start:prod
   ```

### 🌐 Accessing Services

- **API**: http://localhost:3000 🎯
- **phpMyAdmin**: http://localhost:8080 🔍 (username/password from your `.env` file)
- **MySQL**: Accessible on `localhost:3306` with credentials from your `.env` file 🗄️

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## 📚 Learning Resources

- [NestJS Fundamentals Course](https://learn.nestjs.com) 🎓
- [NestJS Documentation](https://docs.nestjs.com) 📖
- [TypeORM Documentation](https://typeorm.io) 🗃️

## 📜 License

This is a learning project made with ❤️ and lots of ☕. Feel free to use it as a reference for your own NestJS journey! 🚀

Licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
