
const FileUpload = ({ Id,ImageUrl, label, setImageUrl, isUploading, setIsUploading }) => {
  const handleChangeImg = (event,setImageUrl) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = (setImageUrl) => {
    setImageUrl("");
    setIsUploading(false);
  };

  return (
    <div className="truncate mt-4">
      <label className="block text-foreground">{label}</label>
      {!ImageUrl && (
        <>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e)=>handleChangeImg(e,setImageUrl)}
            disabled={isUploading}
            id={Id}
          />
          <label
            htmlFor={Id}
            className="cursor-pointer text-xs md:text-sm bg-primary text-white px-4 py-1 rounded-lg mt-1 border focus:border-blue-500 focus:bg-white focus:outline-none"
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </label>
        </>
      )}
      {ImageUrl && (
        <div className="mt-2">
          <img src={ImageUrl} alt="Uploaded image" className="max-w-40 h-12" />
          <button
            onClick={()=>handleCancel(setImageUrl)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
          >
            Remove Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
