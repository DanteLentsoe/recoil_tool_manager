import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  NumberInput,
  NumberInputField,
  Switch,
} from "@chakra-ui/react";
import { ArrowRight } from "react-feather";
import { atom, useRecoilState, selector } from "recoil";

const exchangeRate = 0.83;

const usdAtomState = atom({
  key: "usd-currency",
  default: 1,
});

const euroSelector = selector<number>({
  key: "euro",

  // getting usd value from atom into selector
  get: ({ get }) => {
    // gets the atom
    let USD = get(usdAtomState);

    const isCommissionAdded = get(commissionEnabledAtom);
    const commission = get(commissionAtom);

    if (isCommissionAdded) {
      USD = removeCommission(USD, commission);
    }

    return USD * exchangeRate;
  },

  // sets value for an atom
  set: ({ set, get }, euroValue) => {
    // @ts-ignore
    let newUSDValue = euroValue / exchangeRate;

    const isCommissionAdded = get(commissionEnabledAtom);
    const commission = get(commissionAtom);

    if (isCommissionAdded) {
      newUSDValue = addCommission(newUSDValue, commission);
    }

    set(usdAtomState, newUSDValue);
  },
});

export const Selectors = () => {
  const [USDCurreny, setUSDCurrency] = useRecoilState(usdAtomState);
  const [euro, setEuro] = useRecoilState(euroSelector);
  return (
    <div style={{ padding: 20 }}>
      <Heading size="lg" mb={2}>
        Currency converter
      </Heading>
      <InputStack>
        <CurrencyInput
          label="usd"
          amount={USDCurreny}
          onChange={(USDValue) => setUSDCurrency(USDValue)}
        />
        <CurrencyInput
          label="eur"
          amount={euro}
          onChange={(euroValue) => setEuro(euroValue)}
        />
      </InputStack>
      <Commission />
    </div>
  );
};

const InputStack: React.FC = ({ children }) => {
  return (
    <HStack
      width="300px"
      mb={4}
      spacing={4}
      divider={
        <Box
          border="0 !important"
          height="40px"
          alignItems="center"
          display="flex">
          <Icon as={ArrowRight} />
        </Box>
      }
      align="flex-end">
      {children}
    </HStack>
  );
};

const CurrencyInput = ({
  amount,
  onChange,
  label,
}: {
  label: string;
  amount: number;
  onChange?: (amount: number) => void;
}) => {
  let symbol = label === "usd" ? "$" : "€";

  return (
    <FormControl id={label.toUpperCase()}>
      <FormLabel>{label.toUpperCase()}</FormLabel>
      <NumberInput
        value={`${symbol} ${amount}`}
        onChange={(value) => {
          const withoutSymbol = value.split(" ")[0];
          onChange?.(parseFloat(withoutSymbol || "0"));
        }}>
        <NumberInputField />
      </NumberInput>
    </FormControl>
  );
};

const commissionEnabledAtom = atom({
  key: "commissionEnabled",
  default: false,
});

const commissionAtom = atom({
  key: "commission",
  default: 10,
});

const Commission = () => {
  const [enabled, setEnabled] = useRecoilState(commissionEnabledAtom);
  const [commission, setCommission] = useRecoilState(commissionAtom);

  return (
    <Box width="300px">
      <FormControl display="flex" alignItems="center" mb={2}>
        <FormLabel htmlFor="includeCommission" mb="0">
          Include forex commission?
        </FormLabel>
        <Switch
          id="includeCommission"
          isChecked={enabled}
          onChange={(event) => setEnabled(event.currentTarget.checked)}
        />
      </FormControl>
      <NumberInput
        isDisabled={!enabled}
        value={commission}
        onChange={(value) => setCommission(parseFloat(value || "0"))}>
        <NumberInputField />
      </NumberInput>
    </Box>
  );
};

const addCommission = (amount: number, commission: number) => {
  return amount / (1 - commission / 100);
};

const removeCommission = (amount: number, commission: number) => {
  return amount * (1 - commission / 100);
};
