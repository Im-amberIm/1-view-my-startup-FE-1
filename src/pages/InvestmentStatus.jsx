import { useState, useEffect, useCallback } from "react";
import { getInvestmentStatus } from "../services/companyApi";
import { Table } from "../components/Table/Table";
import { DropDown } from "../components/DropDown/DropDown";

import "./Home.css";
import { InvestmentStatusTableHeader } from "../utils/tableTypes";

function InvestmentStatus() {
  const [orderBy, setOrderBy] = useState("virtualInvestment_desc");
  const [companyList, setCompanyList] = useState([]);
  const [cursor, setCursor] = useState("");
  const [nextCursor, setNextCursor] = useState(null);

  const init = useCallback(async () => {
    try {
      const data = await getInvestmentStatus({ orderBy, cursor });

      const { list, nextCursor } = data;
      setCompanyList(list);
      setNextCursor(nextCursor || null);
    } catch (err) {
      console.error(err.message);

      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
      }
    }
  }, [orderBy, cursor]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <section className="Home">
      <div className="top-bar">
        <h2>투자 현황</h2>
        <DropDown
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          buttonType="typeThree"
        />
      </div>
      <Table list={companyList} tableHeaders={InvestmentStatusTableHeader} />
    </section>
  );
}

export default InvestmentStatus;
