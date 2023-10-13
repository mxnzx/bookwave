import pandas as pd

# 여러 개의 CSV 파일을 리스트에 저장
csv_files = ["genre_filtered/filtered_bookwave_1.csv", "genre_filtered/filtered_bookwave_2.csv", "genre_filtered/filtered_bookwave_3.csv", "genre_filtered/filtered_bookwave_4.csv", "genre_filtered/filtered_bookwave_6.csv"
             ,"genre_filtered/filtered_bookwave_7.csv","genre_filtered/filtered_bookwave_8.csv","genre_filtered/filtered_bookwave_9.csv",]

# CSV 파일들을 읽어서 리스트로 저장
df = [pd.read_csv(file) for file in csv_files]

# 각 DataFrame을 합치기
merged_dataframe = pd.concat(df, ignore_index=True)

merged_dataframe['id'] = range(1, len(merged_dataframe) + 1)

merged_dataframe.to_csv('bookwave_sum_1.csv', index=False, encoding='utf-8-sig')