import { useEffect, useState, useCallback } from "react"
import parse from "html-react-parser";

const card = {
    margin: 50,
    padding: 20,
    boxShadow: "0 0 10px black",
    borderRadius: "5px"
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [dateRange, setDateRange] = useState("");

    const getJobs = useCallback(() => {
        fetch("http://localhost:8080/jobs"+dateRange)
        .then(r => {
            if (r.status === 200) return r.json();
        })
        .then(r => {
            setJobs(r);
        })
    }, [dateRange])

    const toggleRecentJobs = () => {
        if (!dateRange) setDateRange("?posting_date_range=7d");
        else setDateRange("");
    }

    useEffect(() => {
        getJobs();
    }, [getJobs])

    return <>
        <h1 style={{ margin: 50 }}>Jobs</h1>
        <button style={{ margin: "0 50px" }} onClick={toggleRecentJobs}>View {!dateRange ? "recent" : "all"} jobs</button>
        <div>
            {jobs && jobs.map(job => <div key={job.jobId} style={card}>
                <p><b>Title: </b>{job.jobTitle}</p>
                <p><b>Created at: </b>{job.postedDate}</p>
                <p><b>Company: </b>{job.companyName}</p>
                <p><b>Description: </b></p>
                {parse(job.jobDescription)}
            </div>)}
        </div>
    </>
}

export default Jobs;
