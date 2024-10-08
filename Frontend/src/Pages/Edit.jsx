import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Baseurl';

function Edit() {
    const { id } = useParams(); // Get the id from the URL
    const [values, setValues] = useState({
        name: '',
        category: '',
        quantity: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGrocery = async () => {
            try {
                const response = await axios.get(`${baseUrl}/groceries/${id}`);
                setValues(response.data);
            } catch (error) {
                console.error('Error fetching grocery:', error);
            }
        };

        fetchGrocery();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`${baseUrl}/groceries/${id}`, values)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">Edit Grocery Item</h3>

                <div className="mb-4 text-center">
                    <Link to='/' className='text-white bg-green-500 px-4 py-2 rounded hover:bg-green-600'>Home</Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-semibold">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={values.name}
                            required 
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={(e) => setValues({...values, name: e.target.value})} 
                        />
                    </div>

                    <div className="flex flex-col">
                    <label htmlFor="category" className="mb-1 font-semibold text-gray-700">Category</label>
                        <select 
                            name="category" 
                            required 
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setValues({...values, category: e.target.value})} 
                        >
                            <option value="" disabled selected>Select a category</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="quantity" className="mb-1 font-semibold">Quantity</label>
                        <input 
                            type="number" 
                            name="quantity" 
                            value={values.quantity}
                            required 
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            onChange={(e) => setValues({...values, quantity: e.target.value})} 
                        />
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Edit;
