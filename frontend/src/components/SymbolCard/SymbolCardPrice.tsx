import React from 'react';

import './symbolCard.css';

type SymbolCardPriceProps = {
  price: number;
};

const SymbolCardPrice: React.FC<SymbolCardPriceProps> = ({ price }) => (
  <div className="symbolCard__content">
    <div className="symbolCard__price">Price:</div>
    <div className="symbolCard__priceValue">
      {price !== 0 ? `$${price.toFixed(0)}` : '--'}
    </div>
  </div>
);

export default SymbolCardPrice;
