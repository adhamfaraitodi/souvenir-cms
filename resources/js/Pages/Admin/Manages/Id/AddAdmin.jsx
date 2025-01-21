import Layout from "../../../../components/Layout";
import { adminMenus } from "../../../../libs/menus";

const Page = () => {
    return <div>Page</div>;
};

Page.layout = (page) => <Layout children={page} menus={adminMenus} />;

export default Page;
