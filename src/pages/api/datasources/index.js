import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { prismaClient } from "../../../lib/prisma";

const chatbotsHandler = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);
  const user = await prismaClient.user.findUnique({
    where: { email: session.user.email },
  });

  if (request.method === "GET") {
    const data = await prismaClient.datasource.findMany({
      where: {
        userId: {
          equals: user.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return response.status(200).json({
      success: true,
      data,
    });
  }

  if (request.method === "POST") {
    const chatbot = await prismaClient.datasource.create({
      data: {
        userId: user.id,
        ...request.body,
      },
    });

    return response.status(200).json({ sucess: true, data: chatbot });
  }
};

export default chatbotsHandler;
