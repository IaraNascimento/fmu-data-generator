import { useEffect, useState } from "react";
import VariableForm from "../VariableForm/VariableForm";
import { IGeneratedData, ITemplate, IVariable } from "../../types/types";

interface WrapProps {
  template?: ITemplate;
  quantity: number;
  generatedData: (generated: Array<IGeneratedData>) => void;
}

function Wrap(props: WrapProps) {
  const [auxNumber, setAuxNumber] = useState<number>(0);
  const [variables, setVariables] = useState<Array<IVariable>>(
    (props.template?.variables
      ? props.template?.variables
      : []) as Array<IVariable>
  );

  function createNewVariable(): void {
    let newId: number = auxNumber;
    let newVariables: Array<IVariable> = variables ? [...variables] : [];
    let before: Array<number> = [];
    newVariables.forEach((element) => {
      before.push(element.id);
    });
    newVariables.push({ id: newId, before: before });
    newId = auxNumber + 1;
    setAuxNumber(newId);
    setVariables(newVariables);
  }

  function eraseVariable(variable: IVariable): void {
    let newVariables: Array<IVariable> = [...variables];
    const index = newVariables.findIndex(
      (element) => element.id === variable.id
    );
    if (index !== -1) {
      newVariables.splice(index, 1);
      setVariables(newVariables);
    } else {
      console.error("Can't find VARIABLE on LIST.");
    }
  }

  function handleValues(id: number, newValue: IVariable): void {
    const index = variables.findIndex((variable) => id === variable.id);
    let newVariables = [...variables];
    newVariables[index] = newValue;
    setVariables(newVariables);
  }

  function generateSingleValueType(
    data: IVariable,
    generated: Array<IGeneratedData>,
    index: number
  ): any {
    switch (data.type as unknown as string) {
      case "C":
        let min: number = data.min ? data.min : 0;
        let max: number = data.max ? data.max : 10;
        let decimal: number =
          (data.decimal as number) >= 0 ? (data.decimal as number) : 0;
        if (data.relation !== null) {
          const reference = Number(
            Object.values(generated[index])[Number(data.relation)]
          );
          const variationDown =
            (reference * Number(data.relationsPercentageDown)) / 100;
          min = reference - variationDown;
          min = min > 0 ? min : 0;
          const variationUp =
            (reference * Number(data.relationsPercentageUp)) / 100;
          max = reference + variationUp;
        }
        return (Math.random() * (max - min) + min).toFixed(decimal);
      case "D":
      case "O":
      case "N": {
        let array = data.nominais ? data.nominais : [];
        if (array.length > 0) {
          return array[Math.floor(Math.random() * array.length)];
        }
        return "";
      }
      default:
        return null;
    }
  }

  function generateData(quantity: number, data: Array<IVariable>): void {
    let generated: Array<IGeneratedData> = [];
    data.forEach((info, index) => {
      const label: string = info.name ? info.name : "vazio " + index;
      if (generated.length === 0) {
        for (let i = 0; i < quantity; i++) {
          generated.push({
            [label]: generateSingleValueType(info, generated, i),
          });
        }
      } else {
        for (let i = 0; i < quantity; i++) {
          generated[i][label] = generateSingleValueType(info, generated, i);
        }
      }
    });
    props.generatedData(generated);
  }

  useEffect(() => {
    setVariables(props.template?.variables as Array<IVariable>);
    if (props.template?.variables && props.template.variables.length > 0) {
      setAuxNumber(props.template?.variables.length);
    }
  }, [props.template]);

  return (
    <>
      {!!variables &&
        variables?.map((variable) => {
          return (
            <VariableForm
              key={variable.id}
              variable={variable}
              defineVariable={(newValue) => {
                handleValues(variable.id, newValue);
              }}
              eraseThisVariable={() => eraseVariable(variable)}
            />
          );
        })}
      <br />
      <button onClick={() => createNewVariable()}>adicionar variável</button>
      <br />
      {!!variables && variables.length > 0 && (
        <button onClick={() => generateData(props.quantity, variables)}>
          gerar dados
        </button>
      )}
    </>
  );
}

export default Wrap;
