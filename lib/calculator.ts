import Item from "./item";

export default class Calculator {
  private _items: Item[];
  private _hasMemberCard: boolean;

  constructor(items: Item[]) {
    this._items = items;
    this._hasMemberCard = false;
  }

  public get items(): Item[] {
    return this._items;
  }

  public set hasMemberCard(x: boolean) {
    this._hasMemberCard = x;
  }

  public calculatePrice(): number {
    let totalPrice = 0;
    for (const item of this._items) {
      if (this._hasMemberCard) {
        totalPrice += item.calculatePrice() * 0.9; // assume 10% discount
      } else {
        totalPrice += item.calculatePrice();
      }
    }
    return totalPrice;
  }

  public itemAmount() {
    let totalAmount = 0;
    for (const item of this._items) totalAmount += item.amount
    
    return totalAmount;
  }
}
