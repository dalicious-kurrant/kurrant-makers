/* eslint-disable react/require-default-props */
/* eslint-disable no-alert */
import {Navigate, Outlet} from 'react-router-dom';

function ProtectedRoute({redirectPath = '/'}) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인 후 사용해 주세요');
    return <Navigate to={redirectPath} replace={true} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
