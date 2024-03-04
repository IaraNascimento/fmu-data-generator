import { useState } from "react";
import Wrap from "./components/Wrap/Wrap";
import Viewer from "./components/Viewer/Viewer";
import { IGeneratedData, ITemplate } from "./types/types";
import templatesPossibilits from "./datapoints/datapoints.json";

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate>();
  const [quantity, setQuantity] = useState<number>(3);
  const [data, setData] = useState<Array<IGeneratedData>>([]);

  function handleQuantityChange(value: string) {
    setQuantity(parseInt(value || ""));
  }

  return (
    <>
      <form>
        <label>
          <span>Defina o modelo padrão:</span>
          <select
            onChange={(e) =>
              setSelectedTemplate(
                JSON.parse(e.target.value) as unknown as ITemplate
              )
            }
          >
            {templatesPossibilits?.map((template, index) => {
              return (
                <option key={index} value={JSON.stringify(template)}>
                  {template.name}
                </option>
              );
            })}
          </select>
        </label>
        <br />
        <label>
          <span>Quantidade de valores a serem gerados:</span>
          <input
            name="quantity"
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(e.target.value)}
          />
        </label>
      </form>
      <br />
      <Wrap
        template={selectedTemplate}
        quantity={quantity}
        generatedData={(generated) => setData(generated)}
      />
      <br />
      <Viewer data={data} />
    </>
  );
}

export default App;
