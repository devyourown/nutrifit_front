import Coupon from "./coupon";
import UserOrder from "./order";
import Point from "./point";
import Setting from "./setting";

interface TabProps {
    token: string
    selectedTab: string;
    name: string;
    email: string;
    profileImage: string;
}

export default function Tab({token, selectedTab, name, email, profileImage}: TabProps) {
    switch (selectedTab) {
            case 'orders':
                return <UserOrder token={token} />;
            case 'points':
                return <Point token={token} />
            case 'coupons':
                return <Coupon token={token}/>
            case 'settings':
                return <Setting name={name} email={email} profileImage={profileImage}/>
            default:
                return null;
    }
}