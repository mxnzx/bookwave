import pandas as pd

# CSV 파일 읽기 (예: UTF-8에서 cp949로 변경)
df = pd.read_csv('genre_2.csv', encoding='utf-8')

# 다시 CSV 파일로 저장 (cp949로 변경)
df.to_csv('genre_detail_dict.csv', encoding='cp949', errors='replace', index=False)
