import { useEffect, useState } from "react"
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
    Textarea
} from "@chakra-ui/react"
import { useToast } from "@chakra-ui/toast"
import { useCommentsByPost } from "../../shared/hooks/useCommentsByPost"
import { useAddComment } from "../../shared/hooks/useAddComment"
import { useDeleteComment } from "../../shared/hooks/useDeleteComment"
import { useUpdateComment } from "../../shared/hooks/useUpdateComment"

const postImages = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
]

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("es-ES", {
        dateStyle: "medium",
        timeStyle: "short",
    })

export const CommentCard = ({ postId }) => {
    const { getCommentsByPost, allComments, isFetching, post } = useCommentsByPost()
    const { addComment, isLoading } = useAddComment()
    const { deleteComment, isLoading: isDeleting } = useDeleteComment()
    const { updateComment, isLoading: isUpdating } = useUpdateComment()
    const [username, setUsername] = useState("")
    const [content, setContent] = useState("")
    const [editingId, setEditingId] = useState(null)
    const [editContent, setEditContent] = useState("")
    const toast = useToast()

    useEffect(() => {
        if (postId) getCommentsByPost(postId)
    }, [postId])

    const handleAddComment = async () => {
        if (!content.trim()) {
            toast({
                title: "Completa el campo de comentario.",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
            return
        }
        const data = {
            username: username.trim() ? username : "Anónimo",
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
            setUsername("")
            setContent("")
            getCommentsByPost(postId)
        }
    }

    const handleDelete = async (commentId) => {
        const res = await deleteComment(commentId)
        if (res) {
            toast({
                title: "Comentario eliminado.",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            getCommentsByPost(postId)
        }
    }

    const handleEdit = (comment) => {
        setEditingId(comment._id)
        setEditContent(comment.content)
    }

    const handleUpdate = async (commentId) => {
        if (!editContent.trim()) {
            toast({
                title: "El comentario no puede estar vacío.",
                status: "warning",
                duration: 2000,
                isClosable: true,
            })
            return
        }
        const res = await updateComment(commentId, { content: editContent })
        if (res) {
            toast({
                title: "Comentario actualizado.",
                status: "success",
                duration: 2000,
                isClosable: true,
            })
            setEditingId(null)
            setEditContent("")
            getCommentsByPost(postId)
        }
    }

    if (isFetching) return <Spinner />

    if (!post)
        return (
            <Text color="gray.500" mt={4}>
                No se encontró la publicación.
            </Text>
        )

    const randomImage = postImages[Math.floor(Math.random() * postImages.length)]

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
            {!allComments || allComments.filter(c => c.status !== false).length === 0 ? (
                <Text color="gray.500" mt={4} textAlign="center">
                    No hay comentarios para esta publicación.
                </Text>
            ) : (
                <SimpleGrid columns={[1, 2]} spacing={8}>
                    {allComments
                        .filter(comment => comment.status !== false)
                        .map((comment) => (
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
                                {editingId === comment._id ? (
                                    <>
                                        <Textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            size="sm"
                                            mb={2}
                                        />
                                        <HStack>
                                            <Button
                                                colorScheme="teal"
                                                size="sm"
                                                onClick={() => handleUpdate(comment._id)}
                                                isLoading={isUpdating}
                                            >
                                                Guardar
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={() => setEditingId(null)}
                                                variant="ghost"
                                            >
                                                Cancelar
                                            </Button>
                                        </HStack>
                                    </>
                                ) : (
                                    <Text color="gray.700" fontSize="md" wordBreak="break-word" mb={2}>
                                        {comment.content}
                                    </Text>
                                )}
                                <HStack mt={2}>
                                    <Button
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() => handleDelete(comment._id)}
                                        isLoading={isDeleting}
                                    >
                                        Eliminar
                                    </Button>
                                    <Button
                                        colorScheme="blue"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEdit(comment)}
                                        isDisabled={editingId !== null}
                                    >
                                        Editar
                                    </Button>
                                </HStack>
                            </Box>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    )
}