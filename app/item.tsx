"use client";

import Item from "@/lib/item";
import styles from "./page.module.css";
import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ChangeEvent, useState } from "react";

export default function ItemProp(props: { item: Item; onUpdate: () => void }) {
  const { item, onUpdate } = props;

  const [amount, setAmount] = useState(item.amount);

  function onAdd() {
    item.incrementAmount();
    setAmount((prev) => prev + 1);
    onUpdate();
  }
  function onRemove() {
    if (amount <= 0) return;
    item.decrementAmount();
    setAmount((prev) => prev - 1);
    onUpdate();
  }
  function onAmountEdit(event: ChangeEvent<HTMLInputElement>) {
    item.amount = Number(event.target.value);
    setAmount(Number(event.target.value));
    onUpdate();
  }

  return (
    <Box key={item.id} component="form" className={styles.item}>
      <p>{item.name}</p>
      <Button variant="outlined" size="small" onClick={onAdd}>
        <AddIcon></AddIcon>
      </Button>
      <TextField
        size="small"
        variant="outlined"
        type="number"
        onChange={onAmountEdit}
        value={amount}
      ></TextField>
      <Button variant="outlined" size="small" onClick={onRemove}>
        <RemoveIcon></RemoveIcon>
      </Button>
      <p>{item.price} THB each</p>
      {item.amountToDiscount > 0 && (
        <p>
          (buy {item.amountToDiscount} and get {item.discountPercentage * 100}%
          off both items!)
        </p>
      )}
    </Box>
  );
}
