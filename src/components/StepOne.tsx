import { GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import type { ApplicationData, Language } from '../App';
import { translations } from '../utils/translations';

interface StepOneProps {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
  language: Language;
}

export function StepOne({ data, onUpdate, onNext, onBack, language }: StepOneProps) {
  const t = translations[language];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#0050BB] rounded-lg flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-[#012169]">{t.step1.title}</h1>
            <p className="text-gray-600">{t.step1.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <Label>{t.step1.familiarityLabel}</Label>
            <RadioGroup
              value={data.familiarity}
              onValueChange={(value) => onUpdate({ familiarity: value })}
              className="mt-3 space-y-3"
            >
              {Object.entries(t.step1.familiarityOptions).map(([key, label]) => (
                <div key={key} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50">
                  <RadioGroupItem value={key} id={`familiarity-${key}`} />
                  <Label htmlFor={`familiarity-${key}`} className="flex-1 cursor-pointer">
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="education">
              {t.step1.educationLabel}
              <span className="text-gray-500 ml-2">({t.common.optional})</span>
            </Label>
            <Textarea
              id="education"
              placeholder={t.step1.educationPlaceholder}
              value={data.businessEducation}
              onChange={(e) => onUpdate({ businessEducation: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="experience">
              {t.step1.experienceLabel}
              <span className="text-gray-500 ml-2">({t.common.optional})</span>
            </Label>
            <Textarea
              id="experience"
              placeholder={t.step1.experiencePlaceholder}
              value={data.businessExperience}
              onChange={(e) => onUpdate({ businessExperience: e.target.value })}
              rows={3}
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
