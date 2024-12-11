"use client";

import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../contexts/authContexts";

export default function Status({ title = "Status", onStatusChange }) {
  const { currentUser } = useAuth();
  const [showOverlay, setShowOverlay] = useState(false);
  const [company, setCompany] = useState("");
  const [job_title, setJobTitle] = useState("");
  const [job_link, setJobLink] = useState("");
  const [jobs, setJobs] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editStatus, setEditStatus] = useState('')
  const [editId, setEditId] = useState('')

  const handleOverlayToggle = () => {
    setIsEdit(false)
    setShowOverlay(!showOverlay);
  };

  let addJob = async () => {
    if(!isEdit){
      const job = {
        user_id: currentUser.uid,
        company: company,
        job_title: job_title,
        job_link: job_link,
        job_status: title,
      };
      try {
        const res = await addDoc(collection(db, "jobs"), job);
        console.log("Job added successfully");
        console.log(res.id);
        setShowOverlay(!showOverlay);
        fetchJobs(title);
      } catch (error) {
        console.log("Can not add job.");
        console.log(error);
      }
    }
    else{
      const job = {
        company: company,
        job_title: job_title,
        job_link: job_link,
        job_status: editStatus,
      };
      try {
        const jobRef = doc(db, "jobs", editId);
        const res = await updateDoc(jobRef, job);
        console.log("Job Edited successfully");
        setShowOverlay(!showOverlay);
        setIsEdit(false)
        onStatusChange();
      } catch (error) {
        console.log("Can not edit job.");
        console.log(error);
      }
    }
  };

  let fetchJobs = async (status) => {
    console.log("Fetching Jobs", status);
    try {
      const q = query(
        collection(db, "jobs"),
        where("job_status", "==", status),
        where('user_id',"==",currentUser.uid)
      );
      const res = await getDocs(q);
      const jobsList = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(jobsList);
      setJobs(jobsList);
    } catch (error) {
      console.log("Can not fetch jobs");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs(title);
  }, [title]);

  let editJob = (id, edit_company, edit_title, edit_link, edit_status) => {
    setIsEdit(true)
    setEditId(id)
    setCompany(edit_company)
    setJobTitle(edit_title)
    setJobLink(edit_link)
    setEditStatus(edit_status)
    setShowOverlay(!showOverlay)
  }

  let options = ["Applied", "Interviewed", "Hired", "Rejected"];

  return (
    <div className="min-h-screen bg-gray-200 rounded p-4">
      <div className="text-2xl font-bold text-gray-800 text-center mb-6">
        {title}
      </div>

      {/* Main Section */}
      <div>
        <button
          className="bg-gray-500 text-white rounded w-full h-12 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-gray-700"
          onClick={handleOverlayToggle}
        >
          +
        </button>

        {jobs.length !== 0 ? (
          <div className="mt-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 bg-white rounded-lg shadow-md mb-4 cursor-move"
                onClick={() => editJob(job.id, job.company, job.job_title, job.job_link, job.job_status)}
              >
                <h3 className="font-bold">{job.job_title}</h3>
                <p>{job.company}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <p className="text-gray-500">No jobs added yet.</p>
            </div>
          </div>
        )}

      </div>

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Job</h2>
            <label>Company</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Enter Company Name"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />
            <label>Job Title</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Enter Job Title"
              value={job_title}
              onChange={(event) => setJobTitle(event.target.value)}
              required
            />
            <label>Job Link</label>
            <input
              type="text"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Enter Job Link"
              value={job_link}
              onChange={(event) => setJobLink(event.target.value)}
              required
            />
            {
  isEdit ? (
    <div>
      <label className="block text-sm mb-2">Job Status</label>
      <select
        value={editStatus}
        onChange={(e) => setEditStatus(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      >
         {options
          .map((opt) => (
            <option key={opt} value={opt} className="text-sm text-gray-700">
              {opt}
            </option>
          ))}
      </select>
    </div>
  ) : null
}


            <button
              className="w-full bg-teal-500 text-white py-2 rounded-lg"
              onClick={addJob}
            >
              Add Job
            </button>
            <button
              className="w-full bg-red-500 text-white py-2 rounded-lg mt-2"
              onClick={handleOverlayToggle}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
