import * as S from './Calendar.styles';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarComponentProps {
    placeholderText: string;
    onDateSelect: (date: Date) => void;
}

function Calendar({ placeholderText, onDateSelect }: CalendarComponentProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date) => {
        if (onDateSelect) {
            onDateSelect(date);
        }
        // console.log(onDateSelect + '선택한 날짜:', date);
        setSelectedDate(date);
    };

    return (
        <S.Container>
            <S.StyledDatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                maxDate={new Date()} // 최소 날짜 설정 (오늘 이후만 선택 가능)
                dateFormat='yyyy년 MM월 dd일' // 날짜 및 시간 형식
                // showTimeSelect // 시간 선택 활성화
                // timeIntervals={15} // 15분 간격으로 시간 선택
                // dateFormat='yyyy/MM/dd HH:mm' // 날짜 및 시간 형식
                // timeCaption='시간' // 시간 레이블
                placeholderText={placeholderText}
            />
        </S.Container>
    );
}

export default Calendar;
