import { Element, Rectangle } from "../components/Rectangle/Rectangle";
import { PageContainer } from "../PageContainer";
import { Toolbar } from "../Toolbar";
import { atom, useSetRecoilState, useRecoilValue } from "recoil";

export const selectedElementState = atom<number | null>({
  key: "select-element-atom",
  default: null,
});

export const elementState = atom<number[]>({
  key: "element-atom",
  default: [],
});

export type SetElement = (indexToSet: number, newElement: Element) => void;

function Canvas() {
  const setSelectedElement = useSetRecoilState(selectedElementState);
  const elements = useRecoilValue(elementState);
  return (
    <PageContainer
      onClick={() => {
        setSelectedElement(null);
      }}>
      <Toolbar />
      {elements.map((id) => (
        <Rectangle key={id} id={id} />
      ))}
    </PageContainer>
  );
}

export default Canvas;
