import React from 'react';

import './symbolCard.css';
import UpTrendIcon from '@/assets/up.png';
import DownTrendIcon from '@/assets/down.png';

type SymbolCardHeaderProps = {
  trend: 'UP' | 'DOWN' | null;
  id: string | null;
};

const SymbolCardHeader: React.FC<SymbolCardHeaderProps> = ({ trend, id }) => (
  <header className="symbolCard__header">
      <div className="symbolCard__id">{id}</div>
      {trend === 'UP' && <img src={UpTrendIcon} alt="Up Trend Icon" className="symbolCard__trendIcon" />}
      {trend === 'DOWN' && <img src={DownTrendIcon} alt="Down Trend Icon" className="symbolCard__trendIcon" />}
  </header>
);

export default SymbolCardHeader;
