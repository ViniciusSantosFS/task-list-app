import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

const resources = {
  'pt-BR': {
    translation: {
        greetings: 'Olá mundo!'
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'pt-BR',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;