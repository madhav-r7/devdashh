import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { DIAGNOSTIC_QUIZZES } from '../data/mockData';

export default function DiagnosticQuizModal({ isOpen, onClose, skillId = 'sql', onQuizCompleted }) {
  if (!isOpen) return null;

  const quizData = DIAGNOSTIC_QUIZZES[skillId] || DIAGNOSTIC_QUIZZES['sql'];
  const questions = quizData.questions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIdx];
  const selectedOption = selectedAnswers[currentIdx];

  const handleSelectOption = (optIdx) => {
    if (showExplanation || isFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const handleFinishAndAdapt = () => {
    const score = calculateScore();
    onQuizCompleted({
      skillId,
      score,
      totalQuestions: questions.length
    });
    onClose();
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-lg bg-[#0a0a0d] border border-white/[0.14] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.12] flex items-center justify-between bg-white/[0.04]">
          <div>
            <div className="text-[10px] font-mono text-white/80 uppercase tracking-wider font-semibold">
              {quizData.skillName} · DIAGNOSTIC ASSESSMENT
            </div>
            <h3 className="text-base font-bold text-white font-display uppercase tracking-wide mt-0.5">
              {quizData.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.16] flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Technical Progress Bar */}
        <div className="w-full bg-white/[0.1] h-1">
          <div 
            className="bg-white h-full transition-all duration-300 shadow-[0_0_8px_#ffffff]"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 custom-scrollbar">
          
          {!isFinished ? (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between text-xs font-mono text-white">
                <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
                <span className="text-white font-bold">SINGLE CHOICE AUDIT</span>
              </div>

              <h4 className="text-sm sm:text-base font-semibold text-white leading-relaxed font-display">
                {currentQ.question}
              </h4>

              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isChosen = selectedOption === optIdx;
                  const isCorrect = optIdx === currentQ.correctIndex;
                  
                  let optStyle = "bg-white/[0.05] border-white/[0.16] hover:border-white/50 text-white hover:bg-white/[0.1]";
                  if (showExplanation) {
                    if (isCorrect) {
                      optStyle = "bg-white text-black font-bold border-white shadow-[0_0_18px_rgba(255,255,255,0.35)]";
                    } else if (isChosen && !isCorrect) {
                      optStyle = "bg-white/[0.05] border-white/20 text-white/50 line-through";
                    } else {
                      optStyle = "bg-white/[0.02] border-white/[0.08] text-white/40 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={showExplanation}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all flex items-center justify-between font-body ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {showExplanation && isCorrect && (
                        <Check className="w-4 h-4 text-black stroke-[3] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div className="p-4 rounded-xl bg-white/[0.06] border border-white/[0.18] text-xs space-y-1.5 animate-fadeIn">
                  <div className="text-[10px] font-mono text-white font-bold uppercase tracking-wider">
                    EXPLANATION
                  </div>
                  <p className="text-white/90 leading-relaxed font-body">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

            </div>
          ) : (
            <div className="py-8 text-center space-y-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-2xl bg-white/[0.12] border border-white/[0.3] flex items-center justify-center text-white mx-auto shadow-lg">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <h4 className="text-xl font-bold text-white font-display">
                Diagnostic Complete
              </h4>

              <div className="p-4 rounded-xl bg-white/[0.08] border border-white/[0.2] inline-block min-w-[170px] shadow-sm">
                <div className="text-[10px] font-mono text-white uppercase tracking-wider font-semibold">SCORE</div>
                <div className="text-3xl font-black text-white font-mono mt-0.5">
                  {calculateScore()}%
                </div>
              </div>

              <p className="text-xs text-white/90 max-w-xs mx-auto font-body">
                Submitting will update your {quizData.skillName} mastery node on your active roadmap.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.12] bg-white/[0.04] flex items-center justify-between">
          {!isFinished ? (
            <>
              <button
                onClick={onClose}
                className="btn-ghost text-xs font-display text-white"
              >
                Exit
              </button>

              {showExplanation && (
                <button
                  onClick={handleNext}
                  className="btn-primary text-xs font-display"
                >
                  <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={resetQuiz}
                className="btn-secondary text-xs font-display"
              >
                <RotateCcw className="w-3.5 h-3.5 text-white" />
                <span>Retake</span>
              </button>

              <button
                onClick={handleFinishAndAdapt}
                className="btn-primary text-xs font-display"
              >
                <span>Apply to Roadmap →</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
