import Joi from "joi";

export const transactionSchema = Joi.object({
  title: Joi.string().max(100).required(),
  amount: Joi.number().precision(2).positive().required(),
  type: Joi.string().valid("income", "expense").required(),
  category: Joi.string().valid(
    "Food","Travel","Bills","Shopping","Health","Entertainment","Other"
  ).required(),
  date: Joi.string().required()
});
