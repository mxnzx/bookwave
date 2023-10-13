import DatePicker from "react-datepicker";
import styled from "styled-components";

export const Container = styled.div`
  margin-top: 5px;
`;

export const StyledDatePicker = styled(DatePicker)`
  font-size: 14px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  width: 250px;
  height: 30px;
  text-align: center;
  outline: none;
  cursor: pointer;
  
`;
