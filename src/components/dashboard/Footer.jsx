import { Stack, HStack, Link, Image, IconButton } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/layout";
import { FaGithub } from 'react-icons/fa'

const links = ['Blog', 'Documentation', 'Careers', 'Sign up', 'Terms of use', 'Privacy policy']
const accounts = [
  {
    url: 'https://github.com/Pichiya2007',
    label: 'Github Account',
    type: 'gray',
    icon: <FaGithub />
  }
]

export const Footer = () => {
    return (
        <Stack
        maxW="5xl"
        marginInline="auto"
        p={8}
        spacing={{ base: 8, md: 0 }}
        justifyContent="space-between"
        alignItems="center"
        direction={{ base: 'column', md: 'row' }}
        >
        <Link href="/dashboard">
            <Image w="100px" src="https://images.vexels.com/media/users/3/224240/isolated/preview/21e33e0bb58925b96b1a00c521c007f2-logotipo-de-soportes-de-programacion.png" alt="TemplatesKart" />
        </Link>
        <HStack spacing={4} alignItems="center" d={{ base: 'none', md: 'flex' }}>
            {links.map((link, index) => (
            <CustomLink key={index}>{link}</CustomLink>
            ))}
        </HStack>
        <Stack d={{ base: 'flex', md: 'none' }} alignItems="center">
            <HStack alignItems="center">
            <CustomLink>Documentation</CustomLink>
            <Divider h="1rem" orientation="vertical" />
            <CustomLink>Terms of use</CustomLink>
            </HStack>
        </Stack>
        <Stack direction="row" spacing={5} pt={{ base: 4, md: 0 }} alignItems="center">
            {accounts.map((sc, index) => (
            <IconButton
                key={index}
                as={Link}
                isExternal
                href={sc.url}
                aria-label={sc.label}
                colorScheme={sc.type}
                icon={sc.icon}
                rounded="md"
            />
            ))}
        </Stack>
        </Stack>
    )
}

const CustomLink = ({ children }) => {
    return (
        <Link
        href="#"
        fontSize="sm"
        fontWeight="medium"
        color="gray.600"
        _hover={{ textDecoration: 'none', color: 'gray.800' }}
        >
        {children}
        </Link>
    )
}