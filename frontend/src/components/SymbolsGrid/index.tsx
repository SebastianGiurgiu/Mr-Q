import React from 'react';

import './symbolGrid.css';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import Loading from '../Loading';

type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
  activeSymbol: string | null;
};

const SymbolsGrid = ({ onSymbolClick, activeSymbol }: SymbolsGridProps) => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchAllStocks());
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {loading ? <Loading /> :
        <div className="symbols-grid">
          {stockSymbols.map((id, i) => (
            <SymbolCard price={prices[id]} onClick={onSymbolClick} activeSymbol={activeSymbol} key={i} id={id} />
          ))}
        </div>}
    </>
  );
};

export default SymbolsGrid;
