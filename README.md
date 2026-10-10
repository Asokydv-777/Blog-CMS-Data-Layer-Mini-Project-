# Blog CMS Data Layer

A clean, production-shaped data layer for a Blog CMS built with **Node.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**. 

This project implements a strict repository pattern to abstract all database interactions, ensuring the code is reusable for future API routes (e.g., in Phase 9).

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Runner:** `tsx` (for executing TypeScript scripts)

## 📋 Prerequisites
Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/download/)
- Git

## 🚀 Getting Started

### 1. Install Dependencies
Clone the repository and install the required packages:
```bash
npm install
2. Environment Setup
Create a .env file in the root of the project and add your PostgreSQL connection string. Replace YOUR_PASSWORD with your actual PostgreSQL password.

env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/blog_cms?schema=public"
3. Database Setup
Ensure PostgreSQL is running and create an empty database named blog_cms.
You can do this via your terminal or a GUI like pgAdmin:

bash
createdb blog_cms
4. Run Migrations
Apply the database schema to your fresh database:

bash
npx prisma migrate deploy
5. Seed the Database
Populate the database with realistic sample data (12 users, 36 posts, 105 comments):

bash
npx prisma db seed
📁 Project Structure
text
Assignment_6.6/
├── prisma/
│   ├── migrations/      # SQL migration files
│   ├── schema.prisma    # Database schema definition
│   └── seed.ts          # Seed script for sample data
├── src/
│   ├── repositories/    # Data layer abstraction (No raw Prisma calls outside here)
│   │   ├── index.ts
│   │   ├── postRepository.ts
│   │   ├── commentRepository.ts
│   │   └── userRepository.ts
│   ├── db.ts            # Prisma Client singleton instance
│   └── index.ts         # Test script for repository functions
├── .env                 # Environment variables (Ignored in git)
├── package.json
└── tsconfig.json
🧠 Repository Layer (Data Abstraction)
To ensure the data layer is reusable, no raw Prisma queries (prisma.post.*, prisma.user.*, etc.) are allowed outside of the src/repositories/ folder. All database interactions must go through the following functions:

Function	Behavior
findPostById(id)	Returns a post with its author and comments (with each comment's author), or null if not found.
findPostsByUser(userId)	Returns all posts by a user, ordered newest first.
createPost(authorId, title, content)	Creates and returns a new post.
createComment(postId, authorId, text)	Creates and returns a new comment.
findUsersWithNoPosts()	Returns all users who have never posted.
🧪 Testing the Repositories
A test script is included to verify all repository functions, including edge cases (like fetching a non-existent post or a post with zero comments).

Run the test script:

bash
npx tsx src/index.ts
Expected Output:

findPostById(1) returns a valid post with an author and comments.

findPostById(999999) returns null (graceful handling of not-found).

Post with zero comments returns an empty array [].

findPostsByUser(1) returns timestamps in descending order.

findUsersWithNoPosts() returns the user(s) with zero posts.

createPost and createComment successfully insert new records.

🗺️ Entity-Relationship (ER) Diagram
The database consists of three models: User, Post, and Comment.

User → Post: One-to-Many

User → Comment: One-to-Many

Post → Comment: One-to-Many

(See er-diagram.png in the submission files for the visual representation).

📦 Submission Proofs
The following screenshots are included in the final submission to prove functionality on a fresh database:

proof-migration.png — Successful application of migrations from scratch.

proof-seed.png — Successful execution of the seed script.

proof-repository-tests.png — Output of all 5 repository functions working correctly.

er-diagram.png — Entity-Relationship diagram matching the Prisma schema.

text

### What to do next:
1. Create `README.md` in VS Code.
2. Paste the text above.
3. Save it (`Ctrl+S`).
4. Since you've already finished everything else, you can now push this entire project to GitHub! 

If you need help pushing it to GitHub, let me know and I'll walk you through the `git init`, `git add`, `git commit`, and `git push` commands step-by-step.# Blog-CMS-Data-Layer-Mini-Project-
