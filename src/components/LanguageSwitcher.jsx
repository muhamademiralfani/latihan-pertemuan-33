import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/slices/languageSlice';

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state) => state.language.language);

  const toggleLanguage = () => {
    dispatch(setLanguage(currentLanguage === 'en' ? 'id' : 'en'));
  };

  return (
    <div className="mb-3">
      <button onClick={toggleLanguage} className="btn btn-secondary">
        {currentLanguage === 'en' ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
