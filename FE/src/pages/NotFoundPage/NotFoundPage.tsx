import * as S from './NotFoundPage.style';
import video from '../../assets/videos/404.mp4';

function NotFoundPage() {
    return (
        <S.Container>
            <S.StyledVideo autoPlay loop muted>
                <source src={video} />
            </S.StyledVideo>
            <S.Description>
                ⚠️
            </S.Description>
            <S.Description>
                잘못된 접근 경로입니다.
            </S.Description>
        </S.Container>
    );
}

export default NotFoundPage;
