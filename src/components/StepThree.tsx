import { Lightbulb, ArrowRight, ArrowLeft } from 'lucide-react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';
import type { ApplicationData, Language } from '../App';
import { translations } from '../utils/translations';

interface StepThreeProps {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  onBack: () => void;
  language: Language;
}

export function StepThree({ data, onUpdate, onNext, onBack, language }: StepThreeProps) {
  const t = translations[language];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#0050BB] rounded-lg flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-[#012169]">{t.step3.title}</h1>
            <p className="text-gray-600">{t.step3.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div>
            <Label htmlFor="products">{t.step3.productsLabel}</Label>
            <Textarea
              id="products"
              placeholder={t.step3.productsPlaceholder}
              value={data.productsServices}
              onChange={(e) => onUpdate({ productsServices: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="customers">{t.step3.customerLabel}</Label>
            <Textarea
              id="customers"
              placeholder={t.step3.customerPlaceholder}
              value={data.customerBase}
              onChange={(e) => onUpdate({ customerBase: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="vision">{t.step3.visionLabel}</Label>
            <Textarea
              id="vision"
              placeholder={t.step3.visionPlaceholder}
              value={data.vision}
              onChange={(e) => onUpdate({ vision: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="businessForm">{t.step3.formLabel}</Label>
            <Input
              id="businessForm"
              placeholder={t.step3.formPlaceholder}
              value={data.businessForm}
              onChange={(e) => onUpdate({ businessForm: e.target.value })}
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
