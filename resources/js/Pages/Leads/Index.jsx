import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, leads, search }) {
    const [confirmDeleteId, setConfirmDeleteId] = useState(null); // State for the lead ID to delete
    const { data, setData, get } = useForm({ search: search || '' });

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        get(route('leads.index'), { data: { search: data.search }, preserveState: true });
    };
    const handleDelete = (id) => {
        setConfirmDeleteId(id); // Set the ID of the lead to delete
    };

    const confirmDelete = () => {
        // Use the delete link with method="delete"
        Inertia.delete(route('leads.destroy', confirmDeleteId), {
            onSuccess: () => {
                setConfirmDeleteId(null); // Close the popup after deletion
            }
        });
    };
    useEffect(() => {
        setData('search', search || '');
    }, [search]);
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Leads" />

            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">
                        Leads
                        <span className="text-sm text-gray-600 ml-2">
                            ({leads.from} - {leads.to} of {leads.total})
                        </span>
                    </h1>
                    <Link
                        href={route('leads.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Create Lead
                    </Link>
                </div>
                <form onSubmit={handleSearchSubmit} className="mb-4">
                    <input
                        type="text"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        placeholder="Search by Name or Email"
                        className="border rounded px-4 py-2"
                    />
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md">
                        Search
                    </button>
                </form>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Name</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Email</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Phone</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Status</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {leads.data.map((lead) => (
                            <tr key={lead.id}>
                                <td className="px-6 py-4 whitespace-no-wrap">{lead.name}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{lead.email}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{lead.phone}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">{lead.lead_status.name}</td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <Link href={route('leads.edit', lead.id)} className="text-blue-500 hover:text-blue-700">Edit</Link>
                                    <button
                                        onClick={() => handleDelete(lead.id)}
                                        className="text-red-500 hover:text-red-700 ml-4"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-end">
                    {leads.links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.url + (data.search ? `&search=${data.search}` : '')}
                            className={`mr-1 px-3 py-1 border rounded-md ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>

                {/* Confirmation Popup */}
                {confirmDeleteId && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                            <p>Are you sure you want to delete this lead?</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => setConfirmDeleteId(null)} // Close the popup without deleting
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>
                                <Link
                                    href={route('leads.destroy', confirmDeleteId)}
                                    method="delete"
                                    className="px-4 py-2 bg-red-600 text-white rounded"
                                    onClick={() => setConfirmDeleteId(null)} // Close the popup after deletion
                                >
                                    Delete
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
