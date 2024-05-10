import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
    const { id } = req.query;
  console.log(req);
  res
    .status(200)
    .json({ message: "id: " + id});
}
