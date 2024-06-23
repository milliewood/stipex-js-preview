import React from 'react';
import { useStipex } from '../../../providers/StipexProvider';

const SomeComponent: React.FC = () => {
  const { enableProtection } = useStipex();

  return (
    <div>
      <button onClick={enableProtection}>Enable Protection</button>
    </div>
  );
};



import stipex from '../../api/stipex';

const EnableProtection: React.FC = () => {
  const enableProtection = async () => {
    try {
      const response = await stipex.post('/');
      console.log('Protection enabled:', response.data);
    } catch (error) {
      console.error('Error enabling protection:', error);
    }
  };

  return (
    <div>
      <button onClick={enableProtection}>Enable Protection</button>
    </div>
  );
};

export default SomeComponent; EnableProtection;
