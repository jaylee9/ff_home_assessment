import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, leads, search }) {
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [customPage, setCustomPage] = useState(''); // State to store the custom page input
    const { data, setData, get } = useForm({ search: search || '' });

    // Handle search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        get(route('leads.index'), { data: { search: data.search }, preserveState: true });
    };

    // Handle delete confirmation
    const handleDelete = (id) => {
        setConfirmDeleteId(id);
    };

    // Confirm deletion and reset confirmation state
    const confirmDelete = () => {
        Inertia.delete(route('leads.destroy', confirmDeleteId), {
            onSuccess: () => {
                setConfirmDeleteId(null);
            }
        });
    };

    // Prefill search input with search query
    useEffect(() => {
        setData('search', search || '');
    }, [search]);

    // Prefetch adjacent pages without causing navigation
    useEffect(() => {
        const fetchPageData = async (page) => {
            try {
                const response = await fetch(route('leads.index', { page }), {
                    method: 'GET',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                    }
                });

                if (response.ok) {
                    await response.json();
                }
            } catch (error) {
                console.error('Error fetching page data:', error);
            }
        };

        // Prefetch previous page if it exists
        if (leads.current_page > 1) {
            fetchPageData(leads.current_page - 1);
        }

        // Prefetch next page if it exists
        if (leads.current_page < leads.last_page) {
            fetchPageData(leads.current_page + 1);
        }
    }, [leads.current_page, leads.last_page]);

    // Generate pagination buttons with ellipsis for large number of pages
    const paginationButtonsToShow = (currentPage, lastPage) => {
        let pages = [];

        // Always show the first page
        pages.push(1);

        // Add ellipsis if far from the first page
        if (currentPage > 3) {
            pages.push('...');
        }

        // Show pages around the current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, lastPage - 1); i++) {
            pages.push(i);
        }

        // Add ellipsis if far from the last page
        if (currentPage < lastPage - 2) {
            pages.push('...');
        }

        // Always show the last page
        if (lastPage > 1) {
            pages.push(lastPage);
        }

        return pages;
    };

    // Handle custom page form submission
    const handleCustomPageSubmit = (e) => {
        e.preventDefault();
        const page = parseInt(customPage, 10);

        // Check if the page is valid and within range
        if (page && page > 0 && page <= leads.last_page) {
            const queryParams = { page };

            // Add 'search' parameter only if it is not empty
            if (data.search) {
                queryParams.search = data.search;
            }

            // Use Inertia's get method to navigate with query parameters
            get(route('leads.index', queryParams), { preserveState: true });
        }
    };

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

                {/* Search form */}
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

                {/* Leads table */}
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

                {/* Pagination and Go to Page */}
                <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                    {/* Form to go to specific page */}
                    <form onSubmit={handleCustomPageSubmit} className="flex items-center mb-4 md:mb-0">
                        <label htmlFor="page-number" className="mr-2 text-sm font-medium text-gray-700">Page:</label>
                        <input
                            type="number"
                            id="page-number"
                            value={customPage}
                            onChange={(e) => setCustomPage(e.target.value)}
                            className="border px-3 py-2 rounded-md w-20 text-center"
                            min="1"
                            max={leads.last_page}
                        />
                        <button type="submit" className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md">Go</button>
                    </form>

                    {/* Pagination buttons */}
                    <div className="flex justify-end items-center">
                        {/* Previous page button */}
                        {leads.prev_page_url && (
                            <Link
                                href={leads.prev_page_url + (data.search ? `&search=${data.search}` : '')}
                                className="mr-1 px-3 py-1 border rounded-md bg-white text-blue-500"
                            >
                                Previous
                            </Link>
                        )}

                        {/* Numbered page buttons */}
                        {paginationButtonsToShow(leads.current_page, leads.last_page).map((page, index) =>
                            page === '...' ? (
                                <span key={index} className="mr-1 px-3 py-1">...</span>
                            ) : (
                                <Link
                                    key={index}
                                    href={route('leads.index', { page }) + (data.search ? `&search=${data.search}` : '')}
                                    className={`mr-1 px-3 py-1 border rounded-md ${page === leads.current_page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                                >
                                    {page}
                                </Link>
                            )
                        )}

                        {/* Next page button */}
                        {leads.next_page_url && (
                            <Link
                                href={leads.next_page_url + (data.search ? `&search=${data.search}` : '')}
                                className="mr-1 px-3 py-1 border rounded-md bg-white text-blue-500"
                            >
                                Next
                            </Link>
                        )}
                    </div>
                </div>

                {/* Confirmation popup for deletion */}
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
