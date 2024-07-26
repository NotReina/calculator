import Item from "../lib/item";
import { DUMMY_ITEMS } from "../data/data";
import Calculator from "../lib/calculator";

describe.only("Calculator Test", () => {
  let calculator: Calculator;

  // generate a new calculator before each test to clear the state
  // could do with resetting the calculator too
  beforeEach(() => {
    // re initiate the items so the old values don't stay
    const items = DUMMY_ITEMS.map(
      (x) =>
        new Item(
          x.id,
          x.name,
          x.price,
          x.amount,
          x.amountToDiscount,
          x.discountPercentage
        )
    );

    calculator = new Calculator(items);
  });

  // doing nothing should have the price at 0
  test("buy nothing", () => {
    const price = calculator.calculatePrice();
    expect(price).toBe(0);
  });

  // doing nothing should have the price at 0
  test("buy nothing with member card", () => {
    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();
    expect(price).toBe(0);
  });

  // buying negative items should not affect the price
  // or change the item amount at all
  test("buy negative items", () => {
    calculator.items[0].amount = -100; // buy a random item
    const price = calculator.calculatePrice();
    const itemAmount = calculator.items[0].amount;
    expect(price).toBe(0);
    expect(itemAmount).toBe(0);
  });

  // buying negative items should not affect the price
  // or change the item amount at all
  test("buy negative items with member card", () => {
    calculator.hasMemberCard = true;
    calculator.items[0].amount = -100; // buy a random item
    const price = calculator.calculatePrice();
    const itemAmount = calculator.items[0].amount;
    expect(price).toBe(0);
    expect(itemAmount).toBe(0);
  });

  // buy something, have the price and amount correctly set
  test("buy 1 of something", () => {
    // example item is red set (50 THB per set)
    calculator.items[0].amount = 1; // buy a random item
    const price = calculator.calculatePrice();
    const itemAmount = calculator.items[0].amount;
    expect(price).toBe(calculator.items[0].price);
    expect(itemAmount).toBe(1);
  });

  // buy something, have the price and amount correctly set
  test("buy 1 of something with member card", () => {
    // example item is red set (50 THB per set)
    calculator.items[0].amount = 1; // buy a random item

    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();
    const itemAmount = calculator.items[0].amount;
    expect(price).toBe(45); // discount 10%; 50 -> 45
    expect(itemAmount).toBe(1);
  });

  // buy one of everything, have the price and amount correctly set
  test("buy 1 of everything", () => {
    let expectedAmount = 0;
    let expectedPrice = 0;
    for (const item of calculator.items) {
      item.amount = 1;
      expectedAmount += 1;
      expectedPrice += item.price;
    }
    const price = calculator.calculatePrice();
    const itemAmount = calculator.itemAmount();
    expect(price).toBe(expectedPrice);
    expect(itemAmount).toBe(expectedAmount);
  });

  // buy one of everything with member card
  // have the price and amount correctly set
  test("buy 1 of everything with member card", () => {
    let expectedAmount = 0;
    let expectedPrice = 0;
    for (const item of calculator.items) {
      item.amount = 1;
      expectedAmount += 1;
      expectedPrice += item.price;
    }
    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();
    const itemAmount = calculator.itemAmount();
    expect(price.toFixed(2)).toBe((expectedPrice * 0.9).toFixed(2)); // only requires two decimals
    expect(itemAmount).toBe(expectedAmount);
  });

  // buy 2 items from a non discount set
  test("buy 2 of non discount set", () => {
    // example item is red set (50 THB per set)
    // red set has no discount based on items bought
    calculator.items[0].amount = 2;
    const price = calculator.calculatePrice();

    // expecting the price to just be itself times 2
    expect(price).toBe(calculator.items[0].price * 2);
  });

  // buy 2 items from a non discount set with member card
  test("buy 2 of non discount set with member card", () => {
    // example item is red set (50 THB per set)
    // red set has no discount based on items bought
    calculator.items[0].amount = 2;
    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();

    // expecting the price to just be itself times 2
    expect(price).toBe(calculator.items[0].price * 2 * 0.9);
  });

  // buy 2 items from a discount set
  test("buy 2 of discount set", () => {
    // example item is green set (40 THB per set)
    // green set has a 5% discount when buying 2 of said item
    calculator.items[1].amount = 2;
    const price = calculator.calculatePrice();

    // expecting the price to just be itself times 2
    expect(price.toFixed(2)).toBe(
      (calculator.items[1].price * 2 * 0.95).toFixed(2)
    );
    expect(calculator.items[1].amount).toBe(2);
  });

  // buy 2 items from a discount set with member card
  test("buy 2 of discount set with member card", () => {
    // example item is green set (40 THB per set)
    // green set has a 5% discount when buying 2 of said item
    calculator.items[1].amount = 2;
    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();

    // expecting the price to just be itself times 2
    expect(price.toFixed(2)).toBe(
      (calculator.items[1].price * 2 * 0.95 * 0.9).toFixed(2)
    );
    expect(calculator.items[1].amount).toBe(2);
  });

  // buy 2 of everything
  // have the price and amount correctly set
  test("buy 2 of everything", () => {
    let expectedAmount = 0;
    let expectedPrice = 0;
    for (const item of calculator.items) {
      item.amount = 2;
      expectedAmount += 2;

      if (item.amountToDiscount === 2) {
        expectedPrice += item.price * 2 * 0.95;
      } else {
        expectedPrice += item.price * 2;
      }
    }
    const price = calculator.calculatePrice();
    const itemAmount = calculator.itemAmount();
    expect(price.toFixed(2)).toBe(expectedPrice.toFixed(2)); // only requires two decimals
    expect(itemAmount).toBe(expectedAmount);
  });

  // buy 2 of everything with member card
  // have the price and amount correctly set
  test("buy 2 of everything with member card", () => {
    let expectedAmount = 0;
    let expectedPrice = 0;
    for (const item of calculator.items) {
      item.amount = 2;
      expectedAmount += 2;

      if (item.amountToDiscount === 2) {
        expectedPrice += item.price * 2 * 0.95;
      } else {
        expectedPrice += item.price * 2;
      }
    }
    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();
    const itemAmount = calculator.itemAmount();
    expect(price.toFixed(2)).toBe((expectedPrice * 0.9).toFixed(2)); // only requires two decimals
    expect(itemAmount).toBe(expectedAmount);
  });

  // buy 3 items from a non discount set
  test("buy 3 of non discount set", () => {
    // example item is red set (50 THB per set)
    // red set has no discount based on items bought
    calculator.items[0].amount = 3;
    const price = calculator.calculatePrice();

    // expecting the price to just be itself times 3
    expect(price).toBe(calculator.items[0].price * 3);
  });

  // buy 3 items from a non discount set with member card
  test("buy 3 of non discount set with member card", () => {
    // example item is red set (50 THB per set)
    // red set has no discount based on items bought
    calculator.items[0].amount = 3;
    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();

    // expecting the price to just be itself times 3
    expect(price.toFixed(2)).toBe(
      (calculator.items[0].price * 3 * 0.9).toFixed(2)
    );
  });

  // buy 3 items from a discount set
  test("buy 3 of discount set", () => {
    // example item is green set (40 THB per set)
    // green set has a 5% discount when buying 2 of said item
    calculator.items[1].amount = 3;
    const price = calculator.calculatePrice();

    // expecting discounted price for the bundles
    // and regular price for non bundles
    expect(price.toFixed(2)).toBe(
      (
        calculator.items[1].price * 2 * 0.95 +
        calculator.items[1].price
      ).toFixed(2)
    );
    expect(calculator.items[1].amount).toBe(3);
  });

  // buy 3 items from a discount set with member card
  test("buy 3 of discount set with member card", () => {
    // example item is green set (40 THB per set)
    // green set has a 5% discount when buying 2 of said item
    calculator.items[1].amount = 3;
    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();

    // expecting discounted price for the bundles
    // and regular price for non bundles
    expect(price.toFixed(2)).toBe(
      (
        (calculator.items[1].price * 2 * 0.95 + calculator.items[1].price) *
        0.9
      ).toFixed(2)
    );
    expect(calculator.items[1].amount).toBe(3);
  });

  // ? ----- pre-determined tests -----

  // buy 1 red and 1 green
  test("buy 1 red and 1 green", () => {
    // red set (item 0) (50 THB per set)
    // green set (item 1) (40 THB per set)
    calculator.items[0].amount = 1;
    calculator.items[1].amount = 1;
    const price = calculator.calculatePrice();
    const itemAmount = calculator.items[0].amount + calculator.items[1].amount;
    expect(price).toBe(90);
    expect(itemAmount).toBe(2);
  });

  // buy 1 red and 1 green, uses member card
  test("buy 1 red and 1 green, uses member card", () => {
    // red set (item 0) (50 THB per set)
    // green set (item 1) (40 THB per set)
    calculator.items[0].amount = 1;
    calculator.items[1].amount = 1;
    calculator.hasMemberCard = true;
    const price = calculator.calculatePrice();
    const itemAmount = calculator.items[0].amount + calculator.items[1].amount;
    expect(price).toBe(81); // 90 * 0.9 = 81
    expect(itemAmount).toBe(2);
  });

  // buy 5 oranges
  test("buy 5 oranges", () => {
    // orange set (item 6) (120 THB per set)
    calculator.items[6].amount = 5;

    const price = calculator.calculatePrice();
    const itemAmount = 5;
    expect(price).toBe(576);//  120 * 4 * 0.95 = 456 (discounted sets), 456 + 120 = 576 (add leftovers)
    expect(itemAmount).toBe(5);
  });
});
