import Layout from "../layout/Layout";
import UploadBox from "../components/UploadBox";

function UploadMeeting() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">
        Upload Meeting
      </h1>

      <UploadBox />
    </Layout>
  );
}

export default UploadMeeting;