import React from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apicalls';

const LanguageSelector = (props) => {
   const onChangeLanguage = language => {
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeLanguage(language); 
    }
    
    return (
        <div className="container">
            <img src="/images/tr.png" alt="Turkish Flag" onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer', width:'50px'}} />
            <img src="/images/en.png" alt="USA Flag" onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer', width:'50px' }} />
        </div>
    );
};

export default withTranslation()(LanguageSelector);