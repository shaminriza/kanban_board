import React from "react";
import './card.css';
import { Card, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

function CardComponent({ title, description, userInitials, taskId }) {
    return (
        <Card className="card" bordered={false}>
            <div className="card-header">
                <div className="card-avatar">
                    <span className="user-initials">{userInitials ? userInitials : ""}</span>
                </div>
                <span className="task-id">Task ID: {taskId}</span>
            </div>
            <div className="card-body">
                <h5 className="card-title">
                    <CheckCircleOutlined style={{ marginRight: "5px", color: "#52c41a" }} />
                   
                    <Tooltip title={title}>
                        <span className="title-text">{title}</span>
                    </Tooltip>
                </h5>
                <p className="card-text">
                    <ExclamationCircleOutlined style={{ marginRight: "5px", color: "#faad14" }} />
                    {description}
                </p>
            </div>
        </Card>
    );
}

export default CardComponent;
