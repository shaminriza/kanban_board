import React, { useState } from 'react';
import './TitleCard.css';

function TitleCard({ title }) {
    const [isFullTitleVisible, setIsFullTitleVisible] = useState(false);

    const toggleFullTitle = () => {
        setIsFullTitleVisible(!isFullTitleVisible);
    }

    return (
        <div className="title-card" onClick={toggleFullTitle}>
            {title}
            {isFullTitleVisible && 
                <div className="full-title">
                    {title}
                </div>
            }
        </div>
    );
}

export default TitleCard;
