import React from "react";
import Modal from "./modal.js";
import Input from "./input.js";

// IntervalModal controls editing of a particular interval's time and
// description. Later on we'll implement metrics and allow them to be
// attached here as well.
export default function IntervalModal({ visible, data, onData, onClose }) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Input
        title="Duration"
        value={data[0]}
        callback={dur => onData([dur, data[1]])}
      />

      <Input
        title="Description"
        value={data[1]}
        callback={desc => onData([data[0], desc])}
      />
    </Modal>
  );
}
