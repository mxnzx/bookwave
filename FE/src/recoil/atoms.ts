import { atom } from "recoil";

export type Book = {
  bookImg: string;
  bookTitle: string;
  bookAuthor: string;
};

export type BookList = {
  [key: string]: Book[];
};
export type favoriteGenre = {
  id: number;
  name: string;
};

//오늘의 책 - 일기 기반 추천 책
export const todayBookState = atom<Book>({
  key: "todayBookState",
  default: {
    bookImg:
      "https://image.aladin.co.kr/product/27546/82/cover500/k302733492_1.jpg",
    bookTitle: "불펜의 시간",
    bookAuthor: "김유원",
  },
});

//책장 책 - 읽고 싶은 책
export const wishBooksState = atom<Book[]>({
  key: "wishBooksState",
  default: [
    {
      bookImg:
        "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
      bookTitle: "이토록 평범한 미래",
      bookAuthor: "김연수",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
      bookTitle: "경청",
      bookAuthor: "김혜진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
      bookTitle: "없음의 대명사",
      bookAuthor: "오은",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
      bookTitle: "무해한 복숭아",
      bookAuthor: "이은규",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
      bookTitle: "멀리 가는 느낌이 좋아",
      bookAuthor: "주민현",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
      bookTitle: "이토록 평범한 미래",
      bookAuthor: "김연수",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
      bookTitle: "경청",
      bookAuthor: "김혜진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
      bookTitle: "없음의 대명사",
      bookAuthor: "오은",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
      bookTitle: "무해한 복숭아",
      bookAuthor: "이은규",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
      bookTitle: "멀리 가는 느낌이 좋아",
      bookAuthor: "주민현",
    },
  ],
});

//책장 책 - 읽는 중인 책
export const readingBooksState = atom<Book[]>({
  key: "readingBooksState",
  default: [
    {
      bookImg:
        "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
      bookTitle: "이토록 평범한 미래",
      bookAuthor: "김연수",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
      bookTitle: "경청",
      bookAuthor: "김혜진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
      bookTitle: "없음의 대명사",
      bookAuthor: "오은",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
      bookTitle: "무해한 복숭아",
      bookAuthor: "이은규",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
      bookTitle: "멀리 가는 느낌이 좋아",
      bookAuthor: "주민현",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
      bookTitle: "이토록 평범한 미래",
      bookAuthor: "김연수",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
      bookTitle: "경청",
      bookAuthor: "김혜진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
      bookTitle: "없음의 대명사",
      bookAuthor: "오은",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
      bookTitle: "무해한 복숭아",
      bookAuthor: "이은규",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
      bookTitle: "멀리 가는 느낌이 좋아",
      bookAuthor: "주민현",
    },
  ],
});

//책장 책 - 다 읽은 책
export const doneBooksState = atom<Book[]>({
  key: "doneBooksState",
  default: [
    {
      bookImg:
        "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
      bookTitle: "이토록 평범한 미래",
      bookAuthor: "김연수",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
      bookTitle: "경청",
      bookAuthor: "김혜진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
      bookTitle: "없음의 대명사",
      bookAuthor: "오은",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
      bookTitle: "무해한 복숭아",
      bookAuthor: "이은규",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
      bookTitle: "멀리 가는 느낌이 좋아",
      bookAuthor: "주민현",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
      bookTitle: "이토록 평범한 미래",
      bookAuthor: "김연수",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
      bookTitle: "경청",
      bookAuthor: "김혜진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
      bookTitle: "없음의 대명사",
      bookAuthor: "오은",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
      bookTitle: "무해한 복숭아",
      bookAuthor: "이은규",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
      bookTitle: "멀리 가는 느낌이 좋아",
      bookAuthor: "주민현",
    },
  ],
});

export const favoriteGenreState=atom<favoriteGenre[]>({
    key:'favoriteGenreState',
    default:[
        {
            id:3,
            name:"문학"
        }
        ,{
            id:2,
            name:"인문학"
        }
        ,{
            id:5,
            name:"예술"
        }
    ]
});

export const bbtiBookListState = atom<Book[]>({
  key: "bbtiBookListState",
  default: [
    {
      bookImg:
        "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
      bookTitle: "이토록 평범한 미래",
      bookAuthor: "김연수",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
      bookTitle: "경청",
      bookAuthor: "김혜진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
      bookTitle: "없음의 대명사",
      bookAuthor: "오은",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
      bookTitle: "무해한 복숭아",
      bookAuthor: "이은규",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
      bookTitle: "멀리 가는 느낌이 좋아",
      bookAuthor: "주민현",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/32137/98/cover500/k562834401_1.jpg",
      bookTitle: "인간 실격",
      bookAuthor: "다자이 오사무",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31008/32/cover500/k902831319_1.jpg",
      bookTitle: "본심",
      bookAuthor: "히라노 게이치로",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/27225/29/cover500/k432732398_3.jpg",
      bookTitle: "완전한 행복",
      bookAuthor: "정유정",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30172/38/cover500/8936424823_1.jpg",
      bookTitle: "슬픔이 택배로 왔다",
      bookAuthor: "정호승",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/27546/82/cover500/k302733492_1.jpg",
      bookTitle: "불펜의 시간",
      bookAuthor: "김유원",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/25592/95/cover500/8954675441_1.jpg",
      bookTitle: "다시, 올리브",
      bookAuthor: "엘리자베스 스트라우트",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/26537/71/cover500/8932038236_1.jpg",
      bookTitle: "환한 숨",
      bookAuthor: "조해진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/26655/54/cover500/8954677606_1.jpg",
      bookTitle: "어쩌면 스무 번",
      bookAuthor: "편혜영",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/23596/72/cover500/8954671039_1.jpg",
      bookTitle: "내 휴식과 이완의 해",
      bookAuthor: "오테사 모시페그",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/24883/99/cover500/8932037558_1.jpg",
      bookTitle: "바비의 분위기",
      bookAuthor: "박민정",
    },
  ],
});

export const recentBookListState = atom<Book[]>({
  key: "recentBookListState",
  default: [
    {
      bookImg:
        "https://image.aladin.co.kr/product/32137/98/cover500/k562834401_1.jpg",
      bookTitle: "인간 실격",
      bookAuthor: "다자이 오사무",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/31008/32/cover500/k902831319_1.jpg",
      bookTitle: "본심",
      bookAuthor: "히라노 게이치로",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/27225/29/cover500/k432732398_3.jpg",
      bookTitle: "완전한 행복",
      bookAuthor: "정유정",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/30172/38/cover500/8936424823_1.jpg",
      bookTitle: "슬픔이 택배로 왔다",
      bookAuthor: "정호승",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/27546/82/cover500/k302733492_1.jpg",
      bookTitle: "불펜의 시간",
      bookAuthor: "김유원",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/25592/95/cover500/8954675441_1.jpg",
      bookTitle: "다시, 올리브",
      bookAuthor: "엘리자베스 스트라우트",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/26537/71/cover500/8932038236_1.jpg",
      bookTitle: "환한 숨",
      bookAuthor: "조해진",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/26655/54/cover500/8954677606_1.jpg",
      bookTitle: "어쩌면 스무 번",
      bookAuthor: "편혜영",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/23596/72/cover500/8954671039_1.jpg",
      bookTitle: "내 휴식과 이완의 해",
      bookAuthor: "오테사 모시페그",
    },
    {
      bookImg:
        "https://image.aladin.co.kr/product/24883/99/cover500/8932037558_1.jpg",
      bookTitle: "바비의 분위기",
      bookAuthor: "박민정",
    },
  ],
});

export const moodBookListState = atom<BookList>({
  key: "moodBookListState",
  default: {
    0: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
        bookTitle: "이토록 평범한 미래",
        bookAuthor: "김연수",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
        bookTitle: "경청",
        bookAuthor: "김혜진",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
        bookTitle: "없음의 대명사",
        bookAuthor: "오은",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
        bookTitle: "무해한 복숭아",
        bookAuthor: "이은규",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
        bookTitle: "멀리 가는 느낌이 좋아",
        bookAuthor: "주민현",
      },
    ],
    1: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/32137/98/cover500/k562834401_1.jpg",
        bookTitle: "인간 실격",
        bookAuthor: "다자이 오사무",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31008/32/cover500/k902831319_1.jpg",
        bookTitle: "본심",
        bookAuthor: "히라노 게이치로",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/27225/29/cover500/k432732398_3.jpg",
        bookTitle: "완전한 행복",
        bookAuthor: "정유정",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/30172/38/cover500/8936424823_1.jpg",
        bookTitle: "슬픔이 택배로 왔다",
        bookAuthor: "정호승",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/27546/82/cover500/k302733492_1.jpg",
        bookTitle: "불펜의 시간",
        bookAuthor: "김유원",
      },
    ],
    2: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/25592/95/cover500/8954675441_1.jpg",
        bookTitle: "다시, 올리브",
        bookAuthor: "엘리자베스 스트라우트",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/26537/71/cover500/8932038236_1.jpg",
        bookTitle: "환한 숨",
        bookAuthor: "조해진",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/26655/54/cover500/8954677606_1.jpg",
        bookTitle: "어쩌면 스무 번",
        bookAuthor: "편혜영",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/23596/72/cover500/8954671039_1.jpg",
        bookTitle: "내 휴식과 이완의 해",
        bookAuthor: "오테사 모시페그",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/24883/99/cover500/8932037558_1.jpg",
        bookTitle: "바비의 분위기",
        bookAuthor: "박민정",
      },
    ],
    3: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/32137/98/cover500/k562834401_1.jpg",
        bookTitle: "인간 실격",
        bookAuthor: "다자이 오사무",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31008/32/cover500/k902831319_1.jpg",
        bookTitle: "본심",
        bookAuthor: "히라노 게이치로",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/27225/29/cover500/k432732398_3.jpg",
        bookTitle: "완전한 행복",
        bookAuthor: "정유정",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/30172/38/cover500/8936424823_1.jpg",
        bookTitle: "슬픔이 택배로 왔다",
        bookAuthor: "정호승",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/27546/82/cover500/k302733492_1.jpg",
        bookTitle: "불펜의 시간",
        bookAuthor: "김유원",
      },
    ],
    4: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/25592/95/cover500/8954675441_1.jpg",
        bookTitle: "다시, 올리브",
        bookAuthor: "엘리자베스 스트라우트",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/26537/71/cover500/8932038236_1.jpg",
        bookTitle: "환한 숨",
        bookAuthor: "조해진",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/26655/54/cover500/8954677606_1.jpg",
        bookTitle: "어쩌면 스무 번",
        bookAuthor: "편혜영",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/23596/72/cover500/8954671039_1.jpg",
        bookTitle: "내 휴식과 이완의 해",
        bookAuthor: "오테사 모시페그",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/24883/99/cover500/8932037558_1.jpg",
        bookTitle: "바비의 분위기",
        bookAuthor: "박민정",
      },
    ],
    5: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/32220/74/cover500/k222834629_1.jpg",
        bookTitle: "어른의 국어력",
        bookAuthor: "김범준",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/8679/31/cover500/k372535696_2.jpg",
        bookTitle: "자존감 수업",
        bookAuthor: "윤홍균",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/11782/77/cover500/s502837239_1.jpg",
        bookTitle: "말 그릇",
        bookAuthor: "김윤나",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/32444/77/cover500/k712935290_1.jpg",
        bookTitle: "이번 주말의 도쿄",
        bookAuthor: "도쿄에 박키나",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31924/5/cover500/k602833859_1.jpg",
        bookTitle: "말과 태도 사이",
        bookAuthor: "유정임",
      },
    ],
    6: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
        bookTitle: "이토록 평범한 미래",
        bookAuthor: "김연수",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
        bookTitle: "경청",
        bookAuthor: "김혜진",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
        bookTitle: "없음의 대명사",
        bookAuthor: "오은",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
        bookTitle: "무해한 복숭아",
        bookAuthor: "이은규",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
        bookTitle: "멀리 가는 느낌이 좋아",
        bookAuthor: "주민현",
      },
    ],
  },
});

export const genreBookListState = atom<BookList>({
  key: "genreBookListState",
  default: {
    0: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/30211/80/cover500/8954680003_1.jpg",
        bookTitle: "이토록 평범한 미래",
        bookAuthor: "김연수",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/30396/7/cover500/8937472376_1.jpg",
        bookTitle: "경청",
        bookAuthor: "김혜진",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31635/80/cover500/8932041520_2.jpg",
        bookTitle: "없음의 대명사",
        bookAuthor: "오은",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31410/65/cover500/s912834104_2.jpg",
        bookTitle: "무해한 복숭아",
        bookAuthor: "이은규",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/32028/2/cover500/8936424904_1.jpg",
        bookTitle: "멀리 가는 느낌이 좋아",
        bookAuthor: "주민현",
      },
    ],
    1: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/32220/74/cover500/k222834629_1.jpg",
        bookTitle: "어른의 국어력",
        bookAuthor: "김범준",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/8679/31/cover500/k372535696_2.jpg",
        bookTitle: "자존감 수업",
        bookAuthor: "윤홍균",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/11782/77/cover500/s502837239_1.jpg",
        bookTitle: "말 그릇",
        bookAuthor: "김윤나",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/32444/77/cover500/k712935290_1.jpg",
        bookTitle: "이번 주말의 도쿄",
        bookAuthor: "도쿄에 박키나",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/31924/5/cover500/k602833859_1.jpg",
        bookTitle: "말과 태도 사이",
        bookAuthor: "유정임",
      },
    ],
    2: [
      {
        bookImg:
          "https://image.aladin.co.kr/product/25592/95/cover500/8954675441_1.jpg",
        bookTitle: "다시, 올리브",
        bookAuthor: "엘리자베스 스트라우트",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/26537/71/cover500/8932038236_1.jpg",
        bookTitle: "환한 숨",
        bookAuthor: "조해진",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/26655/54/cover500/8954677606_1.jpg",
        bookTitle: "어쩌면 스무 번",
        bookAuthor: "편혜영",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/23596/72/cover500/8954671039_1.jpg",
        bookTitle: "내 휴식과 이완의 해",
        bookAuthor: "오테사 모시페그",
      },
      {
        bookImg:
          "https://image.aladin.co.kr/product/24883/99/cover500/8932037558_1.jpg",
        bookTitle: "바비의 분위기",
        bookAuthor: "박민정",
      },
    ],
  },
});




// 은성 리코일 연습 -----------------------------------------------------------------------
// BBTI
export type bbti = {
  id: number;
  bbtiType: number;
  email: string;
  nickname: string;
  gender: string;
  profileImgName: string | null;
  profileImgPath: string | null;
  socialType: string;
  role: string;
  socialId: string;
};
export type bbtiList = {
  [key: number]: bbti[];
};

export const bbtiData = atom<bbtiList>({
  key: "bbtiData",
  default: {
    "1": [
      {
        id: 11,
        bbtiType: 1,
        email: "pro30343069@gmail.com",
        nickname: "소현1",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/소현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 12,
        bbtiType: 1,
        email: "pro30343069@gmail.com",
        nickname: "민지1",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/민지.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 13,
        bbtiType: 1,
        email: "pro30343069@gmail.com",
        nickname: "제혁1",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/제혁.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 14,
        bbtiType: 1,
        email: "pro30343069@gmail.com",
        nickname: "준호1",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/준호.JPEG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 15,
        bbtiType: 1,
        email: "pro30343069@gmail.com",
        nickname: "재현1",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/재현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
    ],
    "2": [
      {
        id: 21,
        bbtiType: 2,
        email: "pro30343069@gmail.com",
        nickname: "소현2",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/소현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 22,
        bbtiType: 2,
        email: "pro30343069@gmail.com",
        nickname: "민지2",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/민지.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 23,
        bbtiType: 2,
        email: "pro30343069@gmail.com",
        nickname: "제혁2",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/제혁.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 24,
        bbtiType: 2,
        email: "pro30343069@gmail.com",
        nickname: "준호2",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/준호.JPEG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 25,
        bbtiType: 2,
        email: "pro30343069@gmail.com",
        nickname: "재현2",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/재현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
    ],
    "3": [
      {
        id: 31,
        bbtiType: 3,
        email: "pro30343069@gmail.com",
        nickname: "소현3",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/소현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 32,
        bbtiType: 3,
        email: "pro30343069@gmail.com",
        nickname: "민지3",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/민지.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 33,
        bbtiType: 3,
        email: "pro30343069@gmail.com",
        nickname: "제혁3",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/제혁.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 34,
        bbtiType: 3,
        email: "pro30343069@gmail.com",
        nickname: "준호3",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/준호.JPEG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 35,
        bbtiType: 3,
        email: "pro30343069@gmail.com",
        nickname: "재현3",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/재현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
    ],
    "4": [
      {
        id: 41,
        bbtiType: 4,
        email: "pro30343069@gmail.com",
        nickname: "소현4",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/소현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 42,
        bbtiType: 4,
        email: "pro30343069@gmail.com",
        nickname: "민지4",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/민지.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 43,
        bbtiType: 4,
        email: "pro30343069@gmail.com",
        nickname: "제혁4",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/제혁.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 44,
        bbtiType: 4,
        email: "pro30343069@gmail.com",
        nickname: "준호4",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/준호.JPEG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 45,
        bbtiType: 4,
        email: "pro30343069@gmail.com",
        nickname: "재현4",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/재현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
    ],
    "5": [
      {
        id: 51,
        bbtiType: 5,
        email: "pro30343069@gmail.com",
        nickname: "소현5",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/소현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 52,
        bbtiType: 5,
        email: "pro30343069@gmail.com",
        nickname: "민지5",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/민지.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 53,
        bbtiType: 5,
        email: "pro30343069@gmail.com",
        nickname: "제혁5",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/제혁.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 54,
        bbtiType: 5,
        email: "pro30343069@gmail.com",
        nickname: "준호5",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/준호.JPEG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 55,
        bbtiType: 5,
        email: "pro30343069@gmail.com",
        nickname: "재현5",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/재현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
    ],
    "6": [
      {
        id: 61,
        bbtiType: 6,
        email: "pro30343069@gmail.com",
        nickname: "소현6",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/소현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 62,
        bbtiType: 6,
        email: "pro30343069@gmail.com",
        nickname: "민지6",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/민지.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 63,
        bbtiType: 6,
        email: "pro30343069@gmail.com",
        nickname: "제혁6",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/제혁.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 64,
        bbtiType: 6,
        email: "pro30343069@gmail.com",
        nickname: "준호6",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/준호.JPEG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 65,
        bbtiType: 6,
        email: "pro30343069@gmail.com",
        nickname: "재현6",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/재현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
    ],
    "7": [
      {
        id: 71,
        bbtiType: 7,
        email: "pro30343069@gmail.com",
        nickname: "소현7",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/소현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 72,
        bbtiType: 7,
        email: "pro30343069@gmail.com",
        nickname: "민지7",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/민지.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 73,
        bbtiType: 7,
        email: "pro30343069@gmail.com",
        nickname: "제혁7",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/제혁.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 74,
        bbtiType: 7,
        email: "pro30343069@gmail.com",
        nickname: "준호7",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/준호.JPEG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 75,
        bbtiType: 7,
        email: "pro30343069@gmail.com",
        nickname: "재현7",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/재현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
    ],
    "8": [
      {
        id: 81,
        bbtiType: 8,
        email: "pro30343069@gmail.com",
        nickname: "소현8",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/소현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 82,
        bbtiType: 8,
        email: "pro30343069@gmail.com",
        nickname: "민지8",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/민지.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 83,
        bbtiType: 8,
        email: "pro30343069@gmail.com",
        nickname: "제혁8",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/제혁.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 84,
        bbtiType: 8,
        email: "pro30343069@gmail.com",
        nickname: "준호8",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/준호.JPEG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
      {
        id: 85,
        bbtiType: 8,
        email: "pro30343069@gmail.com",
        nickname: "재현8",
        gender: "M",
        profileImgName: null,
        profileImgPath: "src/assets/images/재현.JPG",
        socialType: "KAKAO",
        role: "user",
        socialId: "3036400754",
      },
    ],
  },
});
