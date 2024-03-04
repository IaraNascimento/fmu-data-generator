import { useForm } from "react-hook-form";
import { IVariable } from "../../types/types";
import { EStatisticsTypes } from "../../enums/enums";
import { useEffect, useState } from "react";
import "./VariableForm.scss";

interface VariableFormProps {
  variable: IVariable;
  defineVariable: (variable: IVariable) => void;
  eraseThisVariable: () => void;
}

function VariableForm(props: VariableFormProps) {
  const [auxType, setAuxType] = useState<string | null>(null);
  const [nominais, setNominais] = useState<Array<string>>(
    props.variable.nominais ? props.variable.nominais : []
  );
  const { register, getValues, setValue } = useForm<IVariable>({});

  function handleChange(event: any): void {
    event.preventDefault();
    setAuxType(getValues().type as unknown as string);
    props.defineVariable({
      ...getValues(),
      nominais: [...nominais],
      before: props.variable.before,
      id: props.variable.id,
    });
  }

  function addNominal(event: any): void {
    event.preventDefault();
    let newNominais: Array<string> = [
      ...(nominais?.length ? (nominais as Array<string>) : []),
    ];
    newNominais.push("exemplo");
    setNominais(newNominais);
  }

  function eraseThisNominal(event: any, index: number): void {
    event.preventDefault();
    let newNominais: Array<string> = [...(nominais || [])];
    newNominais.splice(index, 1);
    setNominais(newNominais);
  }

  function defineNominal(index: number, event: any): void {
    event.preventDefault();
    let newNominais: Array<string> = [...(nominais || [])];
    newNominais[index] = event.target.value;
    setNominais(newNominais);
  }

  useEffect(() => {
    setValue("id", props.variable.id);
    setValue("name", props.variable.name);
    setValue("type", props.variable.type);
    setValue("nominais", props.variable.nominais);
    setValue("min", props.variable.min);
    setValue("max", props.variable.max);
    setValue("decimal", props.variable.decimal);
    setValue("before", props.variable.before);
    setValue("relation", props.variable.relation);
    setValue("relationsPercentageUp", props.variable.relationsPercentageUp);
    setValue("relationsPercentageDown", props.variable.relationsPercentageDown);
  }, []);

  useEffect(() => {
    handleChange({ preventDefault: () => {} });
  }, [nominais]);

  return (
    <form className="form" onChange={(event) => handleChange(event)}>
      <span>{String(props.variable.id)}: </span>
      <label className="label-wrap">
        <span>Variável:</span>
        <input
          {...register("name", {
            required: true,
          })}
        />
      </label>
      <label className="label-wrap">
        <span>Tipo:</span>
        <select
          {...register("type", {
            required: true,
          })}
        >
          <option key={0} value="default" disabled>
            Selecione...
          </option>
          {Object.entries(EStatisticsTypes).map((type) => {
            return (
              <option key={type[0]} value={type[0]}>
                {type[1]}
              </option>
            );
          })}
        </select>
      </label>
      {(() => {
        switch (auxType) {
          case "C":
            return (
              <>
                {props.variable?.before !== null &&
                  props.variable?.before !== undefined && (
                    <label className="label-wrap">
                      <span>Tipo:</span>
                      <select
                        {...register("relation", {
                          required: true,
                        })}
                      >
                        <option key={0} value="">
                          Sem relação
                        </option>
                        {props.variable?.before.map((variable, index) => {
                          return (
                            <option
                              key={`${index}-${variable}`}
                              value={variable}
                            >
                              Relação com {variable}
                            </option>
                          );
                        })}
                      </select>
                    </label>
                  )}
                {!getValues().relation && getValues().relation !== 0 ? (
                  <>
                    <label className="label-wrap">
                      <span>Min:</span>
                      <input
                        type="number"
                        {...register("min", { valueAsNumber: true })}
                      />
                    </label>
                    <label className="label-wrap">
                      <span>Máx:</span>
                      <input
                        type="number"
                        {...register("max", {
                          valueAsNumber: true,
                        })}
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <label className="label-wrap">
                      <span>% UP:</span>
                      <input
                        type="number"
                        {...register("relationsPercentageUp", {
                          valueAsNumber: true,
                        })}
                      />
                    </label>
                    <label className="label-wrap">
                      <span>% DOWN:</span>
                      <input
                        type="number"
                        {...register("relationsPercentageDown", {
                          valueAsNumber: true,
                        })}
                      />
                    </label>
                  </>
                )}
                <label className="label-wrap">
                  <span>Dígitos:</span>
                  <input
                    type="number"
                    {...register("decimal", {
                      valueAsNumber: true,
                    })}
                  />
                </label>
              </>
            );

          case "D":
          case "O":
          case "N":
            return (
              <>
                <label className="label-wrap nominais">
                  <span>Lista de Nominais:</span>
                  {nominais.length === 0 && (
                    <span>clique em "+" para incluir</span>
                  )}
                  {nominais?.map((nominal, index) => {
                    return (
                      <div
                        className="nominais-inner"
                        key={`div-${index}-${nominal}`}
                      >
                        <input
                          key={`input-${index}-${nominal}`}
                          value={nominal}
                          onChange={(e) => defineNominal(index, e)}
                          autoFocus
                        />
                        <button
                          className="nominais-erase"
                          onClick={(e) => {
                            eraseThisNominal(e, index);
                          }}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </label>
                <span>
                  <button onClick={(e) => addNominal(e)}>+</button>
                </span>
              </>
            );
          default:
            return <></>;
        }
      })()}
      <button
        className="erase-btn"
        onClick={(e) => {
          e.preventDefault();
          props.eraseThisVariable();
        }}
      >
        apagar variável
      </button>
    </form>
  );
}

export default VariableForm;
