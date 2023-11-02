import React, { useState, useEffect } from "react";
import { fetchTickets } from "./apifetch";
import UserAvatar from "./UserAvatar";
import Column from "./Column";
import TitleCard from './TitleCard';

import { Button, Dropdown, Menu } from "antd";

import "antd/dist/reset.css";
import "./Board.css";

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [displayClicked, setDisplayClicked] = useState(false);

    const [groupingOption, setGroupingOption] = useState(
        localStorage.getItem("groupingOption") || "status"
    );
    const [sortedBy, setSortedBy] = useState(
        localStorage.getItem("sortedBy") || "priority"
    );

    useEffect(() => {
        async function fetchData() {
            const data = await fetchTickets();
            setTickets(data.tickets);
            setUsers(data.users);
        }
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("groupingOption", groupingOption);
    }, [groupingOption]);

    useEffect(() => {
        localStorage.setItem("sortedBy", sortedBy);
    }, [sortedBy]);

    const groupTicketsByOption = (tickets, option) => {
        const groupedTickets = {};
        tickets.forEach((ticket) => {
            let key;
            if (option === "status") {
                key = ticket.status;
            } else if (option === "user") {
                const user = users.find(user => user.id === ticket.userId);
                key = user ? user.name : 'Unknown';
            } else {
                key = ticket.priority;
            }
            if (!groupedTickets[key]) {
                groupedTickets[key] = [];
            }
            groupedTickets[key].push(ticket);
        });
        return groupedTickets;
    };

    const sortTicketsByOption = (groupedTickets, option) => {
        const sortedTickets = {};
        Object.keys(groupedTickets).forEach((groupTitle) => {
            const group = groupedTickets[groupTitle];
            sortedTickets[groupTitle] =
                option === "priority"
                    ? group.sort((a, b) => b.priority - a.priority)
                    : group.sort((a, b) => a.title.localeCompare(b.title));
        });
        return sortedTickets;
    };

    const groupedTickets = groupTicketsByOption(tickets, groupingOption);
    const sortedTickets = sortTicketsByOption(groupedTickets, sortedBy);

    const displayMenu = (
        <Menu>
            <Menu.ItemGroup title="Display By">
                <Menu.Item key="status" onClick={() => { setGroupingOption("status"); setDisplayClicked(true); }}>Status</Menu.Item>
                <Menu.Item key="user" onClick={() => { setGroupingOption("user"); setDisplayClicked(true); }}>User</Menu.Item>
                <Menu.Item key="priorityGroup" onClick={() => { setGroupingOption("priority"); setDisplayClicked(true); }}>Priority</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );

    const sortMenu = (
        <Menu>
            <Menu.ItemGroup title="Sort By">
                <Menu.Item key="priorityOrder" onClick={() => setSortedBy("priority")}>Priority</Menu.Item>
                <Menu.Item key="titleOrder" onClick={() => setSortedBy("title")}>Title</Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );

    return (
        <div className="kanban-board">
            <div className="options">
                <Dropdown overlay={displayMenu} trigger={['click']}>
                    <Button type="primary">
                        Display <i className="arrow down icon"></i>
                    </Button>
                </Dropdown>
                {displayClicked && (
                    <Dropdown overlay={sortMenu} trigger={['click']}>
                        <Button type="primary">
                            Sort By <i className="arrow down icon"></i>
                        </Button>
                    </Dropdown>
                )}
            </div>
            <div className="board-columns">
                {Object.keys(sortedTickets).map((groupTitle) => (
                    <Column key={groupTitle} title={groupTitle} tickets={sortedTickets[groupTitle]} users={users} />
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard
