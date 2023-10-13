## 데이터 관련 
안녕하십니까 오늘부터 예비군을 가서 데이터 관련해서 REAMDME을 작성할까 합니다

일단 3일 동안 안나와서 정말 죄송합니다... 제가 UCC 시나리오 기가 막히게 짜보겠습니다 주인공은 미미!!!!

기대 기대

### 크롤링
> crawling/Selenuum.py
- chromedriver.exe이 파일이 있어야 한다(crawling폴더 안에 존재)
- crawling/data 폴더 안에 있는 데이터들을 크롤링 해야 한다
- 각 데이터들은 1000개씩 나눠져있다.
- 주의사항은 실행 버튼을 누르면 크롬 화면이 나오는데 꺼지거나 창을 내리면 안된다..
- 결과로 booktable폴더 안으로 book 테이블 데이터가 저장되고 review폴더안으로 각 도서의 리뷰들이 저장된다.
- 약 지금 18000개를 크롤링 해야 한다
- 크롤링 부터 하고 만약 다 할 시 아래 진행
### 원본 데이터
- bookdivide 폴더 안에 제가 20만개 데이터를 4000개씩 나눠서 저장했습니다
- 지금 현재 bookwave_11.csv까지 완료한 상태입니다.
- 따라서 bookwave_12.csv 부터 시작하면 됩니다.

### 알라딘 OPEN API
- bookwave_xx.csv을 파일을 알라딘 openapi로 통해 장르를 가져온다.
- 1_depth 장르와 2_depth 장르 까지 가져오기
- aladin/genre.py 파일로 실행시키기
- genre.py을 보면는 url = f"http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttbcjh9703241248001&Query={isbn}&QueryType=Title&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101" 에서 ttbcjh9703241248001 이 키를 알라딘 키.txt에서 바꾸면서 실행시킨다
- 하루에 키 하나당 5000개만 조회 가능ㅠㅠ
- 결과로 filtered_bookwave_x.csv로 저장된다
- 지금 filtered_bookwave_11.csv 까지 저장..

### 추가된 장르 하나의 csv로 합치기
- filter_sum.py로 filtered_bookwave_xx.csv파일들을 하나로 합친다
- 결과로 bookwave_sum_x.csv 파일 저장

### 장르 매핑하기

- genre_dict.py을 실행시켜 genre_dict 테이블과 genre_detail_dict 테이블을 매핑시키는 genre_1.csv와 genre_2.csv을 저장한다
- genre_dict_2.py을 실행시켜 genre_2.csv을 리펙토링 시키다
- 순서대로 진행

### book_table.py

- book 테이블과 매핑시킨다
- 결과로 booktable_x.csv파일 저장
- 이 파일로 또 다시 크롤링 시작 (1000개씩 나눠서 파일 저장 후)
- 무한 반복


## 주의 사항
모든 .py 파일은 시작 할 떄 파일을 읽어오는 거와 저장하는 코드가 맨 처음 마지막에 있는데
파일 명을 바꿔서 실행 시켜줘야 한다
