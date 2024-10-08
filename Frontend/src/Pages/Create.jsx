import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Baseurl';

function Create() {
    const [values, setValues] = useState({
        name: '',
        category: '',
        quantity: ''
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post(`${baseUrl}/add_grocery`, values)
            .then((res) => {
                navigate('/');
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl transform transition-all hover:scale-105">
                <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Grocery Item</h3>

                <div className="mb-4 text-center">
                    <Link to='/' className='text-white bg-indigo-600 px-4 py-2 rounded shadow-md hover:bg-indigo-700 transition-all'>
                        Home
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1 font-semibold text-gray-700">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            required 
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        <label htmlFor="quantity" className="mb-1 font-semibold text-gray-700">Quantity</label>
                        <input 
                            type="number" 
                            name="quantity" 
                            required 
                            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onChange={(e) => setValues({...values, quantity: e.target.value})} 
                        />
                    </div>

                    <div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
