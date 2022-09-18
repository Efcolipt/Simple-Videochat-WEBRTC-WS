import React from "react";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import useTheme from "../../hooks/useTheme";

const ChatNavbar = () => {
    const [, setTheme] = useTheme();
    const { chat } = useContext(ChatContext);

    return (
        <div className="meeting-chat__navbar">
            <span>{chat.user?.displayName}</span>
            <div className="meeting-chat__navbar-icons">
                <svg
                    className="dark-theme"
                    onClick={() => setTheme("dark")}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="24px"
                    height="24px"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 0 1 8.646 3.646A9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646Z"
                    ></path>
                </svg>
                <svg
                    className="light-theme"
                    onClick={() => setTheme("light")}
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="24px"
                    height="24px"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z"
                    ></path>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M16 15L21 17V7L18.5 8M3 13V6.5C3 5.94772 3.44772 5.5 4 5.5H15C15.5523 5.5 16 5.94772 16 6.5V17.5C16 18.0523 15.5523 18.5 15 18.5H4C3.44772 18.5 3 18.0523 3 17.5V17"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    width="24px"
                    height="24px"
                    viewBox="0 0 328.5 328.5"
                >
                    <g>
                        <g>
                            <polygon points="96.333,150.918 96.333,135.918 55.667,135.918 55.667,95.251 40.667,95.251 40.667,135.918 0,135.918 0,150.918     40.667,150.918 40.667,191.583 55.667,191.583 55.667,150.918   " />
                            <path d="M259.383,185.941H145.858c-38.111,0-69.117,31.006-69.117,69.117v39.928H328.5v-39.928    C328.5,216.948,297.494,185.941,259.383,185.941z M313.5,279.987H91.741v-24.928c0-29.84,24.276-54.117,54.117-54.117h113.524    c29.84,0,54.117,24.277,54.117,54.117L313.5,279.987L313.5,279.987z" />
                            <path d="M202.621,178.84c40.066,0,72.662-32.597,72.662-72.663s-32.596-72.663-72.662-72.663s-72.663,32.596-72.663,72.663    S162.555,178.84,202.621,178.84z M202.621,48.515c31.795,0,57.662,25.867,57.662,57.663s-25.867,57.663-57.662,57.663    c-31.796,0-57.663-25.868-57.663-57.663S170.825,48.515,202.621,48.515z" />
                        </g>
                    </g>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 210 210"
                >
                    <g id="XMLID_27_">
                        <path
                            id="XMLID_28_"
                            d="M25,80C11.215,80,0,91.215,0,105s11.215,25,25,25c13.785,0,25-11.215,25-25S38.785,80,25,80z"
                        />
                        <path
                            id="XMLID_30_"
                            d="M105,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S118.785,80,105,80z"
                        />
                        <path
                            id="XMLID_71_"
                            d="M185,80c-13.785,0-25,11.215-25,25s11.215,25,25,25c13.785,0,25-11.215,25-25S198.785,80,185,80z"
                        />
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default ChatNavbar;
