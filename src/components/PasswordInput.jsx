import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const PasswordInput = ({ label, value, onChange, required = true, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700">{label.toUpperCase()}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={value}
          onChange={onChange}
          required={required}
          {...props}
        />
        <button
          type="button"
          className="absolute right-2 top-2"
          onClick={() => setVisible(!visible)}
        >
          <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
