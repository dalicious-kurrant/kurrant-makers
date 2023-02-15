import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import styled from 'styled-components';

import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/MainPage';
import ProductPage from './pages/Product/ProductPage';
import ProductDetailPage from './pages/Product/ProductDetailPage';
import MakersInfoPage from './pages/MakersInfo/MakersInfoPage';
import {getToken} from './Shared/localStorage';
import Notice from './pages/Notice/Notice';
import Detail from './pages/Detail/Detail';
import Calculate from './pages/Calculate/Calculate';
import Calendar from './pages/Calendar/Calendar';
import Stock from './pages/Stock/Stock';
import ProductInfoPage from './pages/ProductInfo/ProductInfoPage';
import Sidebar from './component/Snb/Sidebar';
import NavBar from './component/Gnb/Navbar';

function Router() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      {token !== null && <Sidebar />}
      <Container>
        <Routes>
          {token === null && <Route path="/login" element={<LoginPage />} />}
          <Route path="/product" element={<ProductPage />} />
          <Route path="/productDetail/:id" element={<ProductDetailPage />} />
          <Route path="/makersInfo" element={<MakersInfoPage />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/calculate" element={<Calculate />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/productInfo" element={<ProductInfoPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;

const Container = styled.div`
  flex: 4;
`;
