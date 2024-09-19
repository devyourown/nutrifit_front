import Coupon from "./coupon";
import UserOrder from "./order";
import Point from "./point";
import Setting from "./setting";

interface TabProps {
    token: string
    selectedTab: string;
    profileImage: string;
}

export default function Tab({token, selectedTab, profileImage}: TabProps) {
    switch (selectedTab) {
            case 'orders':
                return <UserOrder token={token} />;
            case 'points':
                return <Point token={token} />
            case 'coupons':
                return <Coupon token={token}/>
            case 'settings':
                return <Setting profileImage={profileImage}/>
            default:
                return null;
    }
}