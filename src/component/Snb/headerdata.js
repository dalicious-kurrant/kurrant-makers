import {ReactComponent as Dashboard} from '../../assets/snb/dashboard.svg';
import {ReactComponent as Speaker} from '../../assets/snb/speaker.svg';
import {ReactComponent as Product} from '../../assets/snb/product.svg';
import {ReactComponent as MakersInfo} from '../../assets/snb/makersInfo.svg';
import {ReactComponent as Calendar} from '../../assets/snb/calendar.svg';
import {ReactComponent as Stock} from '../../assets/snb/stock.svg';
import {ReactComponent as Diagram} from '../../assets/snb/diagram.svg';
import {ReactComponent as Money} from '../../assets/snb/money.svg';
import {ReactComponent as Schedule} from '../../assets/snb/schedule.svg';
import {ReactComponent as ActiveDash} from '../../assets/snb/active/dashboard.svg';
import {ReactComponent as ActiveSpeaker} from '../../assets/snb/active/speaker.svg';
import {ReactComponent as ActiveCalendar} from '../../assets/snb/active/calendar.svg';
import {ReactComponent as ActiveStock} from '../../assets/snb/active/stock.svg';
import {ReactComponent as ActiveProduct} from '../../assets/snb/active/product.svg';
import {ReactComponent as ActiveSchedule} from '../../assets/snb/active/schedule.svg';
import {ReactComponent as ActiveMakersInfo} from '../../assets/snb/active/makersInfo.svg';
import {ReactComponent as ActiveDiagram} from '../../assets/snb/active/diagram.svg';
import {ReactComponent as ActiveMoney} from '../../assets/snb/active/money.svg';
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
    key: '상품관리',
    path: '/product',
    icon: <Product />,
    activeIcon: <ActiveProduct />,
    label: <a href="/product">상품관리</a>,
  },
  {
    key: '판매 관리',
    path: '/sales/schedule',
    icon: <Calendar />,
    activeIcon: <ActiveCalendar />,
    label: <a href="/sales/schedule">판매 관리</a>,
  },
  {
    key: '일정 관리',
    path: '/calendar',
    icon: <Schedule />,
    activeIcon: <ActiveSchedule />,
    label: <a href="/calendar">일정 관리</a>,
  },
  {
    key: '메이커스 정보',
    path: '/makersInfo',
    icon: <MakersInfo />,
    activeIcon: <ActiveMakersInfo />,
    label: <a href="/makersInfo">메이커스 정보</a>,
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
    key: '정산 관리',
    path: '/calculate',
    icon: <Money />,
    activeIcon: <ActiveMoney />,
    label: <a href="/product">정산 관리</a>,
  },
];
