import {ReactComponent as Dashboard} from '../../assets/snb/dashboard.svg';
import {ReactComponent as Speaker} from '../../assets/snb/speaker.svg';
import {ReactComponent as Product} from '../../assets/snb/product.svg';
import {ReactComponent as MakersInfo} from '../../assets/snb/makersInfo.svg';
import {ReactComponent as Calendar} from '../../assets/snb/calendar.svg';
import {ReactComponent as Stock} from '../../assets/snb/stock.svg';
import {ReactComponent as Diagram} from '../../assets/snb/diagram.svg';
import {ReactComponent as Money} from '../../assets/snb/money.svg';
import {ReactComponent as Schedule} from '../../assets/snb/schedule.svg';
import {ReactComponent as DailyFood} from '../../assets/snb/dailyfood.svg';
import {ReactComponent as Review} from '../../assets/snb/review.svg';
import {ReactComponent as ActiveDailyFood} from '../../assets/snb//active/dailyfood.svg';
import {ReactComponent as ActiveDash} from '../../assets/snb/active/dashboard.svg';
import {ReactComponent as ActiveSpeaker} from '../../assets/snb/active/speaker.svg';
import {ReactComponent as ActiveCalendar} from '../../assets/snb/active/calendar.svg';
import {ReactComponent as ActiveStock} from '../../assets/snb/active/stock.svg';
import {ReactComponent as ActiveProduct} from '../../assets/snb/active/product.svg';
import {ReactComponent as ActiveSchedule} from '../../assets/snb/active/schedule.svg';
import {ReactComponent as ActiveMakersInfo} from '../../assets/snb/active/makersInfo.svg';
import {ReactComponent as ActiveDiagram} from '../../assets/snb/active/diagram.svg';
import {ReactComponent as ActiveMoney} from '../../assets/snb/active/money.svg';
import {ReactComponent as ActiveReview} from '../../assets/snb/active/review.svg';
import DailyFoodPage from '../../pages/DailyFood/DailyFoodPage';
export const menuData = [
  // {
  //   name: '대시보드',
  //   path: '/main',
  //   icon: <Dashboard />,
  //   activeIcon: <ActiveDash />,
  // },
  // {
  //   name: '공지사항',
  //   path: '/notice',
  //   icon: <Speaker />,
  //   activeIcon: <ActiveSpeaker />,
  // },
  {
    name: '상품관리',
    path: '/product',
    icon: <Product />,
    activeIcon: <ActiveProduct />,
  },
  {
    name: '판매 관리',
    path: '/sales/schedule',
    icon: <Calendar />,
    activeIcon: <ActiveCalendar />,
  },
  {
    name: '식단 요청 승인/거절',
    path: '/calendar',
    icon: <Schedule />,
    activeIcon: <ActiveSchedule />,
  },
  {
    name: '식단 조회',
    path: '/dailyfood',
    icon: <DailyFood />,
    activeIcon: <ActiveDailyFood />,
  },
  {
    name: '메이커스 정보',
    path: '/makersInfo',
    icon: <MakersInfo />,
    activeIcon: <ActiveMakersInfo />,
  },

  // {
  //   name: '재고 관리',
  //   path: '/stock',
  //   icon: <Stock />,
  //   activeIcon: <ActiveStock />,
  // },
  // {
  //   name: '상세현황',
  //   path: '/detail',
  //   icon: <Diagram />,
  //   activeIcon: <ActiveDiagram />,
  // },
  {
    name: '정산 관리',
    path: '/calculate',
    icon: <Money />,
    activeIcon: <ActiveMoney />,
  },
  {
    name: '리뷰 관리',
    path: '/review',
    icon: <Review />,
    activeIcon: <ActiveReview />,

  },
];
