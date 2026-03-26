import React from 'react';
import { useLocation } from 'react-router-dom';

import Sabbi1Bot from './Sabbi1Bot';
import SabbiSub from './SabbiSub';
import SabbiRoc from './SabbiRoc/index';
import SabbiPaymentAssistance from './SabbiPaymentAssistance';

const SmartChatbotRouter: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname.startsWith('/access/subordination')) {
    return <SabbiSub />;
  }

  if (pathname.startsWith('/access/collateral-release')) {
    return <SabbiRoc />;
  }

  if (pathname.startsWith('/access/payment-assistance')) {
    return <SabbiPaymentAssistance />;
  }

  return <Sabbi1Bot />;
};

export default SmartChatbotRouter;
