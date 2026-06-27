import React from "react";

export async function refreshRequest(url, options={}) {

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        return {
            success: false,
            message: 'refreshToken not found'
        }
    }
    try {

    const response = await fetch(`http://localhost:6050/auth/refresh`, {

        method:`POST`,
        headers: {
            'Content-Type':'application/json',
            'X-Refresh-Token': refreshToken
        }
    })

    if (!response.ok) {
        throw new Error(`Internal server error`);
    }

    const data = await response.json();

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

} catch(err) {
    return {
        success: false,
        message: err.message
    }
};
}