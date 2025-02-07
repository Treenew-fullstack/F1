const fetchUserLocation = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
    } catch (error) {
        console.error('Ошибка получения местоположения:', error);
        return null;
    }
};

export default fetchUserLocation;
