import {ReactComponent as Dashboard} from '../../assets/snb/dashboard.svg';
import {ReactComponent as Speaker} from '../../assets/snb/speaker.svg';
import {ReactComponent as Product} from '../../assets/snb/product.svg';
import {ReactComponent as MakersInfo} from '../../assets/snb/makersInfo.svg';
import {ReactComponent as Calendar} from '../../assets/snb/calendar.svg';
import {ReactComponent as Stock} from '../../assets/snb/stock.svg';
import {ReactComponent as Diagram} from '../../assets/snb/diagram.svg';
import {ReactComponent as Money} from '../../assets/snb/money.svg';
export const menuData = [
  {name: '대시보드', path: '/', icon: <Dashboard />},
  {name: '공지사항', path: '/notice', icon: <Speaker />},
  {name: '메이커스 정보', path: '/makersInfo', icon: <MakersInfo />},
  {name: '상품관리', path: '/product', icon: <Product />},
  {name: '일정 관리', path: '/calendar', icon: <Calendar className="active" />},
  {name: '재고 관리', path: '/stock', icon: <Stock />},
  {name: '상세현황', path: '/detail', icon: <Diagram />},
  {name: '정산 관리', path: '/calculate', icon: <Money />},
];
