import React, { memo } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Heading,
    Box,
    Text,
    Image,
    Button,
    Divider,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const IndividualMovieCard = memo(function IndividualMovieCard ({ 
    isSelected = false,
    movieId,
    posterEndpoint,
    movieTitle,
    releaseDate,
    imdbRating,
    setSelectedItem,
}) {
    const handleClickOnIndividualMovieCard = (movieId) => {
        setSelectedItem(movieId);
    };
    return (
        <Card
            onClick={() => {
                handleClickOnIndividualMovieCard(movieId);
            }}
            border={isSelected ? '2px' : '0px'}
            borderColor="gray.600"
        >
            <CardHeader pb="0">
                <Heading size={movieTitle.length > 44 ? 'xs' : 'sm'}>
                    {movieTitle}
                </Heading>
            </CardHeader>

            <CardBody>
                <Image
                    src={`https://image.tmdb.org/t/p/w500${posterEndpoint}`}
                    alt="Movie poster"
                    borderRadius="lg"
                />
                <Box>
                    <Text pt="2" fontSize="sm">
                        Release date: {releaseDate}
                    </Text>
                    <Text pt="2" fontSize="sm">
                        IMDb rating: <b>{imdbRating.rating}</b>/10
                    </Text>
                    <Divider my="3" />
                    <Button
                        variant="solid"
                        colorScheme="yellow"
                        leftIcon={<StarIcon />}
                    >
                    Add to favorites
                    </Button>
                </Box>
            </CardBody>
        </Card>
    );
});

export default IndividualMovieCard;
