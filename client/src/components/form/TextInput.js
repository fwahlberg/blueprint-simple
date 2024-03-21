const TextInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  style = "",
  errorMessage = "",
  
}) => (
  <div className={`ingput-group ${style}`}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>

    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`mt-1 block w-full p-2 border rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
        errorMessage && "border-red-500 ring-blue-500" }`}
    />
    {!!errorMessage && (
      <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
    )}
  </div>
);

export default TextInput;
