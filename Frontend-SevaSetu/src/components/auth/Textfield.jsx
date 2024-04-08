const TextArea = ({ label, name, placeholder, value, onChange }) => {
    return (
      <div className="mt-4">
        <label className="block text-foreground">{label}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          className="w-full px-4 py-1 rounded-lg bg-gray-200 mt-1 border-2 dark:bg-background focus:border-blue-500 focus:bg-white focus:outline-none"
          required
          onChange={onChange}
        />
      </div>
    );
  };
export default TextArea  