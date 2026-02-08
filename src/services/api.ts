const API_BASE_URL = 'http://localhost:5076/api/v1';

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
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const api = {
    async createOrUpdateStudent(data: StudentRequest): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API request failed');
        }

        return response.json();
    },

    async getDraft(draftToken: string): Promise<ApiResponse<any>> {
        const response = await fetch(`${API_BASE_URL}/students/draft/${draftToken}`);

        if (!response.ok) {
            if (response.status === 404) return { success: false, message: 'Draft not found', data: null };
            throw new Error('Failed to fetch draft');
        }

        return response.json();
    }
};
