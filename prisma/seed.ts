import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userSeeds = [
  { name: "Aarav Sharma", email: "aarav.sharma@example.com" },
  { name: "Priya Nair", email: "priya.nair@example.com" },
  { name: "Rohan Mehta", email: "rohan.mehta@example.com" },
  { name: "Sara Khan", email: "sara.khan@example.com" },
  { name: "Vikram Rao", email: "vikram.rao@example.com" },
  { name: "Neha Gupta", email: "neha.gupta@example.com" },
  { name: "Arjun Patel", email: "arjun.patel@example.com" },
  { name: "Meera Iyer", email: "meera.iyer@example.com" },
  { name: "Kabir Singh", email: "kabir.singh@example.com" },
  { name: "Ananya Das", email: "ananya.das@example.com" },
  { name: "Rahul Verma", email: "rahul.verma@example.com" },
  { name: "Ishita Bose", email: "ishita.bose@example.com" },
];

const topics = [
  "Getting started with Prisma",
  "Why database indexes matter",
  "Writing your first migration",
  "Normalisation vs denormalisation",
  "Understanding foreign keys",
  "Transactions in PostgreSQL",
  "Seeding data the right way",
  "Choosing primary keys",
  "Query performance basics",
  "Modelling one-to-many relations",
  "Handling soft deletes",
  "Backups and restore drills",
];

const angles = ["a beginner guide", "common mistakes", "what I learned"];

const commentTexts = [
  "Great explanation, this finally clicked for me.",
  "I hit the same issue last week, thanks for writing this up.",
  "Could you show the SQL that Prisma generates here?",
  "Bookmarked. Sending this to my team.",
  "Small correction: the default is now different in v6.",
  "This is the clearest write-up I have found on the topic.",
  "Do you have a follow-up post planned?",
  "Ran this against my local database and it worked first try.",
];

async function main() {
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const createdUsers = [];
  for (const user of userSeeds) {
    createdUsers.push(await prisma.user.create({ data: user }));
  }

  const postAuthors = createdUsers.slice(0, 11);

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const createdPosts = [];
  for (let i = 0; i < 36; i++) {
    const author = postAuthors[i % postAuthors.length];
    const title = `${topics[i % topics.length]}: ${angles[Math.floor(i / topics.length)]}`;

    const post = await prisma.post.create({
      data: {
        title,
        content:
          `In this post we look at ${topics[i % topics.length].toLowerCase()}. ` +
          `We walk through a concrete example, look at the trade-offs, and finish ` +
          `with a short checklist you can apply to your own project.`,
        authorId: author.id,
        createdAt: new Date(now - (36 - i) * DAY),
      },
    });

    createdPosts.push(post);
  }

  let commentCount = 0;
  for (let i = 0; i < createdPosts.length; i++) {
    const post = createdPosts[i];
    const commentsForThisPost = i % 7;

    for (let j = 0; j < commentsForThisPost; j++) {
      const commenter = createdUsers[(i + j + 1) % createdUsers.length];

      await prisma.comment.create({
        data: {
          text: commentTexts[(i + j) % commentTexts.length],
          postId: post.id,
          authorId: commenter.id,
          createdAt: new Date(
            post.createdAt.getTime() + (j + 1) * 60 * 60 * 1000,
          ),
        },
      });

      commentCount++;
    }
  }

  console.log(
    `Seeded ${createdUsers.length} users, ${createdPosts.length} posts, ${commentCount} comments.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
