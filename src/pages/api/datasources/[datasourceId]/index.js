import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
import { prismaClient } from "../../../../lib/prisma";

const datasourceHandler = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);
  const { datasourceId } = request.query;

  if (!session) {
    return response
      .status(403)
      .json({ success: false, error: "Not authenticated" });
  }

  if (request.method === "DELETE") {
    const data = await prismaClient.datasource.delete({
      where: {
        id: parseInt(datasourceId),
      },
    });

    return response.status(200).json({
      success: true,
      data,
    });
  }

  if (request.method === "PATCH") {
    const data = await prismaClient.datasource.update({
      where: {
        id: parseInt(datasourceId),
      },
      data: { ...request.body },
    });

    return response.status(200).json({
      success: true,
      data,
    });
  }
};

export default datasourceHandler;
