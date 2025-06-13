import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (_, res: Response) => {
  res.send({ data: "hello from server" });
});

export default router;
