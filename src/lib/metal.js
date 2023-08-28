import Metal from "@getmetal/metal-sdk";
import { MetalRetriever } from "langchain/retrievers/metal";

export const useMetal = () => {
  const client = new Metal(
    process.env.METAL_API_KEY,
    process.env.METAL_CLIENT_ID,
    process.env.METAL_INDEX_ID
  );

  const retriever = new MetalRetriever({ client });

  return { retriever };
};
