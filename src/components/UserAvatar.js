import React from "react";

const UserAvatar = ({ user }) => {
    // Function to get default avatar based on user's name
    const defaultAvatar = user => 
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=30&rounded=true&background=dedede&color=333`;

    const avatarUrl = user && user.image ? user.image : defaultAvatar(user);

    const styles = {
        container: {
            position: 'relative',
            width: '30px',
            height: '30px',
            display: 'inline-block'
        },
        avatar: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#dedede', // Placeholder color
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${avatarUrl})`
        },
        status: {
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: user.available ? '#4caf50' : '#f44336' 
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.avatar}></div>
            <div style={styles.status}></div>
        </div>
    );
};

export default UserAvatar;
