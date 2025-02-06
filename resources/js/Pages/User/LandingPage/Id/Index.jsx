import React, { useEffect } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ html_code, css_code }) => {
    useEffect(() => {
        const editor = grapesjs.init({
            container: '#gjs',
            fromElement: true,
            plugins: ['gjs-blocks-basic'],
            storageManager: false,
        });
        editor.setComponents(html_code);
        editor.setStyle(css_code);
        return () => {
            editor.destroy();
        };
    }, [html_code, css_code]);

    return (
        <div>
            <div id="gjs"></div>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
