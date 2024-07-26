export default class Item {
  private _id: string;
  private _name: string;
  private _price: number;
  private _amount: number;
  private _amountToDiscount: number;
  private _discountPercentage: number;

  constructor(
    id: string,
    name: string,
    price: number,
    amount: number = 0,
    amountToDiscount: number = 0,
    discountPercentage: number = 0
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._amount = amount;
    this._amountToDiscount = amountToDiscount;
    this._discountPercentage = discountPercentage;
  }

  public get id(): string {
    return this._id;
  }
  public get name(): string {
    return this._name;
  }
  public get price(): number {
    return this._price;
  }
  public get amount(): number {
    return this._amount;
  }
  public calculatePrice(): number {
    // if there is no discount, skip
    if (this._amountToDiscount === 0) return this._amount * this._price;

    // find how many items can be discounted
    let discountSets = Math.floor(this._amount / this._amountToDiscount);

    // find the price for the discounted items
    let discountSetPrice =
      2 * this._price * (1 - this._discountPercentage) * discountSets;

    // add it back with the leftover
    return (
      discountSetPrice + this._price * (this._amount % this._amountToDiscount)
    );
  }

  public incrementAmount(): void {
    this._amount += 1;
  }
  public decrementAmount(): void {
    if (this._amount < 0) return;
    this._amount -= 1;
  }

  public set amount(x: number) {
    if (x < 0) return;
    this._amount = x;
  }

  public get amountToDiscount(): number {
    return this._amountToDiscount;
  }
  public get discountPercentage(): number {
    return this._discountPercentage;
  }
}
