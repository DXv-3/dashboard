
import React from 'react';

const SynapseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 2a10 10 0 0 0-3.53 19.46"></path>
        <path d="M12 22a10 10 0 0 0 3.53-19.46"></path>
        <path d="M2 12a10 10 0 0 1 19.46-3.53"></path>
        <path d="M22 12a10 10 0 0 1-19.46 3.53"></path>
    </svg>
);

export default SynapseIcon;
