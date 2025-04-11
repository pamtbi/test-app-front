import {link} from "@/utils/link"
import {get} from "@/utils/get"

export type questionType = {
  question: string;
  options: string[];
}[]

export const getQuizQuestions = async (token: string | null | undefined): Promise<questionType> => {
  if(!token) return [];

  const { response, data } = await get(link('/api/quiz'), token);

  if (!response?.ok) {
    throw new Error('Failed to fetch quiz questions');
  }

  return data;
}