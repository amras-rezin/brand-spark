import React, { useState } from 'react';

const AddVideo = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [dragging, setDragging] = useState(false);

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes('video')) {
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl); // Update the video source directly without resetting to null
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File:', file);
      if (file.type.includes('video')) {
        const videoUrl = URL.createObjectURL(file);
        setVideoSrc(videoUrl); // Update the video source directly without resetting to null
      } else {
        console.log('Not a video file');
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 flex flex-col items-center justify-center py-16">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-neutral-100">Add and Watch Video</h1>
        <p className="text-lg text-neutral-400">Drag and drop your video file here</p>
      </div>

      {/* Drag-and-Drop Video Upload Section */}
      <div
        className={`w-full max-w-4xl px-6 py-8 bg-neutral-800 rounded-lg shadow-lg border-2 ${
          dragging ? 'border-blue-500' : 'border-neutral-700'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="text-center mb-4">
          <p className="text-lg text-neutral-400">Drag and drop a video file or click to select</p>
        </div>
        <div className="flex justify-center items-center h-64 border-2 border-dashed border-neutral-500 rounded-lg">
          {videoSrc ? (
            <video controls className="w-full h-full object-cover">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <span className="text-neutral-400">No video selected</span>
          )}
        </div>
      </div>

      {/* Action Button to Upload Video */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            const fileInput = document.getElementById('video-input');
            fileInput.click(); // Trigger the file input manually
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-medium"
        >
          Select Video File
        </button>
        <input
          type="file"
          id="video-input"
          className="hidden"
          accept="video/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default AddVideo;
