import React, { useState, useRef, useEffect } from "react";
import defaultImg from "../../assets/icons/profile.png";
import {
  checkNickName,
  updateMemberProfile,
  fetchMemberProfile,
  updateWithDrawal,
} from "../../apis";
import * as S from "./UserEditPage.styles";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { accessTokenState } from "../../recoil";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileImageState } from "../../recoil/member";
import { useParams } from 'react-router-dom';
import useCheckAuthentication from "../../utils/Hooks/useCheckAuthentication";

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const {memberId: memberIdString } = useParams();
  const propsMemberId = Number(memberIdString);

  const memberId = Number(localStorage.getItem("memberId"));
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [isValidNickName, setIsValidNickName] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [requestFile, setRequestFile] = useState<File | undefined>(undefined);
  const setToken = useSetRecoilState<string | null>(accessTokenState);
  const [profileImg, setProfileImg] = useRecoilState(profileImageState);
  const [profileImg2, setProfileImg2] = useState<string>(profileImg);
  const [originalNickName, setOriginalNickName] = useState<string>("");
  useCheckAuthentication();

  // 회원 정보 불러오기
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        console.log(propsMemberId);
        console.log(memberId);
        if (Number(propsMemberId) !== memberId) {
          navigate('/notfound');
        }
        const res = await fetchMemberProfile();
        setProfileImg(res.profileImgPath);
        setProfileImg2(res.profileImgPath);
        setNickName(res.nickname);
        setOriginalNickName(res.nickname);
        setEmail(res.email);
      } catch (error) {
        console.error("회원 정보 불러오기 에러", error);
      }
    };
    fetchProfileInfo();
  }, []);
  // 닉네임 가져오기
  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    if (originalNickName !== e.target.value) {
      setIsValidNickName(null); // 닉네임이 변경될 때 중복체크 상태 초기화
    }
  };
  // 닉네임 유효성 체크
  const checkVaild = (nickName: string) => {
    const length = nickName.length;
    return length >= 2 && length <= 8;
  };
  // 닉네임 중복 체크
  const handleCheckNickName = async () => {
    try {
      const res = await checkNickName(nickName);
      if (res.success === true) {
        setIsValidNickName(true);
      } else {
        setIsValidNickName(false);
      }
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file && file.type.includes("image")) {
      setRequestFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg2(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire("⚠️ Image 파일 형식을 선택해주세요 :)");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // 회원 정보 수정 요청
  const handleUpdate = async () => {
    try {
      if (originalNickName !== nickName && isValidNickName !== true) {
        Swal.fire("WARNING", "닉네임 중복체크를 해주세요!", "warning");
        return;
      }
      const nickname = { "nickname": nickName };
      await updateMemberProfile(memberId, nickname, requestFile);
      localStorage.setItem("nickName", nickName)
      setProfileImg(profileImg2)
      Swal.fire("SUCCESS", "회원 정보 수정이 완료 되었습니다", "success");
      navigate(-1)
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire("WARNING", "회원정보수정이 실패했습니다.", "warning");
    }
  };
  // 회원 탈퇴 요청
  const handleWithDrawal = async () => {
    try {
      Swal.fire({
        title: "회원 탈퇴 확인",
        text: "회원 탈퇴를 진행하려면 '회원 탈퇴하겠습니다'라고 입력해주세요.",
        input: "text",
        inputPlaceholder: "회원탈퇴하겠습니다",
        showCancelButton: true,
        confirmButtonColor: "#9DCEDC",
        cancelButtonColor: "#064469",
        confirmButtonText: "탈퇴하기",
        cancelButtonText: "취소",
      }).then(async (result) => {
        if (result.isConfirmed) {
          if (result.value === "회원 탈퇴하겠습니다") {
            await updateWithDrawal();
            Swal.fire(
              "회원 탈퇴 완료!",
              "회원 탈퇴가 완료되었습니다.",
              "success"
            );
            setToken(null);
            localStorage.removeItem("memberId");
            localStorage.removeItem("nickName");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("isFirstLogin");
            navigate("/");
          } else {
            Swal.fire(
              "⚠️ 텍스트가 일치하지 않습니다.",
              "정확한 텍스트를 입력하여 다시 시도해주세요.",
              "warning"
            );
          }
        }
      });
    } catch (error) {
      console.error("Error during withdrawal:", error);
      Swal.fire("⚠️ Error during withdrawal. Please try again.");
    }
  };

  return (
    <S.LayOut>
      <S.Container>
        <S.ProfileImg src={profileImg2 || defaultImg} />
        <S.ProfileChangeBtn onClick={handleImageClick}>
          프로필 이미지 변경
        </S.ProfileChangeBtn>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <S.TitleBox>
          <S.Title>닉네임</S.Title>
        </S.TitleBox>
        <S.NickNameBox>
          <S.NickNameInput
            placeholder="2자이상 8자 이내로 작성해주세요"
            value={nickName}
            onChange={handleNickNameChange}
          />
          <S.CheckButton onClick={handleCheckNickName}>중복체크</S.CheckButton>
        </S.NickNameBox>
        {nickName && checkVaild(nickName) === false && (
          <S.ErrorText>사용 불가능한 아이디입니다.</S.ErrorText>
        )}
        {nickName &&
          checkVaild(nickName) === true &&
          isValidNickName === true && (
            <S.SuccessText>사용 가능한 닉네임입니다.</S.SuccessText>
          )}
        {nickName &&
          checkVaild(nickName) === true &&
          isValidNickName === false && (
            <S.ErrorText>이미 사용중인 닉네임입니다.</S.ErrorText>
          )}
        <S.Text>(2자이상 8자 이하로 입력해주세요)</S.Text>
        <S.TitleBox>
          <S.Title>이메일</S.Title>
        </S.TitleBox>
        <S.InputBox value={email} disabled />
        <S.SignOut>
          <S.SignOutText onClick={handleWithDrawal}>
            회원 탈퇴하기
          </S.SignOutText>
        </S.SignOut>
        <S.SubmitBox>
          <S.SubmitButton onClick={handleUpdate}>변경</S.SubmitButton>
          <S.CancleButton onClick={() => navigate(-1)}>취소</S.CancleButton>
        </S.SubmitBox>
      </S.Container>
    </S.LayOut>
  );
};
export default UserEditPage;



