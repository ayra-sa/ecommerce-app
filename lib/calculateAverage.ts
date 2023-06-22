const calculateAverage = (ratings: number[]) => {
    const sum = ratings.reduce((total: number, rating: number) => total + rating, 0);
    const average = sum / ratings.length;
    return average
}

export default calculateAverage