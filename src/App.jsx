import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const value = 'World';

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
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return <div>Hello {value} {data}</div>;
}

export default App;
