import React, { useEffect } from 'react';

const SharedLandingPage = ({ html_code, css_code }) => {
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = css_code;
        document.head.appendChild(styleElement);
        return () => {
            document.head.removeChild(styleElement);
        };
    }, [css_code]);

    return (
        <div className="min-h-screen w-full">
            <div
                dangerouslySetInnerHTML={{ __html: html_code }}
                className="w-full"
            />
        </div>
    );
};

export default SharedLandingPage;
