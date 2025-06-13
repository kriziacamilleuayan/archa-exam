import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (_, res: Response) => {
  res.send({
    data: [
      {
        id: 1,
        name: "marketing",
        title: "Marketing Expenses",
        expense_codes: [
          {
            code: "MKT001",
            description: "Google Ads",
          },
          {
            code: "MKT002",
            description: "Facebook Ads",
          },
        ],
      },
      {
        id: 2,
        name: "travel",
        title: "Travel & Accommodation",
        expense_codes: [],
      },
    ],
  });
});

export default router;
