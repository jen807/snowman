import { Helmet } from "react-helmet-async";

const TitleWrap = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Do you wanna? </title>
    </Helmet>
  );
};

export default TitleWrap;