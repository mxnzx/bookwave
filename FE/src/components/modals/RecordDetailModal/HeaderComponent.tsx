import * as S from "./HeaderComponent.styles";
import TempImage from '@/assets/Images/TempImage.jpg';

function HeaderComponent() {
    return (
        <S.Header>
            <S.Image src={TempImage} alt="Temp Image" />
            <S.NickName>
                SiverCastle
            </S.NickName>
            <S.TextRight>
                팔로잉 or OO형
            </S.TextRight>
        </S.Header>
    );
}

export default HeaderComponent;
