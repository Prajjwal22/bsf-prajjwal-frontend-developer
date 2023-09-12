export const fetchRockets = async() => {
    try {
    const res = await fetch ('https://api.spacexdata.com/v3/rockets')
    const allRockets = res.json()
    return allRockets
}
catch (err) {
    console.log('error while fetching')
}
}

export const fetchCapsules = async() => {
    try {
    const res = await fetch ('https://api.spacexdata.com/v3/capsules')
    const allCapsules = res.json()
    return allCapsules
}
catch (err) {
    console.log('error while fetching')
}
}