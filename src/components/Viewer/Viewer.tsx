import { CSVLink } from "react-csv";
import { IGeneratedData } from "../../types/types";
import "./Viewer.scss";
import { useEffect, useState } from "react";
import { Data } from "react-csv/lib/core";

interface ViewerProps {
  data: Array<IGeneratedData>;
}

function Viewer(props: ViewerProps) {
  const [csvData, setCsvData] = useState<Data>(props.data);

  useEffect(() => {
    setCsvData(props.data);
  }, [props.data]);

  return (
    <div className="wrap">
      {!!props.data.length && (
        <CSVLink
          className="btn btn-download"
          data={csvData}
          separator={";"}
          filename={"data.csv"}
        >
          baixar CSV
        </CSVLink>
      )}
      <table className="table">
        <thead>
          <tr>
            {props.data[0] &&
              Object.keys(props.data[0]).map((element, index) => {
                return <th key={`${element}-${index}`}>{element}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((element, i) => {
            return (
              <tr key={i}>
                {Object.values(element).map((value, index) => {
                  return <td key={`${value}-${index}`}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default Viewer;
