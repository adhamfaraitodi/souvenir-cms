import React, { useEffect, useState, useRef, useCallback } from "react";
import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import gjsBlocksBasic from "grapesjs-blocks-basic";
import axios from "axios";
import "grapesjs/dist/css/grapes.min.css";
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ html_code, css_code, id }) => {
    const editorRef = useRef(null);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});
    const saveButtonRef = useRef(null);

    const handleSave = useCallback(async () => {
        if (!editorRef.current) return;

        const editor = editorRef.current;
        const htmlContent = editor.getHtml();
        const cssContent = editor.getCss();

        if (!htmlContent.trim()) {
            alert("HTML content cannot be empty!");
            return;
        }

        setProcessing(true);
        setErrors({});

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        try {
            await axios.post(`/templates/export/${id}`, {
                html: htmlContent,
                css: cssContent
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken
                }
            });

            alert("Template saved successfully!");
        } catch (error) {
            console.error("Export failed:", error);

            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);

                Object.entries(error.response.data.errors).forEach(([key, value]) => {
                    console.error(`${key}: ${value}`);
                });
            } else {
                alert("Failed to save template. Please try again.");
            }
        } finally {
            setProcessing(false);
        }
    }, [id]);

    useEffect(() => {
        // Initialize the editor
        const editor = grapesjs.init({
            container: "#gjs",
            fromElement: true,
            plugins: [gjsBlocksBasic, gjsPresetWebpage],
            pluginsOpts: {
                gjsBlocksBasic: {},
                gjsPresetWebpage: {},
            },
            storageManager: false,
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

        editorRef.current = editor;

        editor.setComponents(html_code);
        editor.setStyle(css_code);

        editor.Commands.add('set-device-desktop', {
            run: (editor) => editor.setDevice('Desktop')
        });

        editor.Commands.add('set-device-mobile', {
            run: (editor) => editor.setDevice('Mobile')
        });

        if (!editor.Panels.getPanel('options')) {
            editor.Panels.addPanel({
                id: 'options',
                el: '.panel__options',
                buttons: [],
            });
        }

        // Add save button
        editor.Panels.addButton('options', {
            id: 'save-template',
            className: 'fa fa-save',
            // label: 'Save',
            command: 'save-template',
            attributes: { title: 'Save Template' }
        });

        editor.Commands.add('save-template', {
            run: () => {
                handleSave();
                return false;
            }
        });

        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [html_code, css_code, id, handleSave]);

    return (
        <div className="grapesjs-container">
            <div className="panel__devices"></div>
            <div className="panel__options"></div>
            <div id="gjs" style={{ height: "80vh", overflow: "hidden" }}></div>

            {Object.keys(errors).length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
                    <h3 className="text-red-700 font-medium">Error saving template:</h3>
                    {Object.entries(errors).map(([key, message]) => (
                        <div key={key} className="text-red-600">{message}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
