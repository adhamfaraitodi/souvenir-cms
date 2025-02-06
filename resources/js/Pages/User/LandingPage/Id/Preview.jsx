import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ title, html_code, css_code }) => {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            <style dangerouslySetInnerHTML={{ __html: css_code }} />
            <div dangerouslySetInnerHTML={{ __html: html_code }} />
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
