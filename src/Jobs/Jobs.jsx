import { useEffect, useState } from "react"
import parse from "html-react-parser";

const card = {
    margin: 50,
    padding: 20,
    boxShadow: "0 0 10px black",
    borderRadius: "5px"
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/jobs")
        .then(r => {
            if (r.status === 200) return r.json();
        })
        .then(r => {
            if (!jobs.length) setJobs(r.jobs);
        })
    })

    return <>
        <h1 style={{ margin: 50 }}>Jobs</h1>
        <div>
            {jobs && jobs.map(job => <div key={job.jobId} style={card}>
                <p><b>Title: </b>{job.jobTitle}</p>
                <p><b>Company: </b>{job.companyName}</p>
                <p><b>Description: </b></p>
                {parse(job.jobDescription)}
            </div>)}
        </div>
    </>
}

export default Jobs;
