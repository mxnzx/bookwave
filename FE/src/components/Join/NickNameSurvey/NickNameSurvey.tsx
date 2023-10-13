import { checkNickName, updateNickName } from "../../../apis";
import swal from "sweetalert";
import { useState } from "react";
import * as S from "./NickNameSurvey.styles";

interface NickNameSurveyProps {
  onConfirm: () => void; // 콜백 prop 정의
}

const NickNameSurvey: React.FC<NickNameSurveyProps> = ({
  onConfirm = () => {},
}) => {
  const [nickName, setNickName] = useState("");
  const [isValidNickName, setIsValidNickName] = useState<boolean | null>(null);

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
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
  console.log(isValidNickName, checkVaild(nickName));

  // 닉네임 변경 요청
  const handleUpdateNickName = async () => {
    if (isValidNickName === null) {
      swal("Reminder", "닉네임 중복 체크를 해주세요.", "info");
      return;
    }
    if (isValidNickName && checkVaild(nickName)) {
      try {
        const res = await updateNickName(nickName);
        if (res.success === true) {
          swal("SUCCESS", "닉네임이 변경되었습니다.", "success");
          localStorage.setItem("nickName", nickName);
          onConfirm();
        } else {
          swal("Error", "닉네임 변경에 실패했습니다.", "info");
        }
      } catch (error) {
        console.error("NickName Check Error:", error);
        swal("Error", "닉네임 중복 체크에 실패했습니다.", "info");
      }
    } else {
      swal("Error", "닉네임을 다시 입력해주세요.", "info");
    }
  };

  return (
      <S.Container>
        <S.Wrapper>
          <S.TitleBox>
            <S.Title>닉네임 설정</S.Title>
          </S.TitleBox>
          <S.Hr />
          <S.NickNameBox>
            <S.NickNameInput
              placeholder="닉네임을 입력해주세요"
              value={nickName}
              onChange={handleNickNameChange}
            />
            <S.CheckButton onClick={handleCheckNickName}>
              중복체크
            </S.CheckButton>
          </S.NickNameBox>
          {nickName && checkVaild(nickName) === false && (
            <S.ErrorText>사용 불가능한 아이디입니다.</S.ErrorText>
          )}
          {nickName && checkVaild(nickName) === true && isValidNickName === true && (
            <S.SuccessText>사용 가능한 닉네임입니다.</S.SuccessText>
          )}
          {nickName && checkVaild(nickName) === true && isValidNickName === false && (
            <S.ErrorText>이미 사용중인 닉네임입니다.</S.ErrorText>
          )}
          <S.Text>(2자이상 8자 이하로 입력해주세요)</S.Text>
          <S.SubmitBox>
            <S.SubmitButton onClick={handleUpdateNickName}>확인</S.SubmitButton>
          </S.SubmitBox>
        </S.Wrapper>
      </S.Container>
  );
};
export default NickNameSurvey;
