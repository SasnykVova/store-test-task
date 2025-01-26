export interface SelectDataI {
    id: number
    value: string
    title: string
}

export const selectData: SelectDataI[] = [
    {id: 1, value: 'def', title: 'Default'},
    {id: 2, value: 'name-asc', title: 'From A to Z'},
    {id: 3, value: 'name-desc', title: 'From Z to A'},
    {id: 4, value: 'count-desc', title: 'From hight to low'},
    {id: 5, value: 'count-asc', title: 'From low to hight'},
];
