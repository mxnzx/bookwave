import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading'; // react-images-uploading 패키지를 불러옵니다.
import * as S from './EditPhotoUpload.styles'; // 스타일 파일을 불러옵니다.

interface PhotoUploadProps {
  onUpload: (imageFile: File | undefined) => void;
  recordImageUrl: string | null;  // 타입 변경
  setRecordImageUrl: React.Dispatch<React.SetStateAction<string | null>>;  // 타입 변경
}

function PhotoUpload({ onUpload, recordImageUrl, setRecordImageUrl }: PhotoUploadProps) {
  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 1; // 최대 이미지 업로드 개수를 1로 설정

  const onChange = (imageList: ImageListType) => {
    // 이미지가 업로드될 때 호출되는 콜백 함수
    setImages(imageList);
    onUpload(imageList[0]?.file || undefined);
  };

  return (
    <S.Container>
      <S.HeaderText>서비스 업로드</S.HeaderText>
      <S.UnderLine />
      <S.Main>
        <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey='data_url'>
          {/* ImageUploading 컴포넌트 내에서 이미지 업로드 UI를 구현 */}
          {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
            <S.Box className='upload__image-wrapper'>
              {imageList.length === 0 ? (
                <>
                  {recordImageUrl ? (
                    <S.ImageItem>
                      <S.ImageItemBox>
                        <img src={recordImageUrl} alt='' style={{ maxHeight: '100%', maxWidth: '100%' }} />
                      </S.ImageItemBox>
                      <S.ButtonWrapper>
                        <S.ButtonUpdate onClick={() => onImageUpload()} />
                        <S.ButtonRemove onClick={() => {
                          onImageRemove(0);
                          setRecordImageUrl(null);
                        }} />
                      </S.ButtonWrapper>
                    </S.ImageItem>
                  ) : (
                    <>
                      <S.Alrt>사진 업로드를 하지 않을 시, 등록했었던 이미지로 대체됩니다!!!</S.Alrt>
                      <S.ButtonUpload style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps} />
                    </>
                  )}
                </>
              ) : (
                <S.ImageItem>
                  <S.ImageItemBox>
                    <img src={imageList[0]['data_url']} alt='' style={{ maxHeight: '100%', maxWidth: '100%' }} />
                  </S.ImageItemBox>
                  <S.ButtonWrapper>
                    <S.ButtonUpdate onClick={() => onImageUpdate(0)} />
                    <S.ButtonRemove onClick={() => onImageRemove(0)} />
                  </S.ButtonWrapper>
                </S.ImageItem>
              )}
            </S.Box>
          )}
        </ImageUploading>
      </S.Main>
    </S.Container>
  );
}

export default PhotoUpload;
