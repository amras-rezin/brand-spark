import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { axiosAdmin } from '../../../axios/axiosAdmin';

const AddVideo = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      video: null,
    },
    validationSchema: Yup.object({
      video: Yup.mixed()
        .required('Please select a video to upload')
        .test('fileSize', 'File too large (max 100MB)', (value) => {
          if (!value) return true;
          return value.size <= 100 * 1024 * 1024;
        })
        .test('fileType', 'Unsupported file type', (value) => {
          if (!value) return true;
          return value.type.includes('video/');
        }),
    }),
    onSubmit: async (values) => {
      try {
        console.log('Submitting:', values);
        const formData = new FormData();
        formData.append('video', values.video);
        try {
          const response = await axiosAdmin().post("/uploadVideo", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          console.log("Server Response:", response.data);
          if(response.data.message === 'success') {
            toast.success("Video uploaded successfully!");
            formik.resetForm();
            setVideoSrc(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          }
        } catch (error) {
          console.error("Error uploading video:", error);
          toast.error("Failed to upload video");
        }
      } catch (error) {
        console.error('Error uploading video:', error);
        toast.error('Failed to upload video');
      }
    },
  });

  useEffect(() => {
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoSrc]);

  const handleVideo = (file) => {
    if (file && file.type.includes('video')) {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
      formik.setFieldValue('video', file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleVideo(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleVideo(file);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-8">
      <a
        href="#"
        className="flex items-center mb-6 text-2xl font-semibold text-white"
      >
        <img className="w-20 h-20 mr-2" src="/logo.png" alt="logo" />
      </a>

      <div className="w-full max-w-md bg-neutral-800 shadow-xl rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Video Upload</h1>
          <p className="text-neutral-400 text-sm">
            Select or drag and drop your video file
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="w-full"
          >
            <label
              htmlFor="video-input"
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer 
                     bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300
                     ${
                       isDragging
                         ? 'border-blue-500 bg-neutral-600'
                         : 'border-neutral-500'
                     }`}
            >
              {!videoSrc ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <svg
                    className="w-10 h-10 mb-3 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-neutral-300">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-neutral-400">
                    MP4, WebM, OGG (Max 100MB)
                  </p>
                </div>
              ) : (
                <div className="w-full h-full">
                  <video
                    key={videoSrc}
                    controls
                    className="w-full h-full object-cover rounded-lg"
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <input
                ref={fileInputRef}
                id="video-input"
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileChange}
              />
            </label>
            {formik.errors.video && formik.touched.video && (
              <div className="text-red-400 text-sm mt-2 text-center">
                {formik.errors.video}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={
              !formik.isValid || !formik.values.video || formik.isSubmitting
            }
            className={`w-full py-3 text-white font-semibold rounded-lg 
              ${
                formik.isSubmitting
                  ? 'bg-neutral-600 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700'
              }
              transition-colors duration-300 disabled:bg-neutral-600 disabled:cursor-not-allowed`}
          >
            {formik.isSubmitting ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
