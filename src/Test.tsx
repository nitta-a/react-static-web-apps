import { useEffect, useState } from 'react';

export const Test: React.FC = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const res = await (await fetch('/api/message')).json();
      setData(res);
    })();
  });

  return <div>Test component {data}</div>;
};
