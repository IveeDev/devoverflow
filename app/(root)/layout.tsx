import LeftSideBar from "@/components/navigations/LeftSideBar";
import NavBar from "@/components/navigations/navbar";
import RightSideBar from "@/components/navigations/RightSideBar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100">
      <NavBar />
      <div className="flex">
        <LeftSideBar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default RootLayout;
