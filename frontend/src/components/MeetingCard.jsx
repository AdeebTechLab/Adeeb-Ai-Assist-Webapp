function MeetingCard({ meeting }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
                background: "#fff",
            }}
        >
            <h3>{meeting.filename}</h3>

            <p>
                <strong>Summary:</strong>
            </p>

            <p>{meeting.summary}</p>

            <small>
                {meeting.created_at}
            </small>
        </div>
    );
}

export default MeetingCard;