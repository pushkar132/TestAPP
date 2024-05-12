import { useState, useEffect } from 'react';

function Life() {
  const [filter, setFilter] = useState({
    policyTerm: '',
    coverageAmount: '',
    medicalTestRequired: '',
    smokingStatus: ''
  });
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Make HTTP request to backend API
      const response = await fetch(`/api/policies?filter=${JSON.stringify(filter)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  return (
    <div className="flex flex-wrap justify-center p-8">
      <div className="flex flex-wrap w-full">
      </div>
      <div className="w-full text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchData}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'View Policies'}
        </button>
      </div>
      {filteredData.map((card, index) => (
        <div
          className="w-64 max-w-xs mx-4 my-4 bg-white shadow-lg rounded-lg overflow-hidden"
          key={index}
        >
        </div>
      ))}
    </div>
  );
}

export default Life;
