"use client";

import Draggable from "react-draggable";

export default function Drag() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Draggable
        axis="y"
        handle=".handle"
        defaultPosition={{ x: 100, y: 0 }}
        position={null}
        scale={1}
      >
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    </div>
  );
}
