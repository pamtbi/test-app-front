// const base = "http://localhost:5000"

const base = "https://test-app-back.vercel.app";

export const link = (str: string) => {
  return `${base}${str}`
}