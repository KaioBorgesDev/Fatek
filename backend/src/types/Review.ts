export type Review = {
    id_user: number,
    id_book: number,
    rating: 1 | 2 | 3 | 4 | 5,
    comment: string;
}
