import { useEffect, useState } from 'react';

export const Test: React.FC = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const { text } = await (await fetch('/api/message')).json();
      setData(text);
    })();
  });

  return <div>{data}</div>;
};
