import React from 'react';

import './priceChart.css';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import Loading from '../Loading';

type PriceChartProps = {
  symbolId: string | null;
};

const PriceChart = ({ symbolId }: PriceChartProps) => {
  const dispatch = useAppDispatch();

  // State variable for tracking loading status
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Function to fetch data asynchronously
    const fetchData = async () => {
      try {
        setLoading(true);
        if (symbolId) {
          // Dispatch the fetchPriceHistory action
          await dispatch(fetchPriceHistory(symbolId));
        }
      } catch (error) {
        // Handle errors during data fetching
        console.error('Error fetching price history:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data when the component mounts
    fetchData();

  }, [dispatch, symbolId]);

  // Selectors to retrieve data from the Redux store
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);

  return (
    <div className="priceChart">
      {!symbolId && <span>Select a stock</span>}
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            {symbolId && <>
              <div>{symbolInfo}</div>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.map((e) => ({ ...e, time: new Date(e.time).toLocaleTimeString() }))}>
                  <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                  <XAxis dataKey="time" />
                  <YAxis />
                </LineChart>
              </ResponsiveContainer>
            </>}
          </>
        )}
      </>
    </div>
  );
};

export default PriceChart;
