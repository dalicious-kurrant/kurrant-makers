import {Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = () => {
  // 토큰값이 만료에 따라 로그인 로그아웃
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};
export default PrivateRoute;
