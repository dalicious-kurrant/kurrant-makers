import {useEffect} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import instance from '../../Shared/axios';

const Login = () => {
  const navigate = useNavigate();

  const [loginCheck, setLoginCheck] = useState(false);
  const initialInput = {code: '', password: ''};
  const [input, setInput] = useState(initialInput);
  // const [clickReady, setClickReady] = useState(false);

  const validation = input.code !== '' && input.password !== '';

  const handleChange = e => {
    e.preventDefault();
    const {id, value} = e.target;
    setInput({...input, [id]: value});
  };

  // useEffect(() => {
  //   if (input.code && input.password) {
  //     setClickReady(true);
  //   } else {
  //     setClickReady(false);
  //   }
  // }, [input]);

  const handleSubmit = async () => {
    try {
      const res = await instance.post('/makers/login', input);
      console.log(res.status, 'status');
      if (res.status === 200) {
        const accessToken = res.data.data.accessToken;
        localStorage.setItem('token', accessToken);
        localStorage.setItem('makersName', res.data.data.name);
        navigate('/product');
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 401) {
        setLoginCheck(true);
      }
    }
    // axios.post('http://3.39.196.44:8884/v1/makers/login', input).then(res => {
    //   console.log(res.data);
    // });
    // console.log(input);
  };

  return (
    <Form>
      <Title>로그인</Title>

      <Input
        type="text"
        required
        id="code"
        onChange={handleChange}
        placeholder="그룹 인증코드를 입력하세요"
        value={input['code']}
        status={loginCheck}
      />
      <Input
        type="password"
        required
        id="password"
        onChange={handleChange}
        placeholder="비밀번호를 입력하세요"
        value={input['password']}
        status={loginCheck}
      />
      {loginCheck && <Error>인증코드, 비밀번호가 올바르지 않습니다.</Error>}
      <LoginButton disabled={!validation} onClick={handleSubmit}>
        로그인
      </LoginButton>
    </Form>
  );
};

export default Login;

const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 90%;
  background-color: ${props => props.theme.colors.white};
  height: 56px;
  padding: 0 18px;
  font-size: 16px;
  border: 0.5px solid
    ${({theme, status}) => (status ? '#eb5757' : theme.colors.grey[2])};
  border-radius: 8px;
  margin-bottom: 10px;
  outline: none;

  ::placeholder {
    color: ${({theme}) => theme.colors.grey[2]};
  }
`;

const LoginButton = styled.button`
  width: 90%;
  height: 56px;
  border-radius: 8px;
  margin-top: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({disabled}) => !disabled && 'white'};
  background: ${({theme, disabled}) =>
    disabled
      ? theme.colors.grey[1]
      : 'linear-gradient(270deg, #0A0AA4 0%, #3D00E6 57.86%, #5A1EFF 100%)'};
  border: none;
  font-weight: 600;
`;

const Error = styled.span`
  color: #eb5757;
`;
