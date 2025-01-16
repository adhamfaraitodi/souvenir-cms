import Layout from "../../components/Layout";
import { userMenus } from "../../libs/menus";

const LandingPage = () => {
    return <div>LandingPage</div>;
};

LandingPage.layout = (page) => <Layout children={page} menus={userMenus} />;

export default LandingPage;
