import { prisma } from "../db";

export async function createComment(
  postId: number,
  authorId: number,
  text: string,
) {
  return prisma.comment.create({
    data: { postId, authorId, text },
  });
}
