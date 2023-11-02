import React from "react";
import CardComponent from "./Card";
import UserAvatar from "./UserAvatar";
import { CheckCircleOutlined } from "@ant-design/icons";

const Ticket = ({ ticket, users }) => {
  // Extract ticket details
  const { id, title, userId, priority, tag } = ticket;

  // Find the assigned user for the ticket
  const assignedUser = users.find(user => user.id === userId);

  return (
    <CardComponent
      title={title}  // Only display the title here
      taskId={`Task: ${id}`}  // Display the task ID separately
      description={
        <>
          {/* Display UserAvatar */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <UserAvatar user={assignedUser} />
            {tag[0]}
          </div>

          <span style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            {/* Displaying priority with the CheckCircleOutlined for now. Adjust as needed. */}
            <CheckCircleOutlined style={{ marginRight: "5px", color: priority > 2 ? "#faad14" : "#52c41a" }} />
            Priority: {priority}
          </span>
        </>
      }
    />
  );
};

export default Ticket;
