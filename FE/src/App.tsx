import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BBTIPage from './pages/BBTIPage/BBTIPage';
import BookDetailPage from './pages/BookDetailPage/BookDetailPage';
import CreateRecordPage from './pages/CreateRecordPage/CreateRecordPage.tsx';
import CreateReminderPage from './pages/CreateReminderPage/CreateReminderPage.tsx';
import FeedPage from './pages/FeedPage/FeedPage';
import JoinPage from './pages/JoinPage/JoinPage';
import LoginPage from './pages/LoginPage/LoginPage';
import GuestPage from './pages/GuestPage/GuestPage';
import RecommendPage from './pages/RecommendPage/RecommendPage';
import RecordEditPage from './pages/RecordEditPage/RecordEditPage';
import ReminderEditPage from './pages/ReminderEditPage/ReminderEditPage';
import SearchPage from './pages/SearchPage/SearchPage';
import ShelfPage from './pages/ShelfPage/ShelfPage';
import UserEditPage from './pages/UserEditPage/UserEditPage';
import Header from './components/Common/Header/Header.tsx';
import Footer from './components/Common/Footer/Footer.tsx';
import KakaoRedirect from './components/Redirect/KakaoRedirect.tsx';
import Home from './pages/Home/Home.tsx';
import Memorize from './pages/Memorize/Memorize.tsx';
import Test from './pages/Test/Test.tsx';
import BookShelfTest from "./pages/BookShelfTest/BookShelfTest.tsx";
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guest" element={<GuestPage />} />
        <Route path="/login/oauth2/code/kakao" element={<KakaoRedirect />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/bbti" element={<BBTIPage />} />
        <Route path="/bookdetail/:bookId" element={<BookDetailPage />} />
        <Route path="/createrecord/:bookId/:memberId" element={<CreateRecordPage />} />
        <Route path="/createreminder" element={<CreateReminderPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/recordedit/:recordId/:memberId" element={<RecordEditPage />} />
        <Route path="/reminderedit/:diaryId/:memberId" element={<ReminderEditPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/shelf/:id" element={<ShelfPage />} />
        <Route path="/useredit/:memberId" element={<UserEditPage />} />
        <Route path="/memorize/:id" element={<Memorize />} />
        <Route path="/test" element={<BookShelfTest />} />
        <Route path="/test2" element={<Test />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
