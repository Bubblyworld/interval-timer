import React from "react";
import Modal from "./modal.js";
import Input from "../components/input.js";
import { Repeat } from "../data/workout.js";
import Button from "../components/button";

// RepeatModal controls editing of the repeats in a set.
export default function RepeatModal({
  visible,
  repeat,
  onChange,
  onDelete,
  onClose
}) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Input title="Repeats" value={"" + repeat.repeats} callback={onChange} />

      <Button msg="Delete" onPress={onDelete} />
    </Modal>
  );
}
