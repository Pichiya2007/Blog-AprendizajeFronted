import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  HStack,
  Text,
  Spinner,
  Box,
  Heading,
  SimpleGrid,
  Image,
  Button,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useCommentsByPost } from "../../shared/hooks/useCommentsByPost";
import { useAddComment } from "../../shared/hooks/useAddComment";

const postImages = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
]

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
})

export const CommentCard = ({ postId }) => {
    const { getCommentsByPost, allComments, isFetching, post } = useCommentsByPost();
    const { addComment, isLoading } = useAddComment();
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const toast = useToast();

    useEffect(() => {
        if (postId) getCommentsByPost(postId);
    }, [postId]);

    const handleAddComment = async () => {
        if (!username.trim() || !content.trim()) {
        toast({
            title: "Completa todos los campos.",
            status: "warning",
            duration: 2000,
            isClosable: true,
        })
        return
        }
        const data = {
        username,
        content,
        post: postId,
        }

        const res = await addComment(data)

        if (res) {
        toast({
            title: "Comentario agregado.",
            status: "success",
            duration: 2000,
            isClosable: true,
        })
        setUsername("");
        setContent("");
        getCommentsByPost(postId);
        }
    }

  if (isFetching) return <Spinner />;

  if (!post)
    return (
      <Text color="gray.500" mt={4}>
        No se encontró la publicación.
      </Text>
    )

    const randomImage = postImages[Math.floor(Math.random() * postImages.length)];

    return (
        <Box mt={24}>
        <Card
            maxW="3xl"
            m="auto"
            mb={8}
            p={6}
            direction={["column", "row"]}
            alignItems="center"
        >
            <Image
            src={randomImage}
            alt="Imagen de la publicación"
            objectFit="cover"
            boxSize="180px"
            borderRadius="md"
            mr={[0, 8]}
            mb={[4, 0]}
            />
            <Box flex="1">
            <Heading size="lg" mb={2}>
                {post.title}
            </Heading>
            <Text mb={2} color="gray.600">
                {post.description}
            </Text>
            <Text color="gray.500" fontSize="sm">
                Publicado el {formatDate(post.createdAt)}
            </Text>
            </Box>
        </Card>
        <Card maxW="3xl" m="auto" mb={8} p={6}>
            <HStack spacing={4} mb={4} flexWrap="wrap">
            <Input
                placeholder="Tu nombre"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxW="200px"
            />
            <Textarea
                placeholder="Escribe tu comentario"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minH="40px"
                maxW="400px"
                flex="1"
            />
            <Button
                colorScheme="teal"
                onClick={handleAddComment}
                isLoading={isLoading}
            >
                Agregar comentario
            </Button>
            </HStack>
        </Card>
        {!allComments || allComments.length === 0 ? (
            <Text color="gray.500" mt={4} textAlign="center">
            No hay comentarios para esta publicación.
            </Text>
        ) : (
            <SimpleGrid columns={[1, 2]} spacing={8}>
            {allComments.map((comment, idx) => (
                <Card
                key={comment._id}
                direction="row"
                maxW="2xl"
                minH="180px"
                m="auto"
                p={6}
                >
                <Avatar
                    name={comment.username}
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    comment.username
                    )}`}
                    size="xl"
                    mr={6}
                />
                <Box flex="1">
                    <HStack mb={2}>
                    <Text fontWeight="semibold" fontSize="lg">
                        {comment.username}
                    </Text>
                    <Text color="gray.500" fontSize="sm" ml={2}>
                        {formatDate(comment.createdAt)}
                    </Text>
                    </HStack>
                    <Text color="gray.700" fontSize="md" wordBreak="break-word">
                    {comment.content}
                    </Text>
                </Box>
                </Card>
            ))}
            </SimpleGrid>
        )}
        </Box>
    )
}