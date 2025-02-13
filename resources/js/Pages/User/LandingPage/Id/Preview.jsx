import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = ({ title, html_code, css_code }) => {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="mb-6 text-2xl font-bold">{title}</h1>
            <div className="h-screen w-full border">
                <style dangerouslySetInnerHTML={{ __html: css_code }} />
                <div dangerouslySetInnerHTML={{ __html: html_code }} />
            </div>
        </div>
    );
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
