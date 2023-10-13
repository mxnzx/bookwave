import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const useCheckAuthentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate('/login');
      swal({
        title: "알림",
        text: "로그인이 필요한 페이지입니다.",
        icon: "warning",
        buttons: {
          confirm: {
            text: "확인",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      });
    }
  }, [navigate]);
}

export default useCheckAuthentication;
