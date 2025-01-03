import { FaEnvelope, FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import './Contact.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    organization: Yup.string().required('Organization is required'),
    email: Yup.string().email('Invalid email format'),
    contact: Yup.string()
      .required('Contact is required')
      .matches(/^[0-9]{10}$/, 'Contact must be a 10-digit number'),
    website: Yup.string()
      .url('Invalid URL (Eg: https://www.linkedin.com/company/brandspark-in/) ')
      .required('URL is required'),
    services: Yup.array(),
    budget: Yup.string(),
    source: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      organization: '',
      email: '',
      contact: '',
      website: '',
      services: [],
      budget: '',
      source: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/contact`,
          values
        );
        if (response.data.message === 'Form submitted successfully') {
          toast.success('Form submitted successfully');
          formik.resetForm();
          setFormKey((prevKey) => prevKey + 1);
        } else {
          toast.error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="contact-page">
      <div className="container">
        <motion.div
          className="contact-form"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>Get in Touch</h2>
          <form key={formKey} onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="flex flex-col">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                  className="ip-4"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="error-text  text-sm text-red-500 -mt-1">
                    {formik.errors.name}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Your Organization&apos;s Name *</label>
                <input
                  type="text"
                  name="organization"
                  value={formik.values.organization}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="ip-4"
                />
                {formik.touched.organization && formik.errors.organization && (
                  <p className="error-text  text-sm text-red-500 -mt-1">
                    {formik.errors.organization}
                  </p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="flex flex-col">
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="ip-4"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="error-text  text-sm text-red-500 -mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label>Your Contact *</label>
                <input
                  type="tel"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="ip-4"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <p className="error-text  text-sm text-red-500 -mt-1">
                    {formik.errors.contact}
                  </p>
                )}
              </div>
            </div>

            <label>Website / Social Media Link *</label>
            <input
              type="url"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.website && formik.errors.website && (
              <p className="error-text text-sm text-red-500 -mt-1">
                {formik.errors.website}
              </p>
            )}

            <label>What services are you interested in?</label>
            <div className="checkbox-group">
              {[
                'Branding',
                'Graphic Design',
                'Motion Graphics',
                'Digital Marketing',
                'Social Media Management',
              ].map((service) => (
                <label key={service}>
                  <input
                    type="checkbox"
                    name="services"
                    value={service}
                    onChange={formik.handleChange}
                  />
                  {service}
                </label>
              ))}
            </div>

            <button type="submit flex">
              {loading ? (
                <div className='flex items-center justify-center'>
                  <FaSpinner className="animate-spin mr-2" />
                  Let&apos;s Connect!
                </div>
              ) : (
                "Let's Connect!"
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          className="contact-info"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut',
          }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2>
            Let’s make it <br /> a reality!
          </h2>
          <p>
            We&apos;re excited to work with you soon! Please share your details
            &amp; we&apos;ll get back in 2-3 working days.
          </p>
          <p>Contact</p>
          <p className="flex items-center">
            <FaEnvelope />
            <a href="mailto:brandspark.in@gmail.com" className="pl-2">
              brandspark.in@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
