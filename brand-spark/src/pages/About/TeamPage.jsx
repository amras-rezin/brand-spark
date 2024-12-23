
import { useEffect } from "react";
import Para from "../../components/About/Para";
import Team from "../../components/About/Team";
import "./TeamPage.css";

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="back">
      <Para />
      <Team />
    </div>
  );
};

export default TeamPage;
