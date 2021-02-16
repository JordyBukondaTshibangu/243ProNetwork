import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const JobContext = createContext()

let jobObject = {
    _id: "",
    title: "",
    applicants: 0,
    jobType: "",
    salary: 0,
    views : 0,
    country: "",
    author: "",
    email: "",
    phone: "",
    content: "",
    date: " ",
    address: "",
    socialmedialink : [],
    overview : "",
    total_employee : 0,
}

const JobContextProvider = (props) => {

    const [ jobs, setJobs ] = useState([jobObject])
    const [ topJobs , setTopJobs ] = useState([jobObject])
    const [ loadingJobs , setLoadingJobs ] = useState(false)
    const [ mostViewed, setMostViewed ] = useState([jobObject])
    const [ loadingTopJobs , setLoadingTopJobs ] = useState(false)
    const [ loadingMostViewed , setLoadingMostViewed] = useState(false)
    const [onSuccess, setOnSuccess ] = useState(false)
    const [onFailure, setOnFailure ] = useState(false)

    useEffect(() => {
        axios.get('/jobs')
            .then(res => {
                    const jobList = res.data.jobs
                    
                    setJobs(jobList)

                    setLoadingJobs(true)
                    
                    const sortedTopJobs = jobList.sort((a, b) => (a.salary < b.salary) ? 1 : -1)
                    const topJobsList = sortedTopJobs.slice(0, 5)
                    setTopJobs(topJobsList)
                    setLoadingTopJobs(true)

                    const sortedMostViewed = jobList.sort((a, b) => (a.views < b.views) ? 1 : -1)
                    const MostViewedJobsList = sortedMostViewed.slice(0, 5)
                    setMostViewed(MostViewedJobsList)
                    setLoadingMostViewed(true)
            })

    }, [])

    const handleTitle = (event) => {
        event.preventDefault()
        const value = event.target.value

        const searchValue = value.toLowerCase()
        const filteredCharacters = jobs.filter(character => {
            return (
              character.title.toLowerCase().includes(searchValue) 
            );
          });
          setJobs(filteredCharacters)


    }
    const handlePartTime = (event) => {
        event.preventDefault()
        const filteredCharacters = jobs.filter(character => {
            return (
              character.jobType.toLocaleLowerCase() === 'part-time'
            );
          });
          setJobs(filteredCharacters)
    }
    const handleFullTime = (event) => {
        event.preventDefault()
        const filteredCharacters = jobs.filter(character => {
            return (
              character.jobType.toLocaleLowerCase() === 'full-time'
            );
          });
          setJobs(filteredCharacters)
    }
    const handlePostDuration = (event) => {
        event.preventDefault()
        const value = event.target.value
        
        if(value === 'recent'){
            const sortedRecentJobs = jobs
            setJobs(sortedRecentJobs)
        } else if(value === 'old'){
            let sortedOldJobs = (jobs) => [...jobs].map(jobs.pop, jobs);
            setJobs(sortedOldJobs)
        }

    }
    const handleCountry = (event) => {
        
        const country = event 
        const searchValue = country.toLowerCase()
        const filteredCharacters = jobs.filter(character => {
            return (
              character.country.toLowerCase().includes(searchValue) 
            );
          });
          setJobs(filteredCharacters)
    }
    const addJob = async(title, applicants, jobType,salary,views, country, author, email, phone, content, address,overview , total_employee) => {

        const newJob = { 
            title, 
            applicants, 
            jobType, salary, 
            views, 
            country, author, email, phone, content, address, overview , total_employee,
        }
        try {

            await axios.post('/jobs', newJob)

            setOnSuccess(true)
            setTimeout(() => setOnSuccess(false), 15000)

        }catch(error){
                setOnFailure(true)
                setTimeout(() => setOnFailure(false), 15000)
        }
    }
    const updateJob = async(jobId,job_title, job_jobType, job_salary, job_country, job_author, job_email, job_phone, job_content, job_address,job_overview , job_total_employee) => {
        
        const updatedJob = { 
            title : job_title, 
            jobType : job_jobType, 
            salary : job_salary, 
            country : job_country,
            author : job_author,
            email : job_email,
            phone : job_phone,
            content : job_content,
            address : job_address,
            overview : job_overview,
            total_employee : job_total_employee
        }
            try{
                const res = await axios.patch(`/jobs/${jobId}`, updatedJob)

                setOnSuccess(true)
                setTimeout(() => setOnSuccess(false), 15000)

            }catch(error){
                 setOnFailure(true)
                 setTimeout(() => setOnFailure(false), 15000)
             }
    }
    
    return ( 
        <JobContext.Provider value={{
                                        jobs, loadingJobs, topJobs, loadingTopJobs,  mostViewed,
                                        loadingMostViewed, addJob, onSuccess, onFailure, 
                                        updateJob,
                                        handleTitle, handleCountry, handleFullTime, handlePartTime, handlePostDuration }}> 
            {props.children}
        </JobContext.Provider>
     );
}
 
export default JobContextProvider;