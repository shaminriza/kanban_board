import React from "react";
import Ticket from "./Ticket";
import "./Column.css";

const Column = ({ title, tickets, users }) => {
  return (
    <div className="boardColumn">
      <h2>
        {title} <span>{tickets.length}</span>
      </h2>
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} users={users} />
      ))}
    </div>
  );
};

export default Column;
