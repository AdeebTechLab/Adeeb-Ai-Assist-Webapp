import { useRef, useState } from "react";
import { FaCloudUploadAlt, FaFileAudio } from "react-icons/fa";
import api from "../api/api";

function UploadBox({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (onSuccess) {
        onSuccess(response.data);
      }

      alert("Meeting processed successfully!");

      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

      <div className="flex justify-center">
        <FaCloudUploadAlt
          size={70}
          className="text-blue-600"
        />
      </div>

      <h2 className="text-2xl font-bold text-center mt-4">
        Upload Meeting Audio
      </h2>

      <p className="text-center text-gray-500 mt-2">
        Supported formats: MP3 • WAV • M4A
      </p>

      <div className="mt-6 border-2 border-dashed border-blue-300 rounded-xl p-8 text-center">

        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav,.m4a"
          className="hidden"
          id="audio-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label
          htmlFor="audio-upload"
          className="cursor-pointer"
        >
          <FaFileAudio
            size={50}
            className="mx-auto text-gray-500"
          />

          <p className="mt-4 text-lg font-medium">
            Click to choose audio
          </p>

          <p className="text-gray-500 text-sm mt-2">
            or drag & drop (coming soon)
          </p>
        </label>

      </div>

      {file && (
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <p className="font-semibold">
            Selected File
          </p>

          <p className="text-blue-700 mt-1">
            {file.name}
          </p>
        </div>
      )}

      <button
        onClick={uploadFile}
        disabled={loading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:bg-gray-400"
      >
        {loading ? " AI Processing..." : " Upload & Process Meeting"}
      </button>

    </div>
  );
}

export default UploadBox;