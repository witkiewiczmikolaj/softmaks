import React, { useState, useEffect } from 'react'

function Home() {
const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/api/get_data');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/post_data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from React' }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <button type="submit">Send Data</button>
      </form>
    </div>
  );
}

export default Home