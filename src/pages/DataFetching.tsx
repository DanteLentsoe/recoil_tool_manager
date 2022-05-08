import { Container, Heading, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Suspense } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

interface IUserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: any;
}
interface IUserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
interface Iuser {
  username: string;
  email: string;
  name: string;
  address: IUserAddress;
  company: IUserCompany;

  id: 1;

  phone: string;

  website: string;
}
const userIdState = atom<number | undefined>({
  key: "userId",
  default: undefined,
});

const userData = selector<Iuser>({
  key: "user",
  get: async ({ get }) => {
    const userID = get(userIdState);
    if (userID === undefined) return;

    const userData = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userID}`
    ).then((res) => res.json());
    console.log("Selected USER ", userData);

    return userData;
  },
});

const UserData = () => {
  const user = useRecoilValue(userData);

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
      </div>
    </>
  );
};

export const Async = () => {
  const [userId, setUserId] = useRecoilState(userIdState);

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
          <UserData />
        </Suspense>
      )}
    </Container>
  );
};
