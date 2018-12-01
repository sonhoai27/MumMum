import React from "react";
export const getGeolocation = (cb)=> {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            cb({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            })
        },
        (error) => cb({ error: error.message }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
}