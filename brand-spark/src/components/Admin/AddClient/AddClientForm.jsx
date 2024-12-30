import { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { axiosAdmin } from '../../../axios/axiosAdmin';

const AddClientForm = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const fileInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      image: null,
      color: '',
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required('Please select an image to upload')
        .test('fileType', 'Unsupported file type', (value) => {
          if (!value) return true;
          return value.type.includes('image/');
        }),
      color: Yup.string().required('Please select a color'),
    }),
    onSubmit: async (values) => {
      try {
        console.log('Submitting:', values);
        const formData = new FormData();
        formData.append('image', values.image);
        formData.append('color', values.color);
        
        const response = await axiosAdmin().post("/uploadClient", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Server Response:", response.data);
        if (response.data.message === 'success') {
          toast.success("Client image uploaded successfully!");
          formik.resetForm();
          setImageSrc(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      }
    },
  });

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  const handleImage = (file) => {
    if (file && file.type.includes('image')) {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      formik.setFieldValue('image', file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleImage(file);
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
          <h1 className="text-2xl font-bold text-white mb-2">Add Client</h1>
          <p className="text-neutral-400 text-sm">Upload client image and select a color</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="w-full">
            <label
              htmlFor="image-input"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300"
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
                      d="M12 4.5L12 19.5M19.5 12L4.5 12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-neutral-300">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-neutral-400">JPG, PNG, GIF etc</p>
                </div>
              ) : (
                <img
                  src={imageSrc}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
              <input
                ref={fileInputRef}
                id="image-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {formik.errors.image && formik.touched.image && (
              <div className="text-red-400 text-sm mt-2 text-center">
                {formik.errors.image}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-neutral-300 mb-2">
              Select Color
            </label>
            <select
              id="color"
              name="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Choose a color
              </option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
            </select>
            {formik.errors.color && formik.touched.color && (
              <div className="text-red-400 text-sm mt-2 text-center">
                {formik.errors.color}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={
              !formik.isValid || !formik.values.image || formik.isSubmitting
            }
            className={`w-full py-3 text-white font-semibold rounded-lg 
              ${
                formik.isSubmitting
                  ? 'bg-neutral-600 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700'
              }
              transition-colors duration-300 disabled:bg-neutral-600 disabled:cursor-not-allowed`}
          >
            {formik.isSubmitting ? 'Uploading...' : 'Add Client'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClientForm;
