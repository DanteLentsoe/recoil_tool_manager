import { Container, Heading, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Suspense, useState } from "react";
import { getWeather } from "../helpers/pseudoAPI";
import { selectorFamily, useRecoilValue } from "recoil";

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
    const user = get(userData(userID));

    const weather = await getWeather(user.address.city);
    console.log("USER DATA ", weather);
    return weather;
  },
});

const UserData = ({ userId }: { userId: number }) => {
  const user = useRecoilValue(userData(userId));
  const weather = useRecoilValue(weatherData(userId));

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
        onChange={(event) => {
          const value = event.target.value;
          setUserId(value ? parseInt(value) : undefined);
        }}>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </Select>
      {userId !== undefined && (
        <Suspense fallback={<div>Loading Yoyo</div>}>
          <UserData userId={userId} />
        </Suspense>
      )}
    </Container>
  );
};
