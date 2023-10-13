# genre_dict erd 매핑
import pandas as pd

# 'bookwave_sum1.csv' 파일 읽기
df = pd.read_csv('bookwave_sum_1.csv', encoding='utf-8')

# 'genre_1' 열에서 고유한 값만 추출하여 DataFrame 생성
genre_1_df = df[['genre_1']].drop_duplicates().reset_index(drop=True)
genre_1_df['id'] = range(1, len(genre_1_df) + 1)


# 도서 장르 대분류 CSV 파일 저장
genre_1_df.to_csv('genre_1.csv', index=False, encoding='utf-8-sig')

# 'genre_2.csv' 파일에서 'genre_1' 열을 사용하여 연결
genre_2_df = df[['genre_2', 'genre_1']].drop_duplicates().reset_index(drop=True)
genre_2_df = genre_2_df.merge(genre_1_df, left_on='genre_1', right_on='genre_1', how='left')
genre_2_df.rename(columns={'id_x': 'id', 'genre_2_x': 'name', 'id_y': 'genre_dict_id'}, inplace=True)
# genre_2_df = genre_2_df[['id', 'name', 'genre_dict_id']]

# 도서 장르 소분류 CSV 파일 저장
genre_2_df.to_csv('genre_2.csv', index=False, encoding='utf-8-sig')

# 'genre_2.csv' 파일 읽기
df = pd.read_csv('genre_2.csv', encoding='utf-8')

# 'genre_1' 열 제거
df.drop(columns=['genre_1'], inplace=True)

# '원래 id' 열을 'genre_dict_id'로 이름 변경
df.rename(columns={'id': 'genre_dict_id'}, inplace=True)

# 'id' 열 추가
df['id'] = range(1, len(df) + 1)


# 'genre_1' 열을 'name'으로 이름 변경
df.rename(columns={'genre_2': 'name'}, inplace=True)

# 열 순서 변경
df = df[['id', 'genre_dict_id', 'name']]



# 수정된 DataFrame을 'genre_2.csv' 파일로 저장
df.to_csv('genre_2.csv', index=False, encoding='utf-8-sig')

genre_1_df.rename(columns={'genre_1': 'name'}, inplace=True)
genre_1_df = genre_1_df[['id', 'name']]

genre_1_df.to_csv('genre_1.csv', index=False, encoding='utf-8-sig')