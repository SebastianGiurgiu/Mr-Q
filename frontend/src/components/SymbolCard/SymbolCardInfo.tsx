import React from 'react';

import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryLogo } from '@/assets/industry.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';

type SymbolCardInfoProps = {
  companyName: string;
  industry: string;
  marketCap: number;
};

const SymbolCardInfo: React.FC<SymbolCardInfoProps> = ({ companyName, industry, marketCap }) => (
  <>
    <div className="symbolCard__content">
      <CompanyIcon className="symbolCard__icon" />
      <div>{companyName}</div>
    </div>
    <div className="symbolCard__content">
      <IndustryLogo className="symbolCard__icon" />
      <div>{industry}</div>
    </div>
    <div className="symbolCard__content">
      <MarketCapIcon className="symbolCard__icon" />
      <div>{marketCap}</div>
    </div>
  </>
);

export default SymbolCardInfo;
