const API_BASE_URL = 'http://localhost:5076/api/v1';

const getHeaders = () => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export interface StudentRequest {
    name: string;
    email: string;
    phone: string;
    fromCountry?: string;
    lastAcademicLevel?: string;
    draftToken?: string;
    isSubmitted: boolean;
    source: string;
    subject?: string;
    message?: string;
    purpose?: string;
    universityId?: string;
    courseId?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

const handleResponse = async (response: Response) => {
    if (!response.ok) {
        let errorMessage = 'API request failed';
        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
            // Fallback for non-JSON or malformed error responses
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

export const api = {
    async createOrUpdateStudent(data: StudentRequest): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/students`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async getDraft(draftToken: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/students/draft/${draftToken}`);
        if (response.status === 404) return { success: false, message: 'Draft not found', data: null };
        return handleResponse(response);
    },

    async login(request: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
        });

        const data = await handleResponse(response);
        if (data.success && data.data.token) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify({
                name: data.data.name,
                email: data.data.email,
                role: data.data.role
            }));
        }
        return data;
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    async getSettings(): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/settings`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    async updateSettings(settings: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/settings`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(settings),
        });
        return handleResponse(response);
    },

    // Universities
    async getUniversities(admin = false): Promise<ApiResponse<any[]>> {
        const url = admin ? `${API_BASE_URL}/universities/all` : `${API_BASE_URL}/universities`;
        const response = await fetch(url, { headers: getHeaders() });
        return handleResponse(response);
    },

    async createUniversity(data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/universities`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async updateUniversity(id: string, data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/universities/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async deleteUniversity(id: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/universities/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    // Courses
    async getCourses(admin = false): Promise<ApiResponse<any[]>> {
        const url = admin ? `${API_BASE_URL}/courses/all` : `${API_BASE_URL}/courses`;
        const response = await fetch(url, { headers: getHeaders() });
        return handleResponse(response);
    },

    async createCourse(data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async updateCourse(id: string, data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async deleteCourse(id: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    // Blogs
    async getBlogs(admin = false): Promise<ApiResponse<any[]>> {
        const url = admin ? `${API_BASE_URL}/blogs/all` : `${API_BASE_URL}/blogs`;
        const response = await fetch(url, { headers: getHeaders() });
        return handleResponse(response);
    },

    async createBlog(data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/blogs`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async updateBlog(id: string, data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async deleteBlog(id: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    // Services
    async getServices(admin = false): Promise<ApiResponse<any[]>> {
        const url = admin ? `${API_BASE_URL}/services/all` : `${API_BASE_URL}/services`;
        const response = await fetch(url, { headers: getHeaders() });
        return handleResponse(response);
    },

    async createService(data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/services`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async updateService(id: string, data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async deleteService(id: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/services/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    // Students & Contacts
    async getStudents(page = 1, pageSize = 20): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/students?page=${page}&pageSize=${pageSize}`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    async getContacts(page = 1, pageSize = 20): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/students/contacts?page=${page}&pageSize=${pageSize}`, {
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    async markContacted(id: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/students/${id}/mark-contacted`, {
            method: 'PUT',
            headers: getHeaders(),
        });
        return handleResponse(response);
    },

    async updateStudentStatus(id: string, status: { isRead?: boolean, isDone?: boolean }): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/students/${id}/status`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(status)
        });
        return handleResponse(response);
    },

    async updateContactStatus(id: string, status: { isRead?: boolean, isDone?: boolean }): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/students/contacts/${id}/status`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(status)
        });
        return handleResponse(response);
    },

    // Users (Admin Only)
    async getUsers(): Promise<ApiResponse<any[]>> {
        const response = await fetch(`${API_BASE_URL}/users`, { headers: getHeaders() });
        return handleResponse(response);
    },

    async createUser(data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async updateUser(id: string, data: any): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    },

    async deleteUser(id: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        return handleResponse(response);
    }
};
