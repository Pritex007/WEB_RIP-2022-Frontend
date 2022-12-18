import axios from "axios";

export const postOrder = async (order) => {
    console.log(order)
    axios.post('api/orders/', order)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
            alert("Произошла ошибка при отправке.\nВозможно, вы не выбрали одно из полей.")
        });
}

export const fetchTrucks = async (min, max) => {
    const res = await fetch(`api/cars/?price_min=${min}&price_max=${max}`)
        .then((response) => {
            return response.json();
        }).catch(() => {
            return {resultCount: 0, results: []}
        })
    console.log(res)
    return res
}

export const fetchBrands = async (tempTrucks) => {
    const res = []
    console.log(tempTrucks)
    for (const element of tempTrucks) {
        const tempRes = await fetch(`api/brands/${element.brand}`)
            .then((response) => {
                return response.json();
            }).catch(() => {
                return {resultCount: 0, results: []}
            })
        res.push(tempRes.title)
    }
    console.log(res)
    return res
}

export const fetchTruck = async (truckID) => {
    const res = await fetch(`api/cars/${truckID}`)
        .then((response) => {
            return response.json();
        }).catch(() => {
            return {resultCount: 0, results: []}
        })
    console.log("fetchTruck")
    console.log(res)
    return res
}

export const fetchBrand = async (brandID) => {
    const res = await fetch(`api/brands/${brandID}`)
        .then((response) => {
            return response.json();
        }).catch(()=>{
            return {resultCount:0, results:[]}
        })
    console.log("fetchBrand")
    console.log(res)
    return res
}

export const fetchOrders = async (userID) => {
    var res = await fetch(`api/orders`)
        .then((response) => {
            return response.json();
        }).catch(()=>{
            return {resultCount:0, results:[]}
        })
    res = res.filter(order => order.user == userID)
    res = res.sort((a,b) => a.time < b.time)
    console.log("fetchOrders")
    console.log(res)
    return res
}