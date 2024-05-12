import { useState } from 'react';
import mockData  from './utils/mockdata.js'

function Life() {
  const [filter, setFilter] = useState({
    policyTerm: '',
    coverageAmount: '',
    medicalTestRequired: '',
    smokingStatus: ''
  });
  const [filteredData, setFilteredData] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const handleViewClick = () => {
    const newData = mockData.filter(card => {
      return (
        (filter.policyTerm === '' || (card.policyTerm >= parseInt(filter.policyTerm.split('-')[0]) && card.policyTerm <= parseInt(filter.policyTerm.split('-')[1]))) &&
        (filter.coverageAmount === '' || (card.coverageAmount >= parseInt(filter.coverageAmount.split('-')[0]) && card.coverageAmount <= parseInt(filter.coverageAmount.split('-')[1]))) &&
        (filter.medicalTestRequired === '' || card.medicalTestRequired === filter.medicalTestRequired) &&
        (filter.smokingStatus === '' || card.smokingStatus === filter.smokingStatus)
      );
    });
    setFilteredData(newData);
  };

  return (
    <div className="flex flex-wrap justify-center p-8">
      <div className="flex flex-wrap w-full">
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
          <label className="block mb-2 font-semibold">Policy Term (in years)</label>
          <select name="policyTerm" value={filter.policyTerm} onChange={handleFilterChange} className="w-full">
            <option value="">All</option>
            <option value="10-20">10-20</option>
            <option value="20-30">20-30</option>
            <option value="30-40">30-40</option>
            <option value="<40">Greater than 40</option>
          </select>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
          <label className="block mb-2 font-semibold">Coverage Amount (in lakhs)</label>
          <select name="coverageAmount" value={filter.coverageAmount} onChange={handleFilterChange} className="w-full">
            <option value="">All</option>
            <option value="50-75">50-75</option>
            <option value="75-100">75-100</option>
            <option value="100-125">100-125</option>
            <option value="125-150">125-150</option>
          </select>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
          <label className="block mb-2 font-semibold">Medical Test Required</label>
          <select name="medicalTestRequired" value={filter.medicalTestRequired} onChange={handleFilterChange} className="w-full">
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4">
          <label className="block mb-2 font-semibold">Smoking Status</label>
          <select name="smokingStatus" value={filter.smokingStatus} onChange={handleFilterChange} className="w-full">
            <option value="">All</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="w-full text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleViewClick}
        >
          View Policies
        </button>
      </div>
      {filteredData.map((card, index) => (
        <div
          className="w-64 max-w-xs mx-4 my-4 bg-white shadow-lg rounded-lg overflow-hidden"
          key={index}
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold">{card.name}</h2>
            <p className="text-gray-600">{card.company}</p>
            <a
              href="#"
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Life;
