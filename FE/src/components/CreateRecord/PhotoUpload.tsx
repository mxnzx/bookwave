import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading'; // react-images-uploading 패키지를 불러옵니다.
import * as S from './PhotoUpload.styles'; // 스타일 파일을 불러옵니다.

interface PhotoUploadProps {
  onUpload: (imageFile: File | undefined) => void;
}

function PhotoUpload({ onUpload }: PhotoUploadProps) {
  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 1; // 최대 이미지 업로드 개수를 1로 설정

  const onChange = (imageList: ImageListType) => {
    // 이미지가 업로드될 때 호출되는 콜백 함수
    setImages(imageList);
    onUpload(imageList[0]?.file || undefined);
  };

  return (
    <S.Container>
      <S.HeaderText>사진 업로드</S.HeaderText>
      <S.UnderLine />
      <S.Main>
        <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey='imageFile'>
          {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
            <S.Box className='upload__image-wrapper'>
              {imageList.length === 0 ? (
                <>
                  <S.Alrt>대표 이미지를 올려주세요 <br />
                    미 첨부시 책표지가 대표이미지로 선정됩니다.</S.Alrt>
                    <S.ImageContainer>
                      <button onClick={onImageUpload}>이미지 업로드</button>
                    </S.ImageContainer>
                  {/* <S.ButtonUpload style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps} /> */}
                </>
              ) : (
                <>
                <S.Alrt>대표 이미지를 올려주세요 <br />
                미 첨부시 책표지가 대표이미지로 선정됩니다.</S.Alrt>
                <S.ImageContainer>
                  <S.ImageItemBox>
                    <img src={imageList[0]['imageFile']} alt='' style={{ maxHeight: '100%', maxWidth: '100%' }} />
                    <S.updateBtn onClick={() => onImageUpdate(0)}><p>수정하기</p></S.updateBtn>
                    <S.deleteBtn onClick={() => onImageRemove(0)}></S.deleteBtn>
                  </S.ImageItemBox>
                  <S.ButtonWrapper>
                    {/* <S.ButtonUpdate onClick={() => onImageUpdate(0)} />
                    <S.ButtonRemove onClick={() => onImageRemove(0)} /> */}
                  </S.ButtonWrapper>
                </S.ImageContainer>
                </>
              )}
            </S.Box>
          )}
        </ImageUploading>
      </S.Main>
    </S.Container>
  );
}

export default PhotoUpload;
