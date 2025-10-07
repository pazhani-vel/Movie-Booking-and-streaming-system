import ps from '../assets/ps.jpg';
import pathaan from '../assets/Pathaan.jpg';
import endgame from '../assets/Avengers.avif';
import baahubali2 from '../assets/bahubali.jpeg';
import jawan from '../assets/jawan.jpeg';
import vikram from '../assets/vikram.jpeg';
import spiderman from '../assets/spiderman.webp';

const mockMovies = [
  {
    _id: "1",
    name: "Ponniyin Selvan",
    poster_url: ps,
    genre: ["Historical", "Action"],
    language: ["Tamil"],
    rating: 9.2,
    likes: 1200
  },
  {
    _id: "2",
    name: "Pathaan",
    poster_url: pathaan,
    genre: ["Action", "Thriller"],
    language: ["Hindi"],
    rating: 8.7,
    likes: 1100
  },
  {
    _id: "3",
    name: "Avengers: Endgame",
    poster_url: endgame,
    genre: ["Action", "Sci-Fi"],
    language: ["English"],
    rating: 9.0,
    likes: 2000
  },
  {
    _id: "4",
    name: "Baahubali 2",
    poster_url: baahubali2,
    genre: ["Action", "Drama"],
    language: ["Telugu"],
    rating: 8.8,
    likes: 1500
  },
  {
    _id: "5",
    name: "Jawan",
    poster_url: jawan,
    genre: ["Action", "Thriller"],
    language: ["Hindi"],
    rating: 8.5,
    likes: 1000
  },
  {
    _id: "6",
    name: "Vikram",
    poster_url: vikram,
    genre: ["Action", "Thriller"],
    language: ["Tamil"],
    rating: 8.9,
    likes: 1300
  },
  {
    _id: "7",
    name: "Spider-Man: No Way Home",
    poster_url: spiderman,
    genre: ["Action", "Adventure"],
    language: ["English"],
    rating: 8.6,
    likes: 1400
  }
];

export default mockMovies;
