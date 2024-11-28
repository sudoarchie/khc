import express from "express";
import {
  CreateCountry,
  GetAll,
  GetAllCountry,
} from "../services/countryService";
import { AuthAdmin } from "../middlewares/adminauthmiddleware";
import { z } from "zod";

const countryRouter = express.Router();

countryRouter.get("/", async (req, res) => {
  try {
    const response = await GetAllCountry();
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(403).json({
      msg: `Unable to Fetch data!! ${error}`,
    });
  }
});
const CountrySchema = z.string();
countryRouter.post("/", AuthAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const validate = CountrySchema.safeParse(name);
    if (!validate.success) {
      res.status(400).json({
        msg: `Invalid Input!! `,
      });
    } else {
      const response = await CreateCountry(name);
      res.status(200).json({
        msg: `Country Created successfully!!`,
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: `Unable to Create Country ${error}`,
    });
  }
});
countryRouter.get("/all", async (req, res) => {
  try {
    const data = await GetAll();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(403).json({
      msg: error,
    });
  }
});

export default countryRouter;
