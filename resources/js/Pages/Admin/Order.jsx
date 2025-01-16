import Layout from "../../components/Layout";
import { adminMenus } from "../../libs/menus";

const Order = () => {
    return <div>Order</div>;
};

Order.layout = (page) => <Layout children={page} menus={adminMenus} />;

export default Order;
