import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react';
import { moviesData } from './data/movies';
import IndividualMovieCard from './components/IndividualMovieCard';

const App = () => {
    const [selectedItem, setSelectedItem] = useState("");

    const removeDuplicatedMovies = (moviesData) => {
        const uniqueMoviesObj = {};
        const uniqueMoviesArray = [];
        moviesData.forEach((movie) => {
            if(!uniqueMoviesObj.hasOwnProperty(movie.id)) {
                uniqueMoviesArray.push(movie);
            }
            uniqueMoviesObj[movie.id] = movie;
        });

        return uniqueMoviesArray;
    };

    const sortMoviesByRating = (moviesArray) => {
        const sortFunc = (a, b) => {
            if (
                a.ratings.find((rating) => rating.id === 'imdb').rating <
                b.ratings.find((rating) => rating.id === 'imdb').rating
            ) {
                return 1;
            }
            if (
                a.ratings.find((rating) => rating.id === 'imdb').rating >
                b.ratings.find((rating) => rating.id === 'imdb').rating
            ) {
                return -1;
            }
            return 0;
        };

        moviesArray.sort(sortFunc);
        return moviesArray;
    };

    const prepareMoviesForRendering = (moviesData) => {
        const uniqueMovies = removeDuplicatedMovies(moviesData);
        const moviesSortedByRating = sortMoviesByRating(uniqueMovies);
        return moviesSortedByRating;
    };

    const moviesForRendering = prepareMoviesForRendering(moviesData);

    return (
        <ChakraProvider>
            <Grid
                templateColumns="repeat(4, 1fr)"
                templateRows="repeat(auto, 1fr)"
                gap={6}
                m={10}
            >
                {moviesForRendering.map((movie, index) => {
                    return (
                        <GridItem key={movie.id} w="100%" h="auto">
                            <IndividualMovieCard
                                isSelected={selectedItem === movie.id}
                                movieId={movie.id}
                                posterEndpoint={movie['poster_path']}
                                movieTitle={movie['original_title']}
                                releaseDate={movie['release_date']}
                                imdbRating={movie['ratings'].find(
                                    (rating) => rating.id === 'imdb'
                                )}
                                setSelectedItem={setSelectedItem}
                            />
                        </GridItem>
                    );
                })}
            </Grid>
        </ChakraProvider>
    );
};

const appElement = document.getElementById('app');
const root = createRoot(appElement);
root.render(<App />);
