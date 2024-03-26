import Movie from "@/components/Movie";

export default function MoviePage({ params }: { params: any }) {
    return <Movie roomId={params.roomId} movieId={params.movieId} />;
}
