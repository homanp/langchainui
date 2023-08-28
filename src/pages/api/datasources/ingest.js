import ky from "ky";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import Metal from "@getmetal/metal-sdk";
import { v4 as uuidv4 } from "uuid";

const datasourceIngestHandler = async (request, response) => {
  const { url, type } = request.body;
  const blob = await ky(url).blob();
  const loader = new CSVLoader(blob);
  const docs = await loader.load();
  const texts = docs.map((doc) => doc.pageContent);
  const metadata = { url, type, id: uuidv4() };

  const metal = new Metal(
    process.env.METAL_API_KEY,
    process.env.METAL_CLIENT_ID,
    process.env.METAL_INDEX_ID
  );

  await Promise.all(texts.map((text) => metal.index({ text, metadata })));

  response.status(200).json({ success: true, data: { metadata } });
};

export default datasourceIngestHandler;
