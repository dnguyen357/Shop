import React, { useState } from 'react';

function FilterSidebar({ applyFilters }) {
  const [selectedBrand, setSelectedBrands] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    // Toggle the selected brand on checkbox change
    if(selectedBrand!==brand){
      setSelectedBrands(brand)
    }
    else{
      setSelectedBrands("")
    }
  };

  const handlePriceRangeChange = (event) => {
    const price = event.target.value;
    // Toggle the selected price range on checkbox change
    if(selectedPrice!=price){
      setSelectedPrice(price);
    }
    else{
      setSelectedPrice("")
    }
    
  };

  const handleApplyFilters = () => {
    // Pass the selected filters to the parent component
    applyFilters(selectedBrand, selectedPrice);
  };
  
  return (
    <>
      <h3>Filter Options</h3>
      <div className='sidebar-sub'>
        <p className='filter-name'>Brand</p>
        <label>
          <input
            type="checkbox"
            value="jewelery"
            checked={selectedBrand.includes('jewelery')}
            onChange={handleBrandChange}
          />
          Jewelery
        </label>
        <label>
          <input
            type="checkbox"
            value="men's clothing"
            checked={selectedBrand == ("men's clothing")}
            onChange={handleBrandChange}
          />
          Men's Clothing
        </label>
        <label>
          <input
            type="checkbox"
            value="electronics"
            checked={selectedBrand.includes('electronics')}
            onChange={handleBrandChange}
          />
          Electronics
        </label>
        <label>
          <input
            type="checkbox"
            value="women's clothing"
            checked={selectedBrand == ("women's clothing")}
            onChange={handleBrandChange}
          />
          Women's Clothing
        </label>
        {/* Add more brand options as needed */}
      </div>
      <div className='sidebar-sub'>
        <p className='filter-name'>Price</p>
        <label>
          <input
            type="checkbox"
            value="10"
            checked={selectedPrice ==='10'}
            onChange={handlePriceRangeChange}
          />
          $0 - $10
        </label>
        <label>
          <input
            type="checkbox"
            value="50"
            checked={selectedPrice === '50'}
            onChange={handlePriceRangeChange}
          />
          $10 - $50
        </label>
        <label>
          <input
            type="checkbox"
            value="100"
            checked={selectedPrice === '100'}
            onChange={handlePriceRangeChange}
          />
          $50 - $100
        </label>
        {/* Add more price range options as needed */}
      </div>
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </>
  );
}

export default FilterSidebar;
