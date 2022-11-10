import React from 'react';
import {
  useHistory
} from "react-router-dom";

import './index.scss';
import {useLocale} from "payload/dist/admin/components/utilities/Locale";

const BeforeNavLinks: React.FC=()=>{
  const history=useHistory()
  const _locale=useLocale();
  const [locale]=React.useState(_locale)
  React.useEffect(()=>{
    if(_locale!==locale){
      history.go(0);
    }
  },[_locale])
  return null;
};

export default BeforeNavLinks;
