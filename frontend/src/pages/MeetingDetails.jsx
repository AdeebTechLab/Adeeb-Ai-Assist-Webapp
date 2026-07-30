import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Layout from "../layout/Layout";
import { getMeeting, deleteMeeting } from "../api/api";

function MeetingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMeeting();
  }, []);

  async function loadMeeting() {
    try {
      const data = await getMeeting(id);
      setMeeting(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this meeting?"
    );

    if (!confirmDelete) return;

    try {
      await deleteMeeting(id);

      alert("Meeting deleted successfully.");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Delete failed.");
    }
  }

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (!meeting) {
    return (
      <Layout>
        <p>Meeting not found.</p>

        <Link to="/">Back</Link>
      </Layout>
    );
  }

  return (
    <Layout>
      <Link
        to="/"
        className="text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold">
          {meeting.filename}
        </h1>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
        >
          Delete Meeting
        </button>
      </div>

      <p className="text-gray-500 mt-2">
        {new Date(meeting.created_at).toLocaleString()}
      </p>

      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold mb-3">
          AI Summary
        </h2>

        <p>{meeting.summary}</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold mb-3">
          Transcript
        </h2>

        <p className="whitespace-pre-wrap">
          {meeting.transcript}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mt-8">
        <h2 className="text-xl font-bold mb-3">
          Action Items
        </h2>

        <p className="whitespace-pre-wrap">
          {meeting.action_items}
        </p>
      </div>
    </Layout>
  );
}

export default MeetingDetails;