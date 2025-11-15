import { useState } from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import type { ApplicationData, Language } from '../App';
import { translations } from '../utils/translations';

interface StepFiveProps {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onComplete: () => void;
  onBack: () => void;
  language: Language;
}

export function StepFive({ data, onUpdate, onComplete, onBack, language }: StepFiveProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = translations[language];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Mock API call to submit application
    // In a real application, this would:
    // 1. Send data to the advisor
    // 2. Schedule the meeting
    // 3. Send email with edit link
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock email sending
    console.log('Sending email to:', data.email);
    console.log('Application data:', data);
    
    setIsSubmitting(false);
    onComplete();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#0050BB] rounded-lg flex items-center justify-center">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-[#012169]">{t.step5.title}</h1>
            <p className="text-gray-600">{t.step5.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="meetingDate">{t.step5.dateLabel}</Label>
              <Input
                id="meetingDate"
                type="date"
                value={data.meetingDate || ''}
                onChange={(e) => onUpdate({ meetingDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="meetingTime">{t.step5.timeLabel}</Label>
              <Input
                id="meetingTime"
                type="time"
                value={data.meetingTime || ''}
                onChange={(e) => onUpdate({ meetingTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="expectations">{t.step5.expectationsLabel}</Label>
            <Textarea
              id="expectations"
              placeholder={t.step5.expectationsPlaceholder}
              value={data.meetingExpectations || ''}
              onChange={(e) => onUpdate({ meetingExpectations: e.target.value })}
              rows={4}
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-[#0050BB] p-4 rounded">
            <p className="text-gray-700">
              {t.step5.emailNote}
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-[#012169] mb-4">{t.step5.summaryTitle}</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex gap-2">
                <span className="text-gray-500">{t.step5.summaryName}</span>
                <span>{data.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">{t.step5.summaryEmail}</span>
                <span>{data.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">{t.step5.summaryCategory}</span>
                <span>{data.category && t.landing.categories[data.category as keyof typeof t.landing.categories] ? t.landing.categories[data.category as keyof typeof t.landing.categories] : data.category}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">{t.step5.summaryRegistered}</span>
                <span>{data.isRegistered ? t.step5.summaryYes : t.step5.summaryNo}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={onBack}
            variant="outline"
            className="border-[#D9D9D9]"
            disabled={isSubmitting}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {t.common.back}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-[#0050BB] hover:bg-[#012169] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.step5.submitting : t.step5.submitButton}
          </Button>
        </div>
      </div>
    </div>
  );
}