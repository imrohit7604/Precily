import { Rnd } from "react-rnd";
import { useEffect, useState } from "react";
import AddForm from "./AddForm";

function DraggableComponent(props) {
  const { handleResize, dragSize,childComponent } = props;
  const [size, setSize] = useState({
    width: "250px",
    height: "250px",
  });

  useEffect(() => {
    console.log(x, y);
  }, []);
  const { x, y } = props;
  return (
    <Rnd
      dragAxis="x"
      bounds={"parent"}
      maxWidth={683 - 20}
      maxHeight={"100%"}
      position={{ x: x, y: y }}
      size={dragSize}
      className={"Draggablecontainer"}
      disableDragging={true}
      onResize={(e, direction, ref, delta, position) => {
        handleResize(ref.offsetWidth, ref.offsetHeight);
      }}
    >
      {childComponent}
    </Rnd>
  );
}

export default DraggableComponent;
