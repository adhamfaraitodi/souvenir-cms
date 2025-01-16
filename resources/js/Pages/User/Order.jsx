import Layout from "../../components/Layout";
import { userMenus } from "../../libs/menus";

const Order = () => {
    return <div>Order</div>;
};

Order.layout = (page) => <Layout children={page} menus={userMenus} />;

export default Order;
