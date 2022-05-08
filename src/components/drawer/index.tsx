import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Link,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
function DrawerNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button colorScheme="blue" margin={10} onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Recoil Best Practices
          </DrawerHeader>
          <DrawerBody>
            <VStack
              divider={<Box borderColor="gray.200" />}
              spacing={4}
              align="stretch">
              <Link href="/collection/datafetch">Data Fetching Example</Link>
              <Link href="/">Canvas Editing</Link>
              <Link href="/collection/atoms">Atoms Examples</Link>
              <Link href="/collection/selectors">Selectors Examples</Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerNav;
