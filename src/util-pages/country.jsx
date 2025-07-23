// CountrySelect.jsx
import React from "react";
import Select from "react-select";
import countries from "world-countries";

// Format the country data
const formattedCountries = countries
  .map((country) => ({
    value: country.name.common,
    label: `${country.flag} ${country.name.common}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const CountrySelect = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium">Country</label>
      <Select
        options={formattedCountries}
        value={formattedCountries.find((c) => c.value === value)}
        onChange={(selected) => onChange(selected.value)}
        placeholder="Select your country"
        className="react-select-container"
        classNamePrefix="react-select"
        isSearchable
      />
    </div>
  );
};

export default CountrySelect;
