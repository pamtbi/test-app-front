/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const post = async (url: string, data: any): Promise<{ response: Response | null; data: any }> => {
  try {
    const token = localStorage.getItem('token');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    const json = await response.json();

    return {
      response,
      data: json,
    };
  } catch (error) {
    console.error(error);
    return {
      response: null,
      data: null,
    };
  }
};
