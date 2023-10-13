import BookSelectModal from '../../components/modals/FeedBookSelectModal/FeedBookSelect';
import '../../components/modals/FeedBookSelectModal/FeedBookSelect.styles';
import Copyright from '../../components/Feed/Copyright';
import Recode from '../../components/Feed/Recode';
import { SpinnerInfinity } from 'spinners-react';
import BBTI from '../../components/Feed/BBTI';
import { useEffect, useState } from 'react';
import { featchRecodeList, fetchUserInfo } from '../../apis';
import * as S from './FeedPage.styles';
import useCheckAuthentication from '../../utils/Hooks/useCheckAuthentication';

function FeedPage() {
  const [isBookSelectModalOpen, setIsBookSelectModalOpen] = useState(false); // 피드 추가 모달 상태
  const [items, setItems] = useState<number[]>([]);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const [isLoading, setIsLoading] = useState(false); // 스피너 상태
  const [userSeq, setUserSeq] = useState<number | null>(null);
  const [bbtiType, setBbitType] = useState<number | null>(null);
  const [maxItems, setMaxItems] = useState<number | null>(null);
  const [lastLoadedRecordId, setLastLoadedRecordId] = useState<number | null>(null);
  const openBookSelectModal = () => { setIsBookSelectModalOpen(true); };
  const closeBookSelectModal = () => { setIsBookSelectModalOpen(false); };

  useCheckAuthentication();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo();
        if (userInfo && userInfo.id) {
          setUserSeq(userInfo.id);
          setBbitType(userInfo.bbtiType);
          // console.log(userInfo.id);
          // 유저 id axios 보내서 list 받기
          const recodeList = await featchRecodeList(userInfo.id);
          const initialItems = recodeList.slice(0, 4);
          setItems(initialItems);
          setLastLoadedRecordId(initialItems[initialItems.length - 1]);

          setMaxItems(recodeList.length);
        } else {
          console.error("userInfo 또는 userSeq가 어?");
        }
      } catch (error) {
        console.error("유저 정보 부르는데 어?");
      }
    };
    loadUserInfo();
  }, []);

  // 무한 스크롤
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && hasMore && !isLoading) {
        setIsLoading(true); // 스피너 시작

        setTimeout(async () => {
          try {
            if (!userSeq || lastLoadedRecordId === null) return

            const recodeList = await featchRecodeList(userSeq);

            // 현재까지 로드된 마지막 아이템 이후의 데이터만 가져옴
            const filteredList = recodeList.filter((recordId: number) => recordId < lastLoadedRecordId);
            if (filteredList.length === 0) {
              setHasMore(false);
            } else {
              const newItems = filteredList.slice(0, 3);
              setItems(prevItems => [...prevItems, ...newItems]);
              setLastLoadedRecordId(newItems[newItems.length - 1]);

              if (maxItems && (items.length + newItems.length >= maxItems)) {
                setHasMore(false);
              }
            }
          } catch (error) {
            console.error("데이터를 가져오는데 실패했습니다.", error);
          } finally {
            setIsLoading(false);
          }
        }, 3000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, userSeq, lastLoadedRecordId]);

  return (
    <S.FeedContainer>
      {/* 좌 */}
      <S.FeedLeft />
      {/* 중앙 */}
      <S.FeedCenter>
        <>
          <S.FeedAdd >
            <S.PlusButton onClick={openBookSelectModal} >
              작성하기
            </S.PlusButton>
          </S.FeedAdd>
          <S.Feed>
            <S.BBTI_second>
              <BBTI bbtiType={bbtiType} userSeq={userSeq} />
            </S.BBTI_second> 
            <S.Right>
              <S.PlusButton_second onClick={openBookSelectModal} >
                작성하기
              </S.PlusButton_second>
            </S.Right>
            {items.map((recordId, idx) => (
              <S.RecodeBox key={idx}>
                {userSeq !== null && <Recode recordId={recordId} />}
              </S.RecodeBox>
            ))}
          </S.Feed>
        </>
        {isLoading &&
          <S.Spinner >
            로딩중 ...
            <SpinnerInfinity size={50} color="#ffffff" speed={100} />
          </S.Spinner>
        }
      </S.FeedCenter>

      {/* 우 */}
      <S.FeedRight>
        <S.BBTI>
          <BBTI bbtiType={bbtiType} userSeq={userSeq} />
        </S.BBTI>
        <S.Footer>
          <Copyright />
        </S.Footer>
      </S.FeedRight>

      {/* 모달 컴포넌트 */}
      <BookSelectModal isOpen={isBookSelectModalOpen} onClose={closeBookSelectModal} userSeq={userSeq} />
    </S.FeedContainer>
  );
}
export default FeedPage;