import React from "react";
export const getGeolocation = (cb)=> {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            cb({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        },
        (error) => cb({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 3000 },
    );
}

