import { useEffect, useState } from "react";
import AddForm from "./AddForm";
import "./App.css";

import DraggableComponent from "./DraggableComponent";
import EditForm from "./EditForm";
import SearchForm from "./SearchForm";

function App() {
  const [innerSize, setInnerSize] = useState({
    width: 0,
    height: 0,
  });

  const [dragSize, setDragSize] = useState({
    width: "250px",
    height: "250px",
  });

  const [totalCall, setTotalCall] = useState(0);
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setInnerSize({ height, width });
    console.log(width, height);
  }, []);

  const handleResize = (width, height) => {
    setDragSize({
      width,
      height,
    });
  };
  return (
    <main>
      <div className="flex-container">
        <DraggableComponent
          dragSize={dragSize}
          handleResize={handleResize}
          x="10"
          y="10"
          childComponent={<AddForm />}
        />

        <DraggableComponent
          dragSize={dragSize}
          handleResize={handleResize}
          x={innerSize.width / 2}
          y="10"
          childComponent={<EditForm />}
        />
      </div>
      <div className="flex-container">
        <DraggableComponent
          dragSize={dragSize}
          handleResize={handleResize}
          x="10"
          y={innerSize.height / 25}
          childComponent={<SearchForm />}
        />
      </div>

      <div className="APICallContainer">{totalCall}</div>
    </main>
  );
}

export default App;
