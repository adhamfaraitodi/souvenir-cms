import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";
import { useState } from "react";
import axios from "axios";
const Page = ({ }) => {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="mb-6 text-2xl font-bold">Form Data Landing Page</h1>
            <h2 className="mb-6 text-xl ">Under construction</h2>

            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <input type="text" name="corporate_name" placeholder="Corporate Name" onChange={handleChange} required />*/}
            {/*    <input type="file" name="corporate_image" onChange={handleChange} />*/}
            {/*    <input type="text" name="title" placeholder="Title" onChange={handleChange} required />*/}
            {/*    <input type="text" name="subtitle" placeholder="Subtitle" onChange={handleChange} required />*/}
            {/*    <h4>Content No. 1</h4>*/}
            {/*    <textarea name="content_text" placeholder="Content Text" onChange={handleChange} required />*/}
            {/*    <input type="file" name="content_image" onChange={handleChange} />*/}
            {/*    <h4>Content No. 2</h4>*/}
            {/*    <textarea name="content_text" placeholder="Content Text" onChange={handleChange} required />*/}
            {/*    <input type="file" name="content_image" onChange={handleChange} />*/}
            {/*    <h4>Content No. 3</h4>*/}
            {/*    <textarea name="content_text" placeholder="Content Text" onChange={handleChange} required />*/}
            {/*    <input type="file" name="content_image" onChange={handleChange} />*/}
            {/*    <input type="file" name="gallery_images" multiple onChange={handleGalleryChange} />*/}
            {/*    <button type="submit">Submit</button>*/}
            {/*</form>*/}
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
