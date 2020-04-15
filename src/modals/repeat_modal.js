import React from "react";
import Modal from "./modal.js";
import Input from "../components/input.js";
import { Repeat } from "../data/workout.js";

// RepeatModal controls editing of the repeats in a set.
export default function RepeatModal({ visible, repeat, onChange, onClose }) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Input title="Repeats" value={"" + repeat.repeats} callback={onChange} />
    </Modal>
  );
}
