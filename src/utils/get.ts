/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const get = async (url: string, token?: string | null): Promise<{ response: Response | null; data: any }> => {
  try {
    const jwt = token ?? localStorage.getItem('token');

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (jwt) {
      headers['Authorization'] = `Bearer ${jwt}`;
    }

    const response = await fetch(url, {
      headers: headers,
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
