import React, { createContext } from 'react';

export interface QuizPreviewContextType {
  answers: string[][];
  taggedQuestions: number[];
  updateTaggedQuestion: (questionIndex: number) => void;
}

export const QuizPreviewContext = createContext<QuizPreviewContextType | null>(
  null
);

interface QuizPreviewProviderProps {
  children: React.ReactNode;
  value: QuizPreviewContextType;
}

export function QuizPreviewProvider({
  children,
  value,
}: QuizPreviewProviderProps) {
  return (
    <QuizPreviewContext.Provider value={value}>
      {children}
    </QuizPreviewContext.Provider>
  );
}
