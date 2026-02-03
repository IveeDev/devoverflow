import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const Home = async () => {
  return (
    <div>
      <h1 className="h1-bold font-normal">Welcome To The Home Page</h1>
    </div>
  );
};

export default Home;
