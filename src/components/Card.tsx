import {ChangeEvent, DragEvent, useState} from "react";

export default function Card() {
  const [image, setImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  const processFile = (file?: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="card w-96 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center">Upload Image</h2>

          {/* Drag and Drop Area */}
          <div
              className={`border-2 border-dashed ${
                  dragging ? "border-primary bg-base-200" : "border-gray-300"
              } rounded-lg p-6 text-center cursor-pointer`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput")?.click()}
          >
            {image ? (
                <img src={image} alt="Uploaded" className="w-full h-32 object-cover rounded-lg"/>
            ) : (
                <p className="text-gray-500">Drag & drop a file here, or click to upload</p>
            )}
          </div>

          {/* Hidden File Input */}
          <input
              id="fileInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
          />

          {/* Submit Button */}
          <button className="btn btn-primary btn-block mt-3">Submit</button>
        </div>
      </div>
  );
}
