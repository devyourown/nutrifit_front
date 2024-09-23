import Coupon from "./coupon";
import UserOrder from "./order";
import Point from "./point";
import UserQnA from "./qna";
import UserReviews from "./reviews";
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
            case 'reviews':
                return <UserReviews token={token} />; // 리뷰 관리 페이지
            case 'qna':
                return <UserQnA token={token} />; // Q&A 관리 페이지
            default:
                return null;
    }
}