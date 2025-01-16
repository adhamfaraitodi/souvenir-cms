import Layout from "../../components/Layout";
import { userMenus } from "../../libs/menus";

const Dashboard = () => {
    return <div>Dashboard</div>;
};

Dashboard.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Dashboard;
