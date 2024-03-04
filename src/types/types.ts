import { EStatisticsTypes } from "../enums/enums";

export interface IVariable {
  id: number;
  name?: string;
  type?: typeof EStatisticsTypes;
  nominais?: Array<string>;
  min?: number;
  max?: number;
  decimal?: number;
  before?: Array<number>;
  relation?: number;
  relationsPercentageUp?: number;
  relationsPercentageDown?: number;
}

export interface IGeneratedData {
  [key: string]: string | number;
}

export interface ITemplate {
  name: string;
  variables: Array<IVariable>;
}
