import { Target, ArrowRight, ArrowLeft } from 'lucide-react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import type { ApplicationData, Language } from '../App';
import { translations } from '../utils/translations';

interface StepTwoProps {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
  language: Language;
}

export function StepTwo({ data, onUpdate, onNext, onBack, language }: StepTwoProps) {
  const t = translations[language];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#0050BB] rounded-lg flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-[#012169]">{t.step2.title}</h1>
            <p className="text-gray-600">{t.step2.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <Label htmlFor="goals">{t.step2.goalsLabel}</Label>
            <p className="text-gray-500 mb-2">{t.step2.goalsHint}</p>
            <Textarea
              id="goals"
              placeholder={t.step2.goalsPlaceholder}
              value={data.goals}
              onChange={(e) => onUpdate({ goals: e.target.value })}
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="currentScale">{t.step2.currentScaleLabel}</Label>
              <Input
                id="currentScale"
                placeholder={t.step2.currentScalePlaceholder}
                value={data.currentScale}
                onChange={(e) => onUpdate({ currentScale: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="futureScale">{t.step2.futureScaleLabel}</Label>
              <Input
                id="futureScale"
                placeholder={t.step2.futureScalePlaceholder}
                value={data.futureScale}
                onChange={(e) => onUpdate({ futureScale: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="timeline">{t.step2.timelineLabel}</Label>
            <Input
              id="timeline"
              placeholder={t.step2.timelinePlaceholder}
              value={data.timeline}
              onChange={(e) => onUpdate({ timeline: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#D9D9D9]"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t.common.back}
          </Button>
          <Button
            onClick={onNext}
            className="bg-[#0050BB] hover:bg-[#012169] text-white"
          >
            {t.common.continue}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
