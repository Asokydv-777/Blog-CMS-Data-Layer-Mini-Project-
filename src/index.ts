import { prisma } from "./db";
import {
  findPostById,
  findPostsByUser,
  createPost,
  createComment,
  findUsersWithNoPosts,
} from "./repositories";

async function main() {
  console.log("--- findPostById(1) ---");
  const post = await findPostById(1);
  console.log("title:", post?.title);
  console.log("author:", post?.author.name);
  console.log("comment count:", post?.comments.length);

  console.log("\n--- findPostById(999999) [not found] ---");
  console.log(await findPostById(999999));

  console.log("\n--- post with zero comments (id 7) ---");
  const emptyPost = await findPostById(7);
  console.log("comments:", emptyPost?.comments);

  console.log("\n--- findPostsByUser(1) newest first ---");
  const userPosts = await findPostsByUser(1);
  console.log(userPosts.map((p) => p.createdAt.toISOString()));

  console.log("\n--- findUsersWithNoPosts() ---");
  const idle = await findUsersWithNoPosts();
  console.log(idle.map((u) => u.email));

  console.log("\n--- createPost ---");
  const newPost = await createPost(1, "A brand new post", "Some content here.");
  console.log("created id:", newPost.id);

  console.log("\n--- createComment ---");
  const newComment = await createComment(newPost.id, 2, "First!");
  console.log("created comment id:", newComment.id);

  console.log("\n--- new post now has 1 comment ---");
  const verify = await findPostById(newPost.id);
  console.log("comment count:", verify?.comments.length);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
