import { Check } from 'lucide-react';
import type { Language } from '../App';
import { translations } from '../utils/translations';

interface ProgressIndicatorProps {
  currentStep: string;
  language: Language;
}

const steps = ['landing', 'step1', 'step2', 'step3', 'step4', 'step5'];

export function ProgressIndicator({ currentStep, language }: ProgressIndicatorProps) {
  const t = translations[language];
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="bg-[#012169] border-b border-[#0050BB] py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isLast = index === steps.length - 1;

            return (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center w-10">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all
                      ${isCompleted ? 'bg-[#0050BB] text-white' : ''}
                      ${isCurrent ? 'bg-[#0050BB] text-white ring-4 ring-[#0050BB]/30' : ''}
                      ${!isCompleted && !isCurrent ? 'bg-[#D9D9D9] text-gray-600' : ''}
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs text-center hidden sm:block whitespace-nowrap ${isCurrent ? 'text-white' : 'text-gray-400'}`}>
                    {t.progress[step as keyof typeof t.progress]}
                  </span>
                </div>
                {!isLast && (
                  <div className="flex-1 flex items-center px-2">
                    <div
                      className={`
                        w-full h-1 transition-all
                        ${isCompleted ? 'bg-[#0050BB]' : 'bg-[#D9D9D9]/30'}
                      `}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}