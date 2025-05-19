import React from 'react'
import {
  Link,
  Box,
  Flex,
  Stack,
  HStack,
  Heading,
  Container,
  Icon,
  Text,
  IconButton,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react'
import DropDownMenu from './dropDownMenu'
import { FaGithub } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'

const GITHUB_REPO_LINK = 'https://github.com/Pichiya2007'

const menuData = [
  {
    id: 1,
    label: 'Luis Angel Pichiyá Sisimit',
  },
  {
    id: 2,
    label: '2023396 - IN6CV',
  }
]

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const linkColor = 'cyan.400'

  return (
    <>
      <Box
        as="header"
        bg={useColorModeValue('white', 'gray.800')}
        px={4}
        boxShadow={useColorModeValue(
          '0 4px 6px rgba(160, 174, 192, 0.6)',
          '0 4px 6px rgba(9, 17, 28, 0.9)'
        )}
        position="fixed"
        width="100%"
        zIndex="55"
        top="0"
      >
        <Container maxW="1280px" p={{ base: 0, md: 'inherit' }}>
          <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
            <HStack spacing={3} alignItems="center">
              <IconButton
                size="md"
                icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                aria-label="Open Menu"
                d={{ base: 'inherit', sm: 'none' }}
                onClick={isOpen ? onClose : onOpen}
              />
              <Link href="/dashboard">
                <img
                  src="https://images.vexels.com/media/users/3/224240/isolated/preview/21e33e0bb58925b96b1a00c521c007f2-logotipo-de-soportes-de-programacion.png"
                  alt="Logo"
                  style={{ height: 40, objectFit: 'contain' }}
                />
              </Link>
            </HStack>
            <HStack spacing={2} alignItems="center">
              <Link href={GITHUB_REPO_LINK} isExternal>
                <Flex
                  as="button"
                  p="0.6rem"
                  rounded="lg"
                  cursor="pointer"
                  _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
                  bg={useColorModeValue('gray.200', 'gray.700')}
                  justifyContent="center"
                >
                  <Icon as={FaGithub} color="black" />
                </Flex>
              </Link>
              <DropDownMenu menuData={menuData} />
            </HStack>
          </Flex>
        </Container>

        {isOpen ? (
          <Box pb={4} d={{ base: 'inherit', sm: 'none' }}>
            <Stack as="nav" spacing={1}>
              {menuData.map((data, index) => (
                <Link
                  key={index}
                  href={data.href}
                  px={3}
                  py={1}
                  lineHeight="inherit"
                  rounded="md"
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.100', 'gray.900')
                  }}
                  onClick={() => onClose()}
                >
                  {data.label}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  )
}