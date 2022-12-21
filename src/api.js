
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/jobs", cors(corsOptions), async (req, res) => {
  const postingDateRange = req.query.posting_date_range || "";
  const numJobs = req.query.num_jobs || 10;

  const response = await axios.post("https://www.zippia.com/api/jobs/", {
    companySkills: true,
    dismissedListingHashes: [],
    fetchJobDesc: true,
    jobTitle: "Business Analyst",
    postingDateRange,
    locations: [],
    numJobs,
    previousListingHashes: [],
  });
  res.send(response.data).status(200);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});
