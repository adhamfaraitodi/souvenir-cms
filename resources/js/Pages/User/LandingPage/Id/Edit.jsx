import React, { useState } from 'react';
import {router, useForm} from '@inertiajs/react';
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ landingPage, themes }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: landingPage.title || '',
        theme_id: landingPage.theme_id || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/landing-page/project-update/${landingPage.id}`, data, {
            preserveScroll: true,
        });
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Edit Landing Page</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Landing Page Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter landing page title"
                        required
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="theme_id"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Select Theme
                    </label>
                    <select
                        id="theme_id"
                        value={data.theme_id}
                        onChange={(e) => setData('theme_id', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select a theme</option>
                        {themes.map((theme) => (
                            <option key={theme.id} value={theme.id}>
                                {theme.title}
                            </option>
                        ))}
                    </select>
                    {errors.theme_id && (
                        <p className="text-red-500 text-xs mt-1">{errors.theme_id}</p>
                    )}
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
