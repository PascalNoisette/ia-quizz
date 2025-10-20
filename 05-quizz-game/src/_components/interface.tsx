
export type IQuizz = {
    answer:string,
    first_wrong_answer:string,
    second_wrong_answer:string,
    third_wrong_answer:string
};

export type ISlugUrlParams = Promise<{slug:string}[]>;

export type ISlugUrlParam = Promise<{slug:string}>;

export type ItemStat = {
    [key: string]:number
};

export type GroupStat = {
  [key: string]:ItemStat;
}