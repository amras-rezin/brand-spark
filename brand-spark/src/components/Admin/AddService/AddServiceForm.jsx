import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { axiosAdmin } from '../../../axios/axiosAdmin';

const AddServiceForm = () => {
  const [iconPreview, setIconPreview] = useState(null);
  const iconInputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      icon: null,
      title: '',
      description: '',
    },
    validationSchema: Yup.object({
      icon: Yup.mixed()
        .required('Please select an icon image')
        .test('fileType', 'Unsupported file type', (value) => {
          if (!value) return true;
          return value.type.startsWith('image/');
        }),
      title: Yup.string()
        .required('Please enter a title')
        .max(40, 'Title cannot exceed 40 characters'),
      description: Yup.string()
        .required('Please enter a description')
        .max(210, 'Description cannot exceed 200 characters'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('icon', values.icon);
        formData.append('title', values.title);
        formData.append('description', values.description);

        const response = await axiosAdmin().post('/addService', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        
        if (response.data.message === 'success') {
          toast.success('Service added successfully!');
          formik.resetForm();
          setIconPreview(null);
          if (iconInputRef.current) {
            iconInputRef.current.value = '';
          }
        }
      } catch (error) {
        console.error('Error adding service:', error);
        toast.error('Failed to add service');
      }
    },
  });

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setIconPreview(URL.createObjectURL(file));
      formik.setFieldValue('icon', file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setIconPreview(URL.createObjectURL(file));
      formik.setFieldValue('icon', file);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-neutral-800 shadow-xl rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Add Service</h1>
          <p className="text-neutral-400 text-sm">Fill out the form to add a new service</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-full"
          >
            <label
              htmlFor="icon-input"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300"
            >
              {!iconPreview ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="mb-2 text-sm text-neutral-300">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-neutral-400">Image files only (Max 5MB)</p>
                </div>
              ) : (
                <img
                  src={iconPreview}
                  alt="Icon Preview"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <input
                ref={iconInputRef}
                id="icon-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleIconChange}
              />
            </label>
            {formik.errors.icon && formik.touched.icon && (
              <div className="text-red-400 text-sm mt-2 text-center">
                {formik.errors.icon}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-neutral-300 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full px-3 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps('title')}
            />
            {formik.errors.title && formik.touched.title && (
              <div className="text-red-400 text-sm mt-2">
                {formik.errors.title}
              </div>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-neutral-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full px-3 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...formik.getFieldProps('description')}
            />
            {formik.errors.description && formik.touched.description && (
              <div className="text-red-400 text-sm mt-2">
                {formik.errors.description}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className={`w-full py-3 text-white font-semibold rounded-lg 
              ${
                formik.isSubmitting
                  ? 'bg-neutral-600 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700'
              } 
              transition-colors duration-300 disabled:bg-neutral-600 disabled:cursor-not-allowed`}
          >
            {formik.isSubmitting ? 'Adding Service...' : 'Add Service'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServiceForm;
