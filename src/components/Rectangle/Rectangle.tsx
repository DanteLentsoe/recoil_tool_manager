import { Drag } from "../Drag";
import { RectangleContainer } from "./RectangleContainer";
import { RectangleInner } from "./RectangleInner";
import { atomFamily, useRecoilState } from "recoil";

import { selectedElementState } from "../../pages/Canvas";
import { Resize } from "../Resize";

export type ElementStyle = {
  position: { top: number; left: number };
  size: { width: number; height: number };
};

export type Element = { style: ElementStyle };

export const elementState = atomFamily<Element, number>({
  key: "element",
  default: {
    style: {
      position: { top: 0, left: 0 },
      size: { width: 50, height: 50 },
    },
  },
});
export const Rectangle = ({ id }: { id: number }) => {
  const [selectedElement, setSelectedElement] = useRecoilState(
    selectedElementState
  );

  const [element, setElement] = useRecoilState(elementState(id));

  const selected = id === selectedElement;

  return (
    <RectangleContainer
      position={element.style.position}
      size={element.style.size}
      onSelect={() => {
        setSelectedElement(id);
      }}>
      <Resize
        onResize={(style) => {
          setElement({
            ...element,
            style,
          });
        }}
        position={element.style.position}
        size={element.style.size}
        selected={selected}
        key={id}>
        <Drag
          position={element.style.position}
          onDrag={(position) => {
            setElement({
              style: {
                ...element.style,
                position,
              },
            });
          }}>
          <div>
            <RectangleInner selected={selected} />
          </div>
        </Drag>
      </Resize>
    </RectangleContainer>
  );
};
