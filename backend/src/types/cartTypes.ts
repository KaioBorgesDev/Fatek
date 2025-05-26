export interface CartItemRequest {
  bookId: string;
  quantity: number;
}

export interface CartItemResponse {
  id: string;
  bookId: string;
  quantity: number;
  addedAt: Date;
}
