import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
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
import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {pageWidthAtom} from './utils/store/store';
import Header from './component/Snb/Header';
import DailyFood from './pages/DailyFood/DailyFoodPage';
import ReviewPage from './pages/Review/ReviewPage';
import {isUrlReviewAtom} from './pages/Review/store';
import MakersCalcDetail from './pages/Calculate/components/MakersCalcDetail';
import {useState} from 'react';
import NoticeDetail from './pages/Notice/components/NoticeDetail';

function Router() {
  const token = localStorage.getItem('token');
  const [innerWidth, setInnerWidth] = useAtom(pageWidthAtom);
 

  const [isUrlReview, setIsUrlReview] = useAtom(isUrlReviewAtom);

  useEffect(() => {
    const resizeListener = () => {
      // console.log(window.innerWidth);
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeListener);
  });

  return (
    <BrowserRouter>
      <ScrollToTop />
      {token !== null && (innerWidth > 768 ? <Sidebar /> : <Header />)}
      <Container token={token} isUrlReview={isUrlReview} id="container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute redirectPath="/" />}>
            <Route path="/product" element={<ProductPage />} />
            <Route path="/productDetail/:id" element={<ProductDetailPage />} />
            <Route path="/makersInfo" element={<MakersInfoPage />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/calculate" element={<Calculate />} />
            <Route path="/calculate/detail" element={<MakersCalcDetail />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/dailyfood" element={<DailyFood />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/main" element={<Dashboard />} />
            <Route path="/sales/schedule" element={<Schedule />} />
            <Route path="/review" element={<ReviewPage />} />
            <Route path="/notice/detail" element={<NoticeDetail />} />
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
          max-width: ${window.innerWidth}px;
        }
      `;
    } else {
      return css`
        flex: 4;
      `;
    }
  }}

  ${({isUrlReview}) => {
    if (isUrlReview) {
      return css`
        flex: 1;
      `;
    }
  }}


  margin-left: ${({token, isUrlReview}) =>
    token === null ? '0px' : isUrlReview ? '256px' : '280px'};

  @media (max-width: 768px) {
    margin-left: 0px;
  }

  overflow-x: auto;
`;
