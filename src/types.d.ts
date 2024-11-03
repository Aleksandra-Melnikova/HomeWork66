export interface IFormData {
  timeOfMeal: string;
  description: string;
  calories: number;
  data: string;
}

export interface IMeal extends IFormData {
  id: string;
}
export interface IApiData {
  [id: string]: IFormData;
}
export interface IDeleteLoading {
  process: boolean;
  id: string;
}
