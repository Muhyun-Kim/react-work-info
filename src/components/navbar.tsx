import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export const Navbar = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  return (
    <>
      <div className="flex justify-between items-center p-4 shadow-md">
        <ul className="flex">
          <li className="mr-6 hover:text-gray-300 cursor-pointer">
            <Link to="/">ホーム</Link>
          </li>
          <li className="mr-6 hover:text-gray-300 cursor-pointer">
            <Link to="/work-input">作品入力</Link>
          </li>
          <li className="mr-6 hover:text-gray-300 cursor-pointer">
            <Link to="/work">作品一覧</Link>
          </li>
          <li className="mr-6 hover:text-gray-300 cursor-pointer">
            <Link to="/work-json">JSON</Link>
          </li>
        </ul>
        {user == null ? (
          <>
            <ul className="flex">
              <li className="mr-6 hover:text-gray-300 cursor-pointer">
                <Link to="/login">ログイン</Link>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <Link to="/create-account">アカウント作成</Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <li onClick={logout} className="hover:text-red cursor-pointer">Logout</li>
            </ul>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
};
