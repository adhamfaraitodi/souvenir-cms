import Layout from "../../components/Layout";
import { adminMenus } from "../../libs/menus";

const LandingPage = () => {
    return <div>LandingPage</div>;
};

LandingPage.layout = (page) => <Layout children={page} menus={adminMenus} />;

export default LandingPage;
