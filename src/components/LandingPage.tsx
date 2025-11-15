import { useState } from 'react';
import { Building2, ArrowRight } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import type { ApplicationData, Language } from '../App';
import { translations } from '../utils/translations';

interface LandingPageProps {
  data: ApplicationData;
  onUpdate: (updates: Partial<ApplicationData>) => void;
  onNext: () => void;
  language: Language;
}

const categoryKeys = ['technology', 'retail', 'finance', 'entertainment', 'hospitality', 'manufacturing', 'other', 'dontKnow'] as const;

export function LandingPage({ data, onUpdate, onNext, language }: LandingPageProps) {
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const t = translations[language];

  const validateAndProceed = () => {
    const newErrors: Record<string, boolean> = {};
    
    if (!data.name.trim()) newErrors.name = true;
    if (!data.email.trim() || !data.email.includes('@')) newErrors.email = true;
    if (!data.businessDescription.trim()) newErrors.businessDescription = true;
    if (!data.category) newErrors.category = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Business Espoo - Helping companies thrive</a>
          <span>/</span>
          <span className="text-white">Book an appointment with a business advisor</span>
        </div>
      </nav>

      <div className="bg-white rounded-lg shadow-xl p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-[#0050BB] rounded-lg flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-[#012169]">{t.landing.title}</h1>
            <p className="text-gray-600">{t.landing.subtitle}</p>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-blue-50 border-l-4 border-[#0050BB] p-4 rounded">
            <p className="text-gray-700 mb-2">{t.landing.purpose}</p>
            <p className="text-gray-700 mb-2">{t.landing.effectiveness}</p>
            <p className="text-gray-700">{t.landing.emptyFields}</p>
          </div>

          <div>
            <Label htmlFor="name">{t.landing.nameLabel}</Label>
            <Input
              id="name"
              type="text"
              placeholder={t.landing.namePlaceholder}
              value={data.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 mt-1">{t.errors.required}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">{t.landing.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t.landing.emailPlaceholder}
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-500 mt-1">{t.errors.validEmail}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">{t.landing.phoneLabel}</Label>
            <Input
              id="phone"
              type="tel"
              placeholder={t.landing.phonePlaceholder}
              value={data.phoneNumber}
              onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="description">{t.landing.descriptionLabel}</Label>
            <p className="text-gray-500 mb-2">{t.landing.descriptionHint}</p>
            <Textarea
              id="description"
              placeholder={t.landing.descriptionPlaceholder}
              value={data.businessDescription}
              onChange={(e) => onUpdate({ businessDescription: e.target.value })}
              rows={4}
              className={errors.businessDescription ? 'border-red-500' : ''}
            />
            {errors.businessDescription && (
              <p className="text-red-500 mt-1">{t.errors.required}</p>
            )}
          </div>

          <div>
            <Label htmlFor="category">{t.landing.categoryLabel}</Label>
            <Select
              value={data.category}
              onValueChange={(value) => onUpdate({ category: value })}
            >
              <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                <SelectValue placeholder={t.landing.categoryPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {categoryKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t.landing.categories[key]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 mt-1">{t.errors.required}</p>
            )}
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Checkbox
              id="registered"
              checked={data.isRegistered}
              onCheckedChange={(checked) => onUpdate({ isRegistered: checked === true })}
            />
            <div className="flex-1">
              <Label htmlFor="registered" className="cursor-pointer">
                {t.landing.registrationLabel}
              </Label>
              {data.isRegistered && (
                <p className="text-gray-500 mt-2">
                  {t.landing.registrationNote}
                </p>
              )}
            </div>
          </div>

          {data.isRegistered && (
            <div>
              <Label htmlFor="ytunnus">{t.landing.ytunnusLabel}</Label>
              <Input
                id="ytunnus"
                type="text"
                placeholder={t.landing.ytunnusPlaceholder}
                value={data.ytunnus || ''}
                onChange={(e) => onUpdate({ ytunnus: e.target.value })}
                maxLength={9}
              />
              <p className="text-gray-500 mt-1">{t.landing.ytunnusHint}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            onClick={validateAndProceed}
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