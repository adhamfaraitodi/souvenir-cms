import React, { useEffect, useState } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import "grapesjs/dist/css/grapes.min.css";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ html_code, css_code, id }) => {
    const [editor, setEditor] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        html: "",
        css: "",
    });

    useEffect(() => {
        // Initialize GrapesJS
        const editor = grapesjs.init({
            container: "#gjs",
            fromElement: true,
            plugins: [gjsBlocksBasic, gjsPresetWebpage],
            pluginsOpts: {
                gjsBlocksBasic: {},
                gjsPresetWebpage: {},
            },
            storageManager: false,
            // Configure asset manager to use Laravel's file upload endpoint
            assetManager: {
                upload: '/api/upload-image',
                uploadName: 'image',
                assets: [],
                uploadFile: (e) => {
                    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
                    const formData = new FormData();

                    for (const file of files) {
                        formData.append('images[]', file);
                    }

                    // Include CSRF token
                    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

                    return axios.post('/api/upload-image', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'X-CSRF-TOKEN': csrfToken
                        }
                    })
                        .then(response => {
                            const uploadedImages = response.data.images || [];
                            const images = uploadedImages.map(img => ({
                                src: img.url,
                                name: img.name,
                                type: 'image'
                            }));
                            editor.AssetManager.add(images);
                            return { data: images };
                        })
                        .catch(error => {
                            console.error('Upload error:', error);
                            return { error: 'Upload failed' };
                        });
                }
            },
            // Enable panels for image uploads
            panels: {
                defaults: [
                    {
                        id: 'panel-devices',
                        el: '.panel__devices',
                        buttons: [{
                            id: 'device-desktop',
                            label: 'Desktop',
                            command: 'set-device-desktop',
                            active: true,
                            togglable: false,
                        }, {
                            id: 'device-mobile',
                            label: 'Mobile',
                            command: 'set-device-mobile',
                            togglable: false,
                        }],
                    }
                ]
            }
        });

        // Set the editor state and load content
        setEditor(editor);
        editor.setComponents(html_code);
        editor.setStyle(css_code);

        // Add commands for responsive previews
        editor.Commands.add('set-device-desktop', {
            run: (editor) => editor.setDevice('Desktop')
        });

        editor.Commands.add('set-device-mobile', {
            run: (editor) => editor.setDevice('Mobile')
        });

        // Cleanup on component unmount
        return () => {
            editor.destroy();
        };
    }, [html_code, css_code]);

    const handleExport = async (e) => {
        e.preventDefault();

        if (!editor) return;

        // Get updated HTML and CSS content from GrapesJS
        const htmlContent = editor.getHtml();
        const cssContent = editor.getCss();

        if (!htmlContent.trim()) {
            alert("HTML content cannot be empty!");
            return;
        }

        // Update form data
        setData({
            html: htmlContent,
            css: cssContent
        });

        // Submit the form data to Laravel backend
        post(`/templates/export/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                alert("Template saved successfully!");
            },
            onError: (errors) => {
                console.error("Export failed:", errors);
            },
        });
    };

    return (
        <div className="grapesjs-container">
            <div className="panel__devices"></div>
            <div id="gjs" style={{ height: "80vh", overflow: "hidden" }}></div>
            <div className="editor-tools mt-4 flex justify-between">
                <form onSubmit={handleExport} className="mt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className={`rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
                            processing ? "cursor-not-allowed opacity-50" : ""
                        }`}
                    >
                        {processing ? "Saving..." : "Save Template"}
                    </button>
                    {errors.html && (
                        <div className="mt-2 text-red-500">{errors.html}</div>
                    )}
                    {errors.css && (
                        <div className="mt-2 text-red-500">{errors.css}</div>
                    )}
                </form>
            </div>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
