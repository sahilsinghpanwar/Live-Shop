import { useState, useCallback } from "react";
import { Persona, QuizState } from "../types/persona";
import { PERSONAS, QUIZ_QUESTIONS, TIEBREAKER_PRIORITY } from "../data/personas";

export function usePersonaQuiz() {
  const [state, setState] = useState<QuizState>({
    phase: "intro",
    currentQuestion: 0,
    answers: [],
    result: null
  });

  const startQuiz = useCallback(() => {
    setState({
      phase: "quiz",
      currentQuestion: 0,
      answers: [],
      result: null
    });
  }, []);

  const resetQuiz = useCallback(() => {
    setState({
      phase: "intro",
      currentQuestion: 0,
      answers: [],
      result: null
    });
  }, []);

  const calculateResult = (answers: string[]): Persona => {
    const scoreTally: Record<string, number> = {
      midnight_splurger: 0,
      flash_drop_hunter: 0,
      glow_curator: 0,
      fit_archivist: 0,
      research_rat: 0,
      hype_chaser: 0
    };

    answers.forEach((selectedOptionId, questionIdx) => {
      const question = QUIZ_QUESTIONS[questionIdx];
      const option = question.options.find((o) => o.id === selectedOptionId);
      if (option && option.scores) {
        Object.entries(option.scores).forEach(([personaId, score]) => {
          scoreTally[personaId] = (scoreTally[personaId] || 0) + (score || 0);
        });
      }
    });

    let highestScore = -1;
    let winningPersonaId = "";

    Object.entries(scoreTally).forEach(([personaId, score]) => {
      if (score > highestScore) {
        highestScore = score;
        winningPersonaId = personaId;
      } else if (score === highestScore) {
        // TIEBREAKER PRIORITY: lower index means higher priority
        const currentWinnerIdx = TIEBREAKER_PRIORITY.indexOf(winningPersonaId as any);
        const challengerIdx = TIEBREAKER_PRIORITY.indexOf(personaId as any);
        if (winningPersonaId === "" || challengerIdx < currentWinnerIdx) {
          winningPersonaId = personaId;
        }
      }
    });

    return PERSONAS[winningPersonaId] || PERSONAS.hype_chaser;
  };

  const selectOption = useCallback((optionId: string) => {
    setState((prev) => {
      const nextAnswers = [...prev.answers, optionId];
      const isLastQuestion = prev.currentQuestion >= QUIZ_QUESTIONS.length - 1;

      if (isLastQuestion) {
        // Run calculating bridge screen
        setTimeout(() => {
          const finalResult = calculateResult(nextAnswers);
          setState((s) => ({
            ...s,
            phase: "result",
            result: finalResult
          }));
        }, 1000);

        return {
          ...prev,
          answers: nextAnswers,
          phase: "calculating"
        };
      } else {
        return {
          ...prev,
          answers: nextAnswers,
          currentQuestion: prev.currentQuestion + 1
        };
      }
    });
  }, []);

  return {
    phase: state.phase,
    currentQuestion: state.currentQuestion,
    answers: state.answers,
    result: state.result,
    startQuiz,
    resetQuiz,
    selectOption
  };
}
