import { Container, Heading, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Suspense, useState } from "react";
import { getWeather } from "../helpers/pseudoAPI";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import {
  selectorFamily,
  useRecoilValue,
  atomFamily,
  useSetRecoilState,
} from "recoil";
import { Button } from "@chakra-ui/react";

const userData = selectorFamily({
  key: "user",
  get: (userID: number) => async () => {
    const userData = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userID}`
    ).then((res) => res.json());

    if (userID === 4) throw new Error("User does not exist");
    return userData;
  },
});

const weatherData = selectorFamily({
  key: "weather",
  get: (userID: number) => async ({ get }) => {
    get(weatherDataFam(userID));
    const user = get(userData(userID));

    const weather = await getWeather(user.address.city);
    return weather;
  },
});

const weatherDataFam = atomFamily({
  key: "weather-data-collection",
  default: 0,
});

const useRefetchWeather = (userID: number) => {
  const setRequestID = useSetRecoilState(weatherDataFam(userID));

  return () => setRequestID((id) => id + 1);
};

const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <Heading as="h2" size="md" mb={1}>
        Error Occurred
      </Heading>
      <Text>
        <b>{error.message}</b>
      </Text>

      <Button onClick={resetErrorBoundary}>
        <Text>Done </Text>
      </Button>
    </>
  );
};

const UserData = ({ userId }: { userId: number }) => {
  const user = useRecoilValue(userData(userId));
  const weather = useRecoilValue(weatherData(userId));

  const refresh = useRefetchWeather(userId);

  if (!user) return null;
  return (
    <>
      <div>
        <Heading as="h2" size="md" mb={1}>
          User data:
        </Heading>
        <Text>
          <b>Name:</b> {user.name}
        </Text>
        <Text>
          <b>Phone:</b>
          {user.phone}
        </Text>

        <Text>
          <b>Weather in {user.address.city}: </b>
          {weather}
        </Text>
        <Button onClick={refresh}>
          <Text>Fetch Data</Text>
        </Button>
      </div>
    </>
  );
};

export const Async2 = () => {
  const [userId, setUserId] = useState<undefined | number>(undefined);

  return (
    <Container py={10}>
      <Heading as="h1" mb={4}>
        View Profile
      </Heading>
      <Heading as="h2" size="md" mb={1}>
        Choose a user:
      </Heading>
      <Select
        placeholder="Choose a user"
        mb={4}
        value={userId}
        onChange={(event: { target: { value: string } }) => {
          const value = event.target.value;
          setUserId(value ? parseInt(value) : undefined);
        }}>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="4">User 4</option>
      </Select>
      {userId !== undefined && (
        <ErrorBoundary
          FallbackComponent={ErrorFallBack}
          onReset={() => setUserId(undefined)}
          resetKeys={[userId]}>
          <Suspense fallback={<div>Loading Yoyo</div>}>
            <UserData userId={userId} />
          </Suspense>
        </ErrorBoundary>
      )}
    </Container>
  );
};
