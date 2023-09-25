# genre_detail_dict erd 매핑

import pandas as pd

# 'bookwave_sum1.csv' 파일 읽기
df = pd.read_csv('bookwave_sum_1.csv', encoding='utf-8')

# 'genre_2' 열에서 고유한 값만 추출하여 DataFrame 생성
genre_2_df = df[['name']].drop_duplicates().reset_index(drop=True)
genre_2_df['id'] = range(1, len(genre_2_df) + 1)

# 도서 장르 소분류 CSV 파일 저장
genre_2_df.to_csv('genre_2.csv', index=False, encoding='utf-8-sig')
