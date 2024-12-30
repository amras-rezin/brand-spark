import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { axiosAdmin } from '../../../axios/axiosAdmin';

const AddPortfolioForm = () => {
  const [coverImageSrc, setCoverImageSrc] = useState(null);
  const [detailsImageSrc, setDetailsImageSrc] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const coverInputRef = useRef(null);
  const detailsInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      coverImage: null,
      detailsImage: null,
    },
    validationSchema: Yup.object({
      coverImage: Yup.mixed()
        .required('Please select a cover image')
        .test('fileType', 'Unsupported file type', (value) => {
          if (!value) return true;
          return value.type.includes('image/');
        }),
      detailsImage: Yup.mixed()
        .required('Please select a details image')
        .test('fileType', 'Unsupported file type', (value) => {
          if (!value) return true;
          return value.type.includes('image/');
        }),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('coverImage', values.coverImage);
        formData.append('detailsImage', values.detailsImage);

        const response = await axiosAdmin().post('/uploadPortfolioImages', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.message === 'success') {
          toast.success('Images uploaded successfully!');
          formik.resetForm();
          setCoverImageSrc(null);
          setDetailsImageSrc(null);
          if (coverInputRef.current) coverInputRef.current.value = '';
          if (detailsInputRef.current) detailsInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error uploading images:', error);
        toast.error('Failed to upload images');
      }
    },
  });

  const handleImage = (file, setImageSrc, fieldName) => {
    if (file && file.type.includes('image')) {
      setImageSrc(URL.createObjectURL(file));
      formik.setFieldValue(fieldName, file);
    }
  };

  const handleFileChange = (e, setImageSrc, fieldName) => {
    const file = e.target.files[0];
    handleImage(file, setImageSrc, fieldName);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e, setImageSrc, fieldName) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleImage(file, setImageSrc, fieldName);
  };

  useEffect(() => {
    return () => {
      if (coverImageSrc) URL.revokeObjectURL(coverImageSrc);
      if (detailsImageSrc) URL.revokeObjectURL(detailsImageSrc);
    };
  }, [coverImageSrc, detailsImageSrc]);

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
          <h1 className="text-2xl font-bold text-white mb-2">Portfolio Images Upload</h1>
          <p className="text-neutral-400 text-sm">
            Upload cover image and details image
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {['coverImage', 'detailsImage'].map((field, index) => {
            const isCover = field === 'coverImage';
            const setImageSrc = isCover ? setCoverImageSrc : setDetailsImageSrc;
            const imageSrc = isCover ? coverImageSrc : detailsImageSrc;
            const inputRef = isCover ? coverInputRef : detailsInputRef;
            const label = isCover ? 'Cover Image' : 'Details Image';

            return (
              <div
                key={index}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, setImageSrc, field)}
                className={`w-full h-40 border-2 border-dashed rounded-lg cursor-pointer 
                  bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300
                  ${isDragging ? 'border-blue-500 bg-neutral-600' : 'border-neutral-500'}`}
              >
                <label
                  htmlFor={`${field}-input`}
                  className="flex flex-col items-center justify-center w-full h-full"
                >
                  {!imageSrc ? (
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
                          d="M3 16l4-4-4-4m9-4v16"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-neutral-300">
                        <span className="font-semibold">Drag and drop</span> or click to upload {label}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={imageSrc}
                      alt={label}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                  <input
                    ref={inputRef}
                    id={`${field}-input`}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, setImageSrc, field)}
                  />
                </label>
                {formik.errors[field] && formik.touched[field] && (
                  <div className="text-red-400 text-sm mt-2 text-center">
                    {formik.errors[field]}
                  </div>
                )}
              </div>
            );
          })}

          <button
            type="submit"
            disabled={
              !formik.isValid || !formik.values.coverImage || !formik.values.detailsImage || formik.isSubmitting
            }
            className={`w-full py-3 text-white font-semibold rounded-lg 
              ${
                formik.isSubmitting
                  ? 'bg-neutral-600 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700'
              }
              transition-colors duration-300 disabled:bg-neutral-600 disabled:cursor-not-allowed`}
          >
            {formik.isSubmitting ? 'Uploading...' : 'Upload Images'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPortfolioForm;
