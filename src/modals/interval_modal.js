import React from "react";
import Modal from "./modal.js";
import Input from "./input.js";

// IntervalModal controls editing of a particular interval's time and
// description. Later on we'll implement metrics and allow them to be
// attached here as well.
export default function IntervalModal({
  visible,
  interval,
  onChange,
  onClose
}) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <Input
        title="Duration"
        value={interval.duration}
        callback={dur => onChange(Object.assign(interval, { duration: dur }))}
      />

      <Input
        title="Description"
        value={interval.description}
        callback={desc =>
          onChange(Object.assign(interval, { description: desc }))
        }
      />
    </Modal>
  );
}
