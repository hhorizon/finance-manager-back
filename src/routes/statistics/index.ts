import express from "express";

import { getStatisticsForPeriod } from "../../controllers/statistics";
import { errorWrapper, guard } from "../../middlewares";

const router = express.Router();

router.get("/", guard, errorWrapper(getStatisticsForPeriod));

export default router;
