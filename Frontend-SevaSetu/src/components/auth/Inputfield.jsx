const InputField = ({ label, name, type, placeholder, value, onChange }) => {
    return (
      <div className="truncate mt-4">
        <label className="block text-foreground">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          className="text-foreground w-full px-4 bg-gray-200 py-1 rounded-lg bg- mt-1 border-2 dark:bg-background focus:border-blue-500 focus:bg-white focus:outline-none"
          required
          onChange={onChange}
        />
      </div>
    );
  };
export default InputField