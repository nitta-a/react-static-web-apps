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

  return <div>Hello {value}</div>;
}

export default App;
