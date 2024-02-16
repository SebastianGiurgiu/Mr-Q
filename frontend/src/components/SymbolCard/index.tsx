import React from 'react';

import useAnimation from './useAnimation';
import { useAppSelector } from '@/hooks/redux';

import './symbolCard.css';
import SymbolCardHeader from './SymbolCardHeader';
import SymbolCardInfo from './SymbolCardInfo';
import SymbolCardPrice from './SymbolCardPrice';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
  activeSymbol: string | null;
};

// Custom hook for managing symbol card animation and price updates
const useSymbolCard = (id: string, price: number, activeSymbol: string | null) => {
  // Initialize animation-related state using a custom hook
  const [currentPrice, setCurrentPrice, animationClass] = useAnimation(price);

  // Update current price when the price prop changes
  React.useEffect(() => {
    setCurrentPrice(price);
  }, [price]);

  // Generate card class names for the symbol card based on conditions
  const cardClassNames = React.useMemo(() => {
    const isActive = id === activeSymbol;
    const isDeactive = !isActive && activeSymbol;

    return `symbolCard ${isDeactive ? 'symbolCard--deactive' : isActive ? 'symbolCard--active' : ''} ${animationClass}`;
  }, [id, activeSymbol, animationClass]);

  return { currentPrice, cardClassNames };
};

// Functional component with React.memo for performance optimization
const SymbolCard: React.FC<SymbolCardProps> = React.memo(({ id, onClick, price, activeSymbol }) => {
  const { trend, industry, companyName, marketCap } = useAppSelector((state) => state.stocks.entities[id]);
  const { cardClassNames, currentPrice } = useSymbolCard(id, price, activeSymbol);

  // Handle click event with useCallback to avoid unnecessary re-renders
  const handleOnClick = React.useCallback(() => {
    onClick(id);
  }, [id]);

  return (
    <div onClick={handleOnClick} className={cardClassNames}>
      <SymbolCardHeader trend={trend} id={id} />
      <SymbolCardPrice price={currentPrice || 0} />
      <SymbolCardInfo companyName={companyName} industry={industry} marketCap={marketCap} />
    </div>
  );
}, (prevProps, nextProps) => {
  // Memoization condition to re-render only when price or activeSymbol changes
  return prevProps.price === nextProps.price && prevProps.activeSymbol === nextProps.activeSymbol;
});

export default SymbolCard;
