import Layout from "../../components/Layout";
import { adminMenus } from "../../libs/menus";

const Dashboard = () => {
    return <div>Dashboard</div>;
};

Dashboard.layout = (page) => <Layout children={page} menus={adminMenus} />;

export default Dashboard;
