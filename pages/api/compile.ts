import type { NextApiRequest, NextApiResponse } from "next";
import { Isolate } from "isolated-vm";

interface ResponseData {
  result?: any;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    const iso = new Isolate({ memoryLimit: 128 });
    const context = await iso.createContext();
    const script = await iso.compileScript(code);

    const result = await script.run(context, { timeout: 1000 });

    res.status(200).json({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
}
