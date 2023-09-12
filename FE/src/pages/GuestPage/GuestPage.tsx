import { Header } from './GuestPage.styles';
import HeaderLogout from '../../components/Common/HeaderLogout/HeaderLogout';
const LogoutPage = () => {

    return (
        <div>
            <div style={Header}>
                <HeaderLogout />
            </div>
        </div>
    );

}
export default LogoutPage;