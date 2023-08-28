import { PrismaClient } from "@prisma/client";

const globalPrisma = {
  prisma: undefined,
};

export const prismaClient = globalPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalPrisma.prisma = prismaClient;
}

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prismaClient;
