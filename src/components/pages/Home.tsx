import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Music, Palette, Utensils, BookOpen, Camera, Gamepad2, Users } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useTheme } from '../../contexts/ThemeContext';

const getInterests = (t: (key: string) => string) => [
  { id: 'music', label: t('interest.music'), icon: Music, color: 'primary' },
  { id: 'art', label: t('interest.art'), icon: Palette, color: 'accent' },
  { id: 'food', label: t('interest.food'), icon: Utensils, color: 'secondary' },
  { id: 'literature', label: t('interest.literature'), icon: BookOpen, color: 'primary' },
  { id: 'photography', label: t('interest.photography'), icon: Camera, color: 'accent' },
  { id: 'gaming', label: t('interest.gaming'), icon: Gamepad2, color: 'secondary' },
];

const getBudgetOptions = (t: (key: string) => string) => [
  { id: 'low', label: t('budget.low'), description: t('budget.lowDesc') },
  { id: 'medium', label: t('budget.medium'), description: t('budget.mediumDesc') },
  { id: 'high', label: t('budget.high'), description: t('budget.highDesc') },
];

const getAccessibilityOptions = (t: (key: string) => string) => [
  { id: 'wheelchair-accessible', label: t('accessibility.wheelchair') },
  { id: 'hearing-loop', label: t('accessibility.hearing') },
  { id: 'visual-aids', label: t('accessibility.visual') },
  { id: 'quiet-space', label: t('accessibility.quiet') },
];

const getMoodOptions = (t: (key: string) => string) => [
  { id: 'explorer', label: t('mood.explorer'), description: t('mood.explorerDesc') },
  { id: 'relaxed', label: t('mood.relaxed'), description: t('mood.relaxedDesc') },
  { id: 'adventurous', label: t('mood.adventurous'), description: t('mood.adventurousDesc') },
  { id: 'social', label: t('mood.social'), description: t('mood.socialDesc') },
];

export function Home() {
  const navigate = useNavigate();
  const { t } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profile, setProfile] = useState({
    interests: [] as string[],
    budget: '' as string,
    accessibility: [] as string[],
    mood: '' as string,
  });

  const handleInterestToggle = (interestId: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Profile created:', profile);
      navigate('/discover');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setShowOnboarding(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return profile.interests.length > 0;
      case 1: return profile.budget !== '';
      case 2: return true;
      case 3: return profile.mood !== '';
      default: return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('onboarding.interests')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t('onboarding.interestsDesc')}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {getInterests(t).map((interest) => {
                const Icon = interest.icon;
                const isSelected = profile.interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => handleInterestToggle(interest.id)}
                    className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-medium">{interest.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('onboarding.budget')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t('onboarding.budgetDesc')}
            </p>
            <div className="space-y-3 sm:space-y-4">
              {getBudgetOptions(t).map((option) => (
                <button
                  key={option.id}
                  onClick={() => setProfile(prev => ({ ...prev, budget: option.id }))}
                  className={`w-full p-4 sm:p-6 rounded-xl border-2 text-left transition-all ${
                    profile.budget === option.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{option.label}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('onboarding.accessibility')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('onboarding.accessibilityDesc')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {getAccessibilityOptions(t).map((option) => {
                const isSelected = profile.accessibility.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      setProfile(prev => ({
                        ...prev,
                        accessibility: prev.accessibility.includes(option.id)
                          ? prev.accessibility.filter(id => id !== option.id)
                          : [...prev.accessibility, option.id]
                      }));
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('onboarding.mood')}
            </h2>
            <p className="text-gray-600 mb-8">
              {t('onboarding.moodDesc')}
            </p>
            <div className="space-y-3 sm:space-y-4">
              {getMoodOptions(t).map((option) => (
                <button
                  key={option.id}
                  onClick={() => setProfile(prev => ({ ...prev, mood: option.id }))}
                  className={`w-full p-4 sm:p-6 rounded-xl border-2 text-left transition-all ${
                    profile.mood === option.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{option.label}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!showOnboarding) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
          <div className="text-center mb-12 sm:mb-20">
            <div className="flex justify-center mb-6 sm:mb-8">
              <img 
                src="/logo.svg" 
                alt="Local Insights Logo" 
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {t('home.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              {t('home.subtitle')}
            </p>
            <Button 
              size="lg" 
              onClick={() => setShowOnboarding(true)}
              className="text-sm sm:text-base px-6 sm:px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
            >
              {t('home.createProfile')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-dark-800 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('home.localDiscovery')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
                {t('home.localDiscoveryDesc')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-dark-800 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Music className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('home.independentArtists')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
                {t('home.independentArtistsDesc')}
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 dark:bg-dark-800 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white">{t('home.community')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed px-2">
                {t('home.communityDesc')}
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {t('home.trending')}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Intimate Jazz</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Street Art</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Italian Cuisine</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Slam Poetry</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Night Tour</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Electronic Music</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Pottery</span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">Wine Tasting</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 sm:py-12">
      <div className="max-w-2xl w-full mx-auto px-4">
        <Card className="p-4 sm:p-8">
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
              <span>{t('onboarding.step')} {currentStep + 1} {t('onboarding.of')} 4</span>
              <span>{Math.round(((currentStep + 1) / 4) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {renderStep()}

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              disabled={currentStep === 0}
              className="order-2 sm:order-1"
            >
              {t('onboarding.back')}
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!canProceed()}
              className="order-1 sm:order-2"
            >
              {currentStep === 3 ? t('onboarding.finish') : t('onboarding.next')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
