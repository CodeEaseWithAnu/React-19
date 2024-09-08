import React, { useState } from 'react';
import axios from 'axios';
import './ReactForm.css'; // Import the CSS file

// Define the asynchronous function to handle form submission
async function submitProductData(formData) {
  const name = formData.get('name');
  const description = formData.get('description');

  try {
    // Log data being sent for debugging
    console.log('Sending product data:', { name, description });

    const response = await axios.post('http://localhost:5001/products', {
      name,
      description,
    });

    // Log the response for debugging
    console.log('Response:', response);

    if (response.status === 201) {
      return { error: null, data: 'Product submitted successfully!' };
    } else {
      throw new Error('Failed to submit product.');
    }
  } catch (error) {
    console.error('Error:', error);
    return { error: error.message };
  }
}

const TraditionalForm = () => {
  // State for form response and submission status
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [result, setResult] = useState({ error: null, data: null });
  const [isPending, setIsPending] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);

    const formElement = event.target;
    const formData = new FormData(formElement);

    const submissionResult = await submitProductData(formData);
    setResult(submissionResult);

    setIsPending(false);
  };

  // Function to update form state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Description:</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>

        {/* Display result messages below the form */}
        <div className="messages">
          {result.data && <p className="success">{result.data}</p>}
          {result.error && <p className="error">{result.error}</p>}
        </div>
      </form>
    </div>
  );
};

export default TraditionalForm;
