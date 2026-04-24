const BASE_URL = "http://localhost:8000/";

const getToken = () => localStorage.getItem("access_token");

const request = async (endpoint, options = {}, isRetry = false) => {
    const headers = {
        "Content-Type": "application/json",
        ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
        ...options.headers,
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (res.status === 401 && !isRetry) {
        const refresh = localStorage.getItem("refresh_token");
        if (refresh) {
            try {
                const data = await refreshToken(refresh);
                localStorage.setItem("access_token", data.access);

                return request(endpoint, options);
            } catch (err) {
                localStorage.clear();
                window.location.href = "/login/";
            }
        } else {
            window.location.href = "/login/";
        }
    }

    if (res.status === 204) {
        return null; // No content
    }

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data?.detail || JSON.stringify(data) || "Something went wrong");
    }

    return data;
}


// Auth

export const registerUser = (userData) => {
    return request("api/register/", {
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
    return request("api/jobs/", {
        method: "POST",
        body: JSON.stringify(jobData),
    });
}

export const updateApplication = (id, jobData) => {
    return request(`api/jobs/${id}/`, {
        method: "PUT",
        body: JSON.stringify(jobData),
    })
}

export const deleteJob = (jobId) => {
    return request(`api/jobs/${jobId}/`, {
        method: "DELETE",
    })
}
