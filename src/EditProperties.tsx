import { selectedElementState } from "./pages/Canvas";
import { elementState, Element } from "./components/Rectangle/Rectangle";
import {
  InputGroup,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
} from "@chakra-ui/react";
import { selector, useRecoilState } from "recoil";

const selectedElementProperties = selector<Element | undefined>({
  key: "selectedElementsProperties",

  // get element that is currently selected
  get: ({ get }) => {
    const selectedElementID = get(selectedElementState);
    if (selectedElementID === null) return;

    //   atom families gets functions and returns recoil atom
    return get(elementState(selectedElementID));
  },
  set: ({ get, set }, newElement) => {
    const selectedElementID = get(selectedElementState);
    if (selectedElementID === null) return;

    if (!newElement) return;

    set(elementState(selectedElementID), newElement);
  },
});

export const EditProperties = () => {
  const [element, setElement] = useRecoilState(selectedElementProperties);

  // when screen element is not selected hide properties bar
  if (!element) return null;

  const setPosition = (property: "top" | "left", value: number) => {
    setElement({
      ...element,
      style: {
        ...element.style,
        position: {
          ...element.style.position,
          [property]: value,
        },
      },
    });
  };

  const setSize = (property: "width" | "height", value: number) => {
    setElement({
      ...element,
      style: {
        ...element.style,
        size: {
          ...element.style.size,
          [property]: value,
        },
      },
    });
  };

  return (
    <Card>
      <Section heading="Position">
        <Property
          label="Top"
          value={element.style.position.top}
          onChange={(top) => {
            setPosition("top", top);
          }}
        />
        <Property
          label="Left"
          value={element.style.position.left}
          onChange={(left) => {
            setPosition("left", left);
          }}
        />
      </Section>

      <Section heading="Size">
        <Property
          label="Width"
          value={element.style.size.width}
          onChange={(width) => {
            setSize("width", width);
          }}
        />
        <Property
          label="Height"
          value={element.style.size.height}
          onChange={(height) => {
            setSize("height", height);
          }}
        />
      </Section>
    </Card>
  );
};

const Section: React.FC<{ heading: string }> = ({ heading, children }) => {
  return (
    <VStack spacing={2} align="flex-start">
      <Text fontWeight="500">{heading}</Text>
      {children}
    </VStack>
  );
};

const Property = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div>
      <Text fontSize="14px" fontWeight="500" mb="2px">
        {label}
      </Text>
      <InputGroup size="sm" variant="filled">
        <NumberInput value={value} onChange={(_, value) => onChange(value)}>
          <NumberInputField borderRadius="md" />
          <InputRightElement
            pointerEvents="none"
            children="px"
            lineHeight="1"
            fontSize="12px"
          />
        </NumberInput>
      </InputGroup>
    </div>
  );
};

const Card: React.FC = ({ children }) => (
  <VStack
    position="absolute"
    top="20px"
    right="20px"
    backgroundColor="white"
    padding={2}
    boxShadow="md"
    borderRadius="md"
    spacing={3}
    align="flex-start"
    onClick={(e) => e.stopPropagation()}>
    {children}
  </VStack>
);
