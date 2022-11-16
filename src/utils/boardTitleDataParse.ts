export interface IBoardTitleData {
  title: string;
  description: string;
}

export function titleDataStringToObj(titleDataString: string) {
  return JSON.parse(titleDataString) as IBoardTitleData;
}

export function titleDataObjToString(titleDataObj: IBoardTitleData) {
  return JSON.stringify(titleDataObj);
}
