import { useEffect, useRef } from "react";

import { Input, Button } from "@mui/material";

export const EditingForm = (props) => {
  const inputRef =  useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <>
      <Input
        ref={inputRef}
        value={props.initState}
        onChange={(e) => props.onEdit(e.target.value)}
      />
      <Button onClick={() => props.onSave()}>Save</Button>
    </>
  );
};
