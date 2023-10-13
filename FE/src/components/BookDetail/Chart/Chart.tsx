import React from "react";
import ApexChart from "react-apexcharts";
import * as S from "./Chart.styles";
import { Tablet } from "../../../utils/MediaQuery/BookDetailMQ";
import { useRecoilValue } from "recoil";
import { bookDetailState } from "../../../recoil/book";
import icon from "../../../assets/icons/sad.png";


interface BBTIChartItem {
  bbtiType: string;
  bbtiCnt: number;
}

interface EmotionChartItem {
  emotionType: string;
  emotionPercent: number;
}

interface BookData {
  bbtiChartList?: BBTIChartItem[];
  emotionChartList?: EmotionChartItem[];
}

const Chart: React.FC = () => {
  const bookData: BookData | null = useRecoilValue(bookDetailState);

  const bbtiLabels = bookData?.bbtiChartList?.map((item) => item.bbtiType) || [];
  const bbtiSeriesData = bookData?.bbtiChartList?.map((item) => item.bbtiCnt) || [];
  const emotionLabels = bookData?.emotionChartList?.map((item) => item.emotionType) || [];
  const emotionSeries = bookData?.emotionChartList?.map((item) => item.emotionPercent) || [];
  const isBBTIDataEmpty = bbtiSeriesData.reduce((acc, curr) => acc + curr, 0) === 0;
  const isEmotionDataEmpty = !emotionSeries.length;

  const bbtiOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        distributed: true,
      }
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: bbtiLabels,
      labels: {
        show: false,
      }
    },
    yaxis: {
      forceNiceScale: true,
      tickAmount: 4,
    }
  };

  const bbtiSeries = [{
    name: 'BBTI 수',
    data: bbtiSeriesData,  // 여기에 bbtiSeriesData를 적용합니다.
  }];

  const emotionOptions = {
    chart: {
      type: "donut" as const,
    },
    labels: emotionLabels,
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val.toFixed(1) + "%"; // 퍼센트로 변경하기 위해 100을 곱함
      },
    },
    colors: [
      "#008FFB",
      "#00E396",
      "#FEB019",
      "#FF4560",
      "#775DD0",
      "#2c22e6",
      "#ff6868",
      "#44e2fe",
    ],
  };

  return (
    <S.Container>
      <S.BBTIChartWrap>
        <S.Title>
          이런 <S.PointTitle>BBTI</S.PointTitle>가 관심을 가지고 있어요
        </S.Title>
        <S.BBTIChartBox>
          {isBBTIDataEmpty ? (
            <S.EmptyBox>
              <S.EmptyText>데이터가 부족해요</S.EmptyText>
              <S.EmptyIcon src={icon} />
            </S.EmptyBox>
          ) : (
            <ApexChart type="bar" series={bbtiSeries} options={bbtiOptions} />
          )}
        </S.BBTIChartBox>
      </S.BBTIChartWrap>
      <Tablet>
        <S.Hr />
      </Tablet>
      <S.BBTIChartWrap>
        <S.Title>
          이 책을 읽고 이런 <S.PointTitle>감정</S.PointTitle>을 느껴요
        </S.Title>
        <S.BBTIChartBox>
          {isEmotionDataEmpty ? (
            <S.EmptyBox>
              <S.EmptyText>데이터가 부족해요</S.EmptyText>
              <S.EmptyIcon src={icon} />
            </S.EmptyBox>
          ) : (
            <ApexChart type="donut" series={emotionSeries} options={emotionOptions} />
          )}
        </S.BBTIChartBox>
      </S.BBTIChartWrap>
    </S.Container>
  );
};
export default Chart;
