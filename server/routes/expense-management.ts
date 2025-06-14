import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
const router = express.Router();

export type ExpenseCodesProps = {
  id: string;
  code: string;
  description: string;
};

export type CategoryProps = {
  id: string;
  name: string;
  title: string;
  expense_codes?: ExpenseCodesProps[];
};

const data = [
  {
    id: uuidv4(),
    name: "marketing",
    title: "Marketing Expenses",
    expense_codes: [
      {
        id: uuidv4(),
        code: "MKT001",
        description: "Google Ads",
      },
      {
        id: uuidv4(),
        code: "MKT002",
        description: "Facebook Ads",
      },
    ],
  },
  {
    id: uuidv4(),
    name: "travel",
    title: "Travel & Accommodation",
    expense_codes: [],
  },
];

router.get("/", (_, res: Response) => {
  res.send(data);
});

router.get("/:id", (req: Request, res: Response) => {
  const category = data.find((item) => item.id === req.params.id);
  if (!category) {
    res.status(404).send("category not found");
    return;
  }

  res.send(category);
});

router.post("/", (req: Request, res: Response) => {
  const { error } = validateCategory(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const existingName = data.find(
    (item) => item.name === req.body.name.toLowerCase()
  );

  if (existingName) {
    res.status(400).send("name already exists");
    return;
  }

  const category = {
    id: uuidv4(),
    name: req.body.name.toLowerCase(),
    title: req.body.title,
    expense_codes: [],
  };

  data.push(category);
  res.send(category);
});

router.post("/:id/expense-codes", (req: Request, res: Response) => {
  const { error } = validateExpenseCode(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const expenseCodes = {
    id: uuidv4(),
    code: req.body.code,
    description: req.body.description,
  };

  const idx = data.findIndex((item) => item.id === req.params.id);
  data[idx].expense_codes.push(expenseCodes);
  res.send(expenseCodes);
});

router.delete("/:id", (req: Request, res: Response) => {
  const category = data.find((item) => item.id === req.params.id);
  if (!category) {
    res.status(400).send("category does not exists");
    return;
  }
  const idx = data.indexOf(category);
  data.splice(idx, 1);
  res.send(category);
});

router.delete("/:id/expense-codes/:code", (req: Request, res: Response) => {
  const categoryIdx = data.findIndex((item) => item.id === req.params.id);
  if (categoryIdx < 0) {
    res.status(400).send("category does not exists");
    return;
  }

  const expenseCode = data[categoryIdx].expense_codes.find(
    (item) => item.code === req.params.code
  );
  const expenseCodeIdx = data[categoryIdx].expense_codes.findIndex(
    (item) => item.code === req.params.code
  );

  if (expenseCodeIdx < 0) {
    res.status(400).send("expense Code does not exists");
    return;
  }

  data[categoryIdx].expense_codes.splice(expenseCodeIdx, 1);
  res.send(expenseCode);
});

function validateCategory(categoryObj: CategoryProps) {
  const schema = Joi.object({
    name: Joi.string().required(),
    title: Joi.string().required(),
  });
  return schema.validate(categoryObj);
}

function validateExpenseCode(categoryObj: CategoryProps) {
  const schema = Joi.object({
    code: Joi.string().max(20).required(),
    description: Joi.string().required(),
  });
  return schema.validate(categoryObj);
}

export default router;
