import { Card, CardBody, CardHeader, Image, Spinner, Heading, Button, SimpleGrid, Text, Box } from "@chakra-ui/react"
import { useCourses } from "../../shared/hooks/useCourses"
import { useEffect } from "react"

const techImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"
]

export const CourseCard = () => {
  const { getCourses, allCourses, isFetching } = useCourses()

  useEffect(() => {
    getCourses()
  }, [])

  if (isFetching) return <Spinner />

  return (
    <Box mt={24}>
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {allCourses?.map((course, idx) => (
          <Card key={course._id} maxW="md" height="100%" overflow="hidden" m="auto" boxShadow="lg">
            <Image
              src={
                course.image ||
                techImages[idx % techImages.length]
              }
              alt={course.name}
              height="260px"
              objectFit="cover"
              width="100%"
            />
            <CardHeader>
              <Heading size="lg">{course.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text mb={4} color="gray.600">
                {course.description}
              </Text>
              <Button colorScheme="teal" width="100%">
                Entrar al curso
              </Button>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  )
}