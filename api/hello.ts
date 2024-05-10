import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  console.log(req);
  res.status(200).json({ message: JSON.stringify(req.body) + JSON.stringify(req.query) });
}
