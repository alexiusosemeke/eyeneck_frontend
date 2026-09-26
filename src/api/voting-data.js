import api from "./axios"

export const getStates = async () => {
    const {data} = await api.get(`/states/`)
    return data.results
}

export const getLgas = async (stateId) => {
    const {data} = await api.get(`/lgas/?state=${stateId}`)
    return data.results
}

export const getWards = async (lgaId) => {
    const {data} = await api.get(`/wards/?lga=${lgaId}`)
    return data.results
}

export const getPollingUnits = async (wardId) => {
    const {data} = await api.get(`/polling-units/?ward=${wardId}`)
    return data.results
}

export const getStateDetail = async(id) => {
    const response = await api.get(`/states/${id}/`)
    return response.data
}