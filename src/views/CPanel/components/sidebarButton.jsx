import React, { useEffect, useState} from 'react';
import {FaArrowLeft} from 'react-icons/fa';
export default function sidebarButton({setHideSidebar, hideSidebar}) {

    return (
            <FaArrowLeft
                size={28}
                className="absolute ml-3 mt-3 text-white border p-2 rounded-full hover:bg-white hover:text-violet-700 shadow transition-all cursor-pointer"
                onClick={() => {
                    if (hideSidebar) {
                        setHideSidebar(false);
                    } else {
                        setHideSidebar(true);
                    }
                }
                }
            />
    )
}