import { useEffect, useState } from 'react';

export const Test: React.FC = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    (async () => {
      const res = await (await fetch('/api/httpTrigger1')).text();
      setData(res);
    })();
  }, []);

  useEffect(() => {
    fetch('/api/httpTrigger2')
      .then((res) => {
        console.log(res);
      })
      .catch((e: unknown) => {
        console.error(e);
      });
  }, []);

  return <div>Test component {data}</div>;
};
