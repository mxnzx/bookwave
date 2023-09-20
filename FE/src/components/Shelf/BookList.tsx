import * as S from './BookList.styles';

type Props = {
    state: number;
}

function BookList({ state }: Props) {

    return (
        <S.Container>
            {state}
        </S.Container>
    );

}
export default BookList;