import React, { lazy, Suspense, useState } from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';
import { LikedUserMovies } from '../../../models/UserItemProps';
import MovieItemModal from '../../movie-api/ItemModal/MovieItemModal';
import CircleAnimation from "../../../components/UI/LoadAnimation/CircleAnimation";

const LikedMovieItem = lazy(() => import('./LikedMovieItem'));

interface LikedMovieItemsProps {
    likedMovies: LikedUserMovies[];
    isWatched: string;
}

export default function LikedMovieItems({ likedMovies, isWatched }: LikedMovieItemsProps): React.JSX.Element | null {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImdbId, setCurrentImdbId] = useState('');

    const closeModal = () => {
        setCurrentImdbId('');
        setIsModalOpen(false);
    };

    let content;

    if (likedMovies.length) {
        content = (
            <section className="movie-items-container">
                
                    {likedMovies.map((movie) => (
                        <Suspense fallback={<CircleAnimation bgColor="#3838380a" />}>
                        <LikedMovieItem
                            imdbId={movie.imdbId}
                            hasWatched={movie.hasWatched}
                            key={movie.imdbId}
                            isWatchedFilter={isWatched}
                            setIsModalOpen={setIsModalOpen}
                            setCurrentImdbId={setCurrentImdbId}
                        />
                        </Suspense>
                    ))}
                
                <MovieItemModal 
                    imdbId={currentImdbId}
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            </section>
        );
    } else {
        content = (
            <div className="movie-items-container">
                <div className="no-movies-container">
                    <h3>
                        You haven't liked any movies yet. <Link to="/search">Search</Link> around or see what <Link to="/profiles">other users</Link> are watching to find your new favorite movies and TV shows.
                    </h3>
                </div>
            </div>
        );
    }

    return content;
}
