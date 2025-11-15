import { useState, useEffect } from 'react';
import { LanguageSelection } from './components/LanguageSelection';
import { LandingPage } from './components/LandingPage';
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { StepThree } from './components/StepThree';
import { StepFour } from './components/StepFour';
import { StepFive } from './components/StepFive';
import { ChatBot } from './components/ChatBot';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Header } from './components/Header';

export type Language = 'en' | 'fi' | 'sv' | 'zh' | 'ru';

export interface ApplicationData {
  language: Language | null;
  name: string;
  email: string;
  phoneNumber: string;
  businessDescription: string;
  category: string;
  isRegistered: boolean;
  ytunnus?: string;
  companyData?: any;
  
  // Step 1
  familiarity: string;
  businessEducation: string;
  businessExperience: string;
  
  // Step 2
  goals: string;
  currentScale: string;
  futureScale: string;
  timeline: string;
  
  // Step 3
  productsServices: string;
  customerBase: string;
  vision: string;
  businessForm: string;
  
  // Step 4
  financingStatus: string;
  financialKnowledge: string;
  financialNumbers?: {
    startupCosts?: string;
    monthlyExpenses?: string;
    projectedRevenue?: string;
    fundingNeeded?: string;
  };
  cashflowStatement?: string;
  
  // Step 5
  meetingDate?: string;
  meetingTime?: string;
  meetingExpectations?: string;
}

const INITIAL_DATA: ApplicationData = {
  language: null,
  name: '',
  email: '',
  phoneNumber: '',
  businessDescription: '',
  category: '',
  isRegistered: false,
  familiarity: '',
  businessEducation: '',
  businessExperience: '',
  goals: '',
  currentScale: '',
  futureScale: '',
  timeline: '',
  productsServices: '',
  customerBase: '',
  vision: '',
  businessForm: '',
  financingStatus: '',
  financialKnowledge: '',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState<'language' | 'landing' | 'step1' | 'step2' | 'step3' | 'step4' | 'step5' | 'complete'>('language');
  const [applicationData, setApplicationData] = useState<ApplicationData>(INITIAL_DATA);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('espoo-business-application');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setApplicationData(parsed);
        if (parsed.language) {
          setCurrentStep('landing');
        }
      }
    } catch (e) {
      // localStorage unavailable - continue without saved data
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (applicationData.language) {
      try {
        localStorage.setItem('espoo-business-application', JSON.stringify(applicationData));
      } catch (e) {
        // localStorage unavailable - continue without persistence
      }
    }
  }, [applicationData]);

  const updateData = (updates: Partial<ApplicationData>) => {
    setApplicationData(prev => ({ ...prev, ...updates }));
  };

  const handleLanguageSelect = (language: Language) => {
    updateData({ language });
    setCurrentStep('landing');
  };

  const showProgressIndicator = currentStep !== 'language' && currentStep !== 'complete';

  return (
    <div className="min-h-screen bg-[#00162E]">
      {currentStep === 'language' ? (
        <LanguageSelection onLanguageSelect={handleLanguageSelect} />
      ) : (
        <>
          <Header 
            currentLanguage={applicationData.language || 'en'} 
            onLanguageChange={() => setCurrentStep('language')}
          />
          
          {showProgressIndicator && (
            <ProgressIndicator 
              currentStep={currentStep} 
              language={applicationData.language || 'en'} 
            />
          )}
        </>
      )}
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'language' && null}
        
        {currentStep === 'landing' && (
          <LandingPage 
            data={applicationData} 
            onUpdate={updateData}
            onNext={() => setCurrentStep('step1')}
            language={applicationData.language || 'en'}
          />
        )}
        
        {currentStep === 'step1' && (
          <StepOne 
            data={applicationData} 
            onUpdate={updateData}
            onNext={() => setCurrentStep('step2')}
            onBack={() => setCurrentStep('landing')}
            language={applicationData.language || 'en'}
          />
        )}
        
        {currentStep === 'step2' && (
          <StepTwo 
            data={applicationData} 
            onUpdate={updateData}
            onNext={() => setCurrentStep('step3')}
            onBack={() => setCurrentStep('step1')}
            language={applicationData.language || 'en'}
          />
        )}
        
        {currentStep === 'step3' && (
          <StepThree 
            data={applicationData} 
            onUpdate={updateData}
            onNext={() => setCurrentStep('step4')}
            onBack={() => setCurrentStep('step2')}
            language={applicationData.language || 'en'}
          />
        )}
        
        {currentStep === 'step4' && (
          <StepFour 
            data={applicationData} 
            onUpdate={updateData}
            onNext={() => setCurrentStep('step5')}
            onBack={() => setCurrentStep('step3')}
            language={applicationData.language || 'en'}
          />
        )}
        
        {currentStep === 'step5' && (
          <StepFive 
            data={applicationData} 
            onUpdate={updateData}
            onComplete={() => setCurrentStep('complete')}
            onBack={() => setCurrentStep('step4')}
            language={applicationData.language || 'en'}
          />
        )}
        
        {currentStep === 'complete' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="mb-4">Application Complete!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for completing your application. You will receive an email shortly with your meeting details and a link to edit your application if needed.
            </p>
            <button
              onClick={() => {
                setApplicationData(INITIAL_DATA);
                setCurrentStep('language');
                try {
                  localStorage.removeItem('espoo-business-application');
                } catch (e) {
                  // localStorage unavailable - no cleanup needed
                }
              }}
              className="px-6 py-3 bg-[#0050BB] text-white rounded-lg hover:bg-[#012169] transition-colors"
            >
              Start New Application
            </button>
          </div>
        )}
      </main>
      
      {applicationData.language && currentStep !== 'complete' && currentStep !== 'language' && (
        <ChatBot language={applicationData.language} />
      )}
    </div>
  );
}