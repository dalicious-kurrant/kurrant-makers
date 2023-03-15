import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styled, {css} from 'styled-components';

import LoginPage from './pages/Login/LoginPage';
import ProductPage from './pages/Product/ProductPage';
import ProductDetailPage from './pages/Product/ProductDetailPage';
import MakersInfoPage from './pages/MakersInfo/MakersInfoPage';
import Notice from './pages/Notice/Notice';
import Detail from './pages/Detail/Detail';
import Calculate from './pages/Calculate/Calculate';
import Calendar from './pages/Calendar/Calendar';
import Stock from './pages/Stock/Stock';
import Sidebar from './component/Snb/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Schedule from './pages/SalesCalendar/Schedule';
import ScrollToTop from './Shared/ScrollToTop';
import PrivateRoute from './PrivateRoute';

function Router() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {token !== null && <Sidebar />}
      <ScrollToTop />
      <Container token={token}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute redirectPath="/" />}>
            <Route path="/product" element={<ProductPage />} />
            <Route path="/productDetail/:id" element={<ProductDetailPage />} />
            <Route path="/makersInfo" element={<MakersInfoPage />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/calculate" element={<Calculate />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/main" element={<Dashboard />} />
            <Route path="/sales/schedule" element={<Schedule />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;

const Container = styled.div`
  ${({token}) => {
    if (token !== null) {
      return css`
        min-width: 1000px;
        @media (max-width: 768px) {
          min-width: 768px;
        }
      `;
    } else {
      return css`
        flex: 4;
      `;
    }
  }}
  margin-left: ${({token}) => (token === null ? '0px' : '280px')};
  @media (max-width: 768px) {
    margin-left: 10px;
  }

  overflow-x: auto;
`;
