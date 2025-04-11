

export const asyncScript = async (src: string) => {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};