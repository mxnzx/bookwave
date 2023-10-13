# book 테이블에 genre_1 과 genre_2를 erd 매핑

import pandas as pd

# Step 1: genre_1 열 삭제
bookwave_sum_1 = pd.read_csv('bookwave_sum_1.csv')
bookwave_sum_1.drop(columns=['genre_1'], inplace=True)

# Step 2: genre_2 열 추가 및 매핑
genre_2 = pd.read_csv('genre_2.csv')
bookwave_sum_1['genre_detail_dict_id'] = bookwave_sum_1['genre_2'].map(genre_2.set_index('name')['id'])
bookwave_sum_1.drop(columns=['genre_2'], inplace=True)
# Step 3: 결과 저장
bookwave_sum_1.to_csv('booktable_1.csv', index=False,encoding='utf-8-sig')