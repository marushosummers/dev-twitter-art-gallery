import { useRouter } from "next/router";
import MainTable from "../../components/MainTable";

const TwitterScreenName = () => {
  const router = useRouter();
  const { screen_name } = router.query;
  return (
    <div>
      <head />
      <div className="bg-blue-50 min-h-screen" >
        <div className="container mx-auto" >
          <header className="flex justify-center items-center text-3xl h-32 mx-5" >
            Show your favorite arts in Twitter
          </header>
          <div className="flex justify-center" >
            <MainTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwitterScreenName;
