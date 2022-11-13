interface IBoardTitleParse {
  title: string;
  description: string;
}

export default function boardTitleParse(title: string) {
  return JSON.parse(title) as IBoardTitleParse;
}
