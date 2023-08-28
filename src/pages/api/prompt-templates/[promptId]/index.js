import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { prismaClient } from "../../../../lib/prisma";

const promptTemplateHandler = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);
  const { promptId } = request.query;

  if (!session) {
    return response
      .status(403)
      .json({ success: false, error: "Not authenticated" });
  }

  if (request.method === "DELETE") {
    const data = await prismaClient.promptTemplate.delete({
      where: {
        id: parseInt(promptId),
      },
    });

    return response.status(200).json({
      success: true,
      data,
    });
  }

  if (request.method === "PATCH") {
    const data = await prismaClient.promptTemplate.update({
      where: {
        id: parseInt(promptId),
      },
      data: { ...request.body },
    });

    return response.status(200).json({
      success: true,
      data,
    });
  }
};

export default promptTemplateHandler;
