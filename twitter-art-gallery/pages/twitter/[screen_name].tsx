import { useRouter } from "next/router";
import MainTable from "../../components/MainTable";
import Layout from '../../components/layout'

const TwitterScreenName = () => {
  const router = useRouter();
  const { screen_name } = router.query;
  let name: string;
  if ((typeof screen_name === "string")) {
    name = screen_name;
  } else {
    name = "";
  }
  return (
    <Layout>
      <div className="bg-blue-50 min-h-screen" >
        <div className="container mx-auto" >
          <header className="flex justify-center items-center text-3xl h-32 mx-5" >
            Show your favorite arts in Twitter
          </header>
          <div className="flex justify-center" >
            <MainTable screen_name={name} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TwitterScreenName;
