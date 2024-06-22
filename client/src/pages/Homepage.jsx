import axios from "axios";
import { useState, useEffect } from "react";
import AttractionCard from "../../components/AttractionsCard";

function Homepage() {
  const [attraction, setAttraction] = useState([]);
  const [searchAttraction, setSearchAttraction] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(null);

  const getAttraction = async (search) => {
    try {
      setLoadingStatus("loading");
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${search}`
      );
      setLoadingStatus("completed");
      setAttraction(result.data.data);
    } catch (error) {
      setLoadingStatus("failed");
      console.error(error);
    }
  };

  useEffect(() => {
    getAttraction(searchAttraction);
  }, [searchAttraction]);

  return (
    <div className="homepage">
      <h1 className="pageTitle">เที่ยวไหนดี</h1>
      <div className="searchLocation">
        <p className="searchTitle">ค้นหาที่เที่ยว</p>
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="searchInput"
          value={searchAttraction}
          onChange={(event) => {
            setSearchAttraction(event.target.value);
          }}
        />
      </div>
      {loadingStatus === "loading" && <h1>Loading...</h1>}
      {loadingStatus === "failed" && <h1>Fail to load data...</h1>}
      {loadingStatus === "completed" && (
        <AttractionCard attraction={attraction} />
      )}
    </div>
  );
}

export default Homepage;
