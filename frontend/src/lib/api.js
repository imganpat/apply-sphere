const BASE_URL = "http://localhost:8000/";

const getToken = () => localStorage.getItem("access_token");

const request = async (endpoint, options= {}) => {
    const headers = {
        "Content-Type": "application/json",
        ...(getToken() && {Authorization: `Bearer ${getToken()}`}),
        ...options.headers,
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if(res.status === 401) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login/";
        return;
    }

    if(res.status === 204) {
        return null; // No content
    }

    const data = await res.json();

    if(!res.ok){
        throw new Error(data?.detail || JSON.stringify(data) || "Something went wrong");
    }

    return data;
}


// Auth

export const registerUser = (userData) => {
    request("api/register/", {
        method: "POST",
        body: JSON.stringify(userData),
    });
}

export const loginUser = (credentials) => {
    return request("api/login/", {
        method: "POST",
        body: JSON.stringify(credentials),
    });
}

export const refreshToken = (refreshToken) => {
    return request("api/token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
    });
}

// Jobs

export const getJobs = () => request("api/jobs/");

export const createJob = (jobData) => {
    request("api/jobs/", {
        method: "POST",
        body: JSON.stringify(jobData),
    })
}

export const deleteJob = (jobId) => {
    request(`api/jobs/${jobId}/`, {
        method: "DELETE",
    })
}
