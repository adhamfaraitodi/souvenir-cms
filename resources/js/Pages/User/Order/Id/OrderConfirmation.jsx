import Layout from "../../../../components/Layout";
import { userMenus } from "../../../../libs/menus";

const Page = () => {
    return <div>Page</div>;
};

Page.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Page;
