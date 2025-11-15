import { Globe, Menu, ArrowLeft } from 'lucide-react';
import type { Language } from '../App';

interface HeaderProps {
  currentLanguage: Language;
  onLanguageChange?: () => void;
}

const languageNames: Record<Language, string> = {
  en: 'In English',
  fi: 'Suomeksi',
  sv: 'På Svenska',
  zh: '中文',
  ru: 'Русский',
};

export function Header({ currentLanguage, onLanguageChange }: HeaderProps) {
  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0050BB] text-white py-2 px-4">
        <div className="container mx-auto">
          <a 
            href="https://www.espoo.fi" 
            className="inline-flex items-center gap-2 text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to the Espoo.fi main site</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-[#012169] text-white py-4 px-4 border-b border-[#0050BB]">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <div className="tracking-wider">BUSINESS</div>
              <div className="tracking-wider">ESPOO</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              className="flex items-center gap-2 hover:text-gray-300 transition-colors"
              onClick={onLanguageChange}
            >
              <Globe className="w-5 h-5" />
              <span>{languageNames[currentLanguage]}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-gray-300 transition-colors">
              <span>Menu</span>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
