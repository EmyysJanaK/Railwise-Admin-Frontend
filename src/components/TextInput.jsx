import React from 'react';

const TextInput = ({ label, type = "text", value, onChange, required = true, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label.toUpperCase()}</label>
    <input
      type={type}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    />
  </div>
);

export default TextInput;
