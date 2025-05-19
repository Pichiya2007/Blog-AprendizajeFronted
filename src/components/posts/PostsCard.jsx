import { useEffect } from "react"
import { usePostsByTaller } from "../../shared/hooks/usePostsByTaller"
import { usePostsByPractica } from "../../shared/hooks/usePostsByPractica"
import { usePostsByTecnologia } from "../../shared/hooks/usePostsByTecnologia"
import { 
  Badge, 
  Box, 
  Button, 
  Card, 
  HStack, 
  Image, 
  CardBody, 
  CardFooter, 
  Heading, 
  Text, 
  Spinner, 
  SimpleGrid 
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

const postImages = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
]

export const PostsCard = ({ tipo = "taller" }) => {
    let hook
    if (tipo === "taller") hook = usePostsByTaller()
    else if (tipo === "practica") hook = usePostsByPractica()
    else if (tipo === "tecnologia") hook = usePostsByTecnologia()
    else hook = usePostsByTaller()

    const { getPostsByTaller, getPostsByPractica, getPostsByTecnologia, allPosts, isFetching } = hook

    useEffect(() => {
        if (tipo === "taller") getPostsByTaller()
        else if (tipo === "practica") getPostsByPractica()
        else if (tipo === "tecnologia") getPostsByTecnologia()
        else getPostsByTaller()
    }, [tipo])

    if (isFetching) return <Spinner />

    return (
        <Box mt={24}>
        <SimpleGrid columns={[1, 2]} spacing={8}>
            {allPosts?.map((post, idx) => (
            <Card key={post._id} direction="row" overflow="hidden" maxW="xl" m="auto">
                <Image
                objectFit="cover"
                maxW="200px"
                src={postImages[idx % postImages.length]}
                alt={post.title}
                />
                <Box flex="1">
                <CardBody>
                    <Heading size="md" mb={2}>{post.title}</Heading>
                    <Text mb={2}>{post.description}</Text>
                    <HStack mt={4}>
                    <Badge colorScheme="teal">
                        {post.course?.name || "Sin curso"}
                    </Badge>
                    </HStack>
                </CardBody>
                <CardFooter>
                    <Button
                        as={RouterLink}
                        to={`/comments/${post._id}`}
                        colorScheme="teal"
                        width="100%"
                    >
                        Ver publicación
                    </Button>
                </CardFooter>
                </Box>
            </Card>
            ))}
        </SimpleGrid>
        </Box>
    )
}