"use client";

import Calculator from "@/lib/calculator";
import styles from "./page.module.css";
import { DUMMY_ITEMS } from "@/data/data";
import { Switch} from "@mui/material";
import { useState } from "react";
import ItemProp from "./item";

export default function Home() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasMemberCard, setHasMemberCard] = useState(false);
  const calculator = new Calculator(DUMMY_ITEMS);

  function onCalculate() {
    const price = calculator.calculatePrice();
    setTotalPrice(price);
  }
  function onToggleMemberCard() {
    setHasMemberCard((prev) => {
      calculator.hasMemberCard = !prev;
      return !prev;
    });
    onCalculate();
  }

  return (
    <main>
      <header className={styles.header}>Calculator</header>
      {calculator.items.map((item) => {
        return <ItemProp key={item.id} item={item} onUpdate={onCalculate} />;
      })}
      <span className={styles["member-card"]}>
        <p>Has member card</p>
        <Switch onClick={onToggleMemberCard}></Switch>
      </span>
      <p>Total: {totalPrice.toFixed(2)} THB</p>
    </main>
  );
}
