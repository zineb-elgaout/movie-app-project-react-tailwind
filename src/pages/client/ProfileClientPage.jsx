import Profile from "../../components/public/Profile";
import Navbar from "../../components/client/NavBar";

const ProfileClientPage = () => {
    return (
        <>
        <Navbar />
        <div className="bg-black min-h-screen ">
        <Profile />
        </div>
        </>
    );
}
export default ProfileClientPage;