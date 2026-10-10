import { prisma } from "../db";

export async function findUsersWithNoPosts() {
  return prisma.user.findMany({
    where: {
      posts: { none: {} },
    },
    orderBy: { id: "asc" },
  });
}
