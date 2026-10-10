import { prisma } from "../db";

export async function findPostById(id: number) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });
}

export async function findPostsByUser(userId: number) {
  return prisma.post.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createPost(
  authorId: number,
  title: string,
  content: string,
) {
  return prisma.post.create({
    data: { authorId, title, content },
  });
}
