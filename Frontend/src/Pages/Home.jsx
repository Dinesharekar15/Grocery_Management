import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../Baseurl';

function Home() {
    const [groceries, setGroceries] = useState([]);

    useEffect(() => {
        const fetchGroceries = async () => {
            try {
                const response = await axios.get(`${baseUrl}/groceries`);
                setGroceries(response.data);
            } catch (error) {
                console.error('Error fetching groceries:', error);
            }
        };

        fetchGroceries();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}/groceries/${id}`);
            setGroceries(groceries.filter((grocery) => grocery.id !== id));
        } catch (error) {
            console.error('Error deleting grocery:', error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <h1 className="text-4xl font-extrabold text-white my-10">Grocery List</h1>
            
            <div className="mb-6">
                <Link to="/create" className="text-white bg-indigo-600 px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-all">
                    + Add Grocery Item
                </Link>
            </div>
            
            <div className="overflow-x-auto w-full max-w-5xl">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold">Sr. No.</th>
                            <th className="py-3 px-4 text-left font-semibold">Name</th>
                            <th className="py-3 px-4 text-left font-semibold">Category</th>
                            <th className="py-3 px-4 text-left font-semibold">Quantity</th>
                            <th className="py-3 px-4 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groceries.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-6 text-gray-500">No groceries found</td>
                            </tr>
                        ) : (
                            groceries.map((grocery, index) => (
                                <tr key={grocery.id} className="hover:bg-gray-50 transition-all">
                                    <td className="py-4 px-6 border-t">{index + 1}</td>
                                    <td className="py-4 px-6 border-t">{grocery.name}</td>
                                    <td className="py-4 px-6 border-t">{grocery.Category}</td>
                                    <td className="py-4 px-6 border-t">{grocery.Quantity}</td>
                                    <td className="py-4 px-6 border-t flex space-x-4">
                                        <Link 
                                            to={`/edit/${grocery.id}`} 
                                            className="text-indigo-600 hover:text-indigo-800 font-semibold"
                                        >
                                            Edit
                                        </Link>
                                        <button 
                                            onClick={() => handleDelete(grocery.id)} 
                                            className="text-red-600 hover:text-red-800 font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
