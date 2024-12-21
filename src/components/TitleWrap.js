import { Helmet } from "react-helmet-async";

const TitleWrap = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | snowman </title>
    </Helmet>
  );
};

export default TitleWrap;
