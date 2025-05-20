import { useEffect } from "react"
import { usePostsByCourse } from "../../shared/hooks/usePostsByCourse"
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

export const PostsCard = ({ courseId }) => {
    const { getPostsByCourse, posts, isFetching } = usePostsByCourse()

    useEffect(() => {
        if (courseId) getPostsByCourse(courseId)
    }, [courseId])

    if (isFetching) return <Spinner />

    return (
        <Box mt={24}>
            {(!posts || posts.length === 0) ? (
                <Text color="gray.500" mt={4} textAlign="center">
                    No hay publicaciones para este curso.
                </Text>
            ) : (
                <SimpleGrid columns={[1, 2]} spacing={8}>
                    {posts.map((post, idx) => (
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
            )}
        </Box>
    )
}