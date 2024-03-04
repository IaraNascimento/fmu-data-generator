import { IGeneratedData } from "../../types/types";
import "./Viewer.scss";

interface ViewerProps {
  data: Array<IGeneratedData>;
}

function Viewer(props: ViewerProps) {
  return (
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
  );
}

export default Viewer;
