import React, { useState, useEffect } from 'react';

const AlertMessage = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!visible) return null;

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translateX(-50%)', zIndex: 1000, backgroundColor: '#ff0062', padding: '10px', borderRadius: '5px' }}>
            {message}
        </div>
    );
};

export default AlertMessage;
